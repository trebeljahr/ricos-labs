"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const noiseGlsl = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  float fbm(vec3 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * snoise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
`;

const plasmaFragment = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  uniform float uTime;
  uniform vec3 uPointer;
  uniform vec3 uColorArc;
  uniform vec3 uColorHot;
  uniform vec3 uColorEdge;

  ${noiseGlsl}

  void main() {
    vec3 p = normalize(vPos);

    // Two FBM layers drifting at different rates so arcs writhe.
    vec3 q1 = p * 2.0 + vec3(0.0, uTime * 0.30, uTime * 0.22);
    vec3 q2 = p * 4.0 + vec3(uTime * 0.55, -uTime * 0.35, uTime * 0.12);
    float n1 = fbm(q1);
    float n2 = fbm(q2);

    // Domain-warped noise reads more like thin electrical filaments
    // than the usual blobby fbm.
    float warped = fbm(q1 + vec3(n2 * 1.6, n1 * 1.6, n2));
    float t = 0.5 + 0.5 * warped;          // remap to [0,1]
    float arcs = pow(t, 3.5) * 2.4;        // base filaments

    // Add fine, fast-moving sparkle on top.
    float sparkle = pow(max(0.0, 0.5 + 0.5 * n2), 8.0) * 1.4;
    arcs += sparkle;

    // Bias toward the equator so the strongest activity isn't at the poles.
    arcs *= 1.0 - pow(abs(p.y), 1.5) * 0.45;

    // Pointer-driven beam — a fat bright arc that grabs the pointer position.
    // Mimics the classic "finger touching the glass" behavior.
    float pStr = clamp(length(uPointer), 0.0, 1.0);
    if (pStr > 0.01) {
      vec3 dir = normalize(uPointer);
      float aligned = max(0.0, dot(p, dir));
      // Wider falloff (pow 3 instead of 6) so the beam is visible, not a dot.
      float beam = pow(aligned, 3.0);
      // The closer the pointer is to the rim, the stronger the grab.
      arcs += beam * (4.5 + 2.0 * warped) * (0.5 + 0.7 * pStr);
      // Tight white-hot tip where the beam meets the glass.
      float tip = pow(aligned, 30.0);
      arcs += tip * 4.0 * pStr;
    }

    // Cool fresnel rim.
    float fres = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 2.0);

    // Color: magenta filaments, hot-white peaks, cool-blue rim.
    vec3 col = uColorArc * arcs;
    col += uColorHot * smoothstep(2.4, 4.0, arcs);
    col += uColorEdge * fres * 0.9;

    float alpha = clamp(arcs * 1.0 + fres * 0.75, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

const coreFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform vec3 uPointer;
  ${noiseGlsl}
  void main() {
    float fres = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 1.4);
    // Subtle flicker driven by noise so the core is alive.
    float flick = 0.85 + 0.15 * snoise(vec3(uTime * 4.0));
    vec3 hot = vec3(1.0, 0.85, 1.0) * flick;
    vec3 col = mix(hot, vec3(0.95, 0.55, 1.0), fres);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function PlasmaShell({ pointer3D }: { pointer3D: THREE.Vector3 }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uColorArc: { value: new THREE.Color("#a04bff") },
      uColorHot: { value: new THREE.Color("#ffd4f5") },
      uColorEdge: { value: new THREE.Color("#5a8bff") },
    }),
    []
  );
  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uPointer.value.lerp(pointer3D, 0.08);
  });
  return (
    <mesh>
      <sphereGeometry args={[1.5, 96, 96]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={plasmaFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function PlasmaCore({ pointer3D }: { pointer3D: THREE.Vector3 }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
    }),
    []
  );
  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uPointer.value.copy(pointer3D);
  });
  return (
    <mesh>
      <sphereGeometry args={[0.3, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={coreFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function PlasmaBall() {
  // Pointer position projected into the ball's near hemisphere, so arcs/corona
  // reach toward where the cursor is hovering over the glass.
  const pointer3D = useRef(new THREE.Vector3()).current;
  useFrame((state) => {
    const { x, y } = state.pointer;
    // 0,0 in NDC = center. Map to the front of the sphere with a soft falloff
    // so moving away from the canvas pulls the arc back into the bulk.
    const r = Math.min(1, Math.hypot(x, y));
    const fall = Math.pow(r, 1.5);
    pointer3D.set(x * fall, y * fall, Math.sqrt(Math.max(0, 1 - r * r)) * fall);
  });
  return (
    <group>
      <PlasmaCore pointer3D={pointer3D} />
      <PlasmaShell pointer3D={pointer3D} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5.6], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
    >
      <Suspense fallback={null}>
        <PlasmaBall />
      </Suspense>
    </Canvas>
  );
}
