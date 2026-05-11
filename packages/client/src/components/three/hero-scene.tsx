"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Edges } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

type Solid = {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  speed: number;
  tint: string;
};

function buildSolids(): Solid[] {
  return [
    {
      geometry: new THREE.IcosahedronGeometry(1, 0),
      position: [-1.7, 0.6, 0.2],
      scale: 1.05,
      speed: 0.35,
      tint: "#c75b3c",
    },
    {
      geometry: new THREE.OctahedronGeometry(1, 0),
      position: [1.6, -0.4, -0.4],
      scale: 0.9,
      speed: -0.5,
      tint: "#1c2233",
    },
    {
      geometry: new THREE.DodecahedronGeometry(1, 0),
      position: [0.2, 1.4, -0.6],
      scale: 0.75,
      speed: 0.45,
      tint: "#1c2233",
    },
    {
      geometry: new THREE.TorusKnotGeometry(0.5, 0.16, 96, 16),
      position: [-0.4, -1.4, 0.5],
      scale: 0.95,
      speed: -0.3,
      tint: "#c75b3c",
    },
    {
      geometry: new THREE.TetrahedronGeometry(1, 0),
      position: [2.1, 1.2, 0.4],
      scale: 0.55,
      speed: 0.7,
      tint: "#1c2233",
    },
  ];
}

function FloatingSolid({ solid }: { solid: Solid }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * solid.speed * 0.6;
    ref.current.rotation.y += delta * solid.speed;
  });
  return (
    <Float
      speed={1.1}
      rotationIntensity={0.4}
      floatIntensity={0.9}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh
        ref={ref}
        position={solid.position}
        scale={solid.scale}
        geometry={solid.geometry}
      >
        <meshStandardMaterial
          color={solid.tint}
          roughness={0.55}
          metalness={0.15}
          flatShading
        />
        <Edges threshold={20} color="#0d1220" />
      </mesh>
    </Float>
  );
}

function Cluster() {
  const ref = useRef<Group>(null);
  const solids = useMemo(buildSolids, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow drift + subtle pointer parallax.
    ref.current.rotation.y += delta * 0.06;
    const { x, y } = state.pointer;
    ref.current.rotation.x += (y * 0.25 - ref.current.rotation.x) * 0.04;
    ref.current.position.x += (x * 0.2 - ref.current.position.x) * 0.05;
  });
  return (
    <group ref={ref}>
      {solids.map((s, i) => (
        <FloatingSolid key={i} solid={s} />
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#c75b3c" />
      <Suspense fallback={null}>
        <Cluster />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.6}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}
