"use client";

import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { PlasmaBall } from "./plasma-ball";

// The "city" preset, served from public/hdri. With `preset`, drei fetches it
// from raw.githack.com, a third-party host every visitor would contact. The
// file is an unchanged copy of hdri/potsdamer_platz_1k.hdr from
// pmndrs/drei-assets at commit 456060a: "Potsdamer Platz" by Greg Zaal,
// Poly Haven, CC0-1.0 (https://polyhaven.com/a/potsdamer_platz).
const ENVIRONMENT_URL = "/hdri/potsdamer_platz_1k.hdr";

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 15, 45], fov: 35 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <Environment files={ENVIRONMENT_URL} background={false} environmentIntensity={0.4} />
        <color attach="background" args={["#121524"]} />
        <group position={[0, -15, 0]}>
          <PlasmaBall />
        </group>

        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} levels={8} intensity={4} />
          <ToneMapping />
        </EffectComposer>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.2}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  );
}
