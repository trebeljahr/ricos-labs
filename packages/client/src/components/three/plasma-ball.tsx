"use client";

import { useMemo, useRef } from "react";
import { Box, Sphere as SphereMesh } from "@react-three/drei";
import { type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  DoubleSide,
  type Group,
  type Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Vector2,
  Vector3,
} from "three";
import type { LightningStrike, RayParameters } from "three-stdlib";
import { type FixedLightningStrike, LightningRay } from "./lightning-ray";

function randomUnitDirection(target = new Vector3()) {
  return target.randomDirection();
}

function fibonacciSphere(n: number) {
  const points: Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = goldenAngle * i;
    points.push(new Vector3(r * Math.cos(t), y, r * Math.sin(t)));
  }
  return points;
}

export const PlasmaBall = () => {
  const poleHeight = 30;
  const glassSphereDiameter = 20;
  const plasmaSphereRadius = glassSphereDiameter * 0.05;

  const plasmaColor = "#f200ff";
  const blackPlastic = useMemo(
    () => new MeshLambertMaterial({ color: "#020202" }),
    []
  );

  const rayDirection = new Vector3();
  const rayLength = 0;
  const vec1 = new Vector3();
  const vec2 = new Vector3();

  const plasmaOrigin = new Vector3(0, poleHeight * 0.5, 0);

  const rayParams: RayParameters = {
    sourceOffset: plasmaOrigin,
    destOffset: new Vector3(glassSphereDiameter / 2, 0, 0).add(plasmaOrigin),
    radius0: 0.1,
    radius1: 0.1,
    radius0Factor: 0.82,
    minRadius: 2.5,
    maxIterations: 6,
    isEternal: true,

    timeScale: 0.6,
    propagationTimeFactor: 0.15,
    vanishingTimeFactor: 0.87,
    subrayPeriod: 0.8,
    ramification: 5,
    recursionProbability: 0.8,

    roughness: 0.85,
    straightness: 0.7,

    onSubrayCreation(segment, parentSubray, childSubray, lightningStrike) {
      const typedLightningStrike = lightningStrike as LightningStrike & {
        rayParameters: RayParameters;
        subrayConePosition: (
          segment: unknown,
          parentSubray: unknown,
          childSubray: unknown,
          a: number,
          b: number,
          c: number
        ) => void;
        randomGenerator: { random: () => number };
      };

      typedLightningStrike.subrayConePosition(
        segment,
        parentSubray,
        childSubray,
        0.6,
        0.9,
        0.7
      );

      vec1.subVectors(typedLightningStrike.rayParameters.destOffset!, childSubray.pos1);
      vec2.set(0, 0, 0);

      if (typedLightningStrike.randomGenerator.random() < 0.7) {
        vec2.copy(rayDirection).multiplyScalar(rayLength * 1.0865);
      }

      vec1.add(vec2).setLength(rayLength);
      childSubray.pos1.addVectors(vec1, typedLightningStrike.rayParameters.sourceOffset!);
    },
  };

  const groupRef = useRef<Group>(null!);
  const glassMeshRef = useRef<Mesh>(null!);
  const hoverPointRef = useRef<Vector3 | null>(null);
  const pointerNDCRef = useRef<Vector2 | null>(null);
  const wasHoveringRef = useRef(false);
  const sphereRadius = glassSphereDiameter / 2;
  const { camera, raycaster } = useThree();
  const worldHit = useMemo(() => new Vector3(), []);

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!pointerNDCRef.current) pointerNDCRef.current = new Vector2();
    pointerNDCRef.current.copy(event.pointer);
  };

  const onPointerOut = () => {
    pointerNDCRef.current = null;
    hoverPointRef.current = null;
  };

  const updateHoverPointFromPointer = () => {
    const ndc = pointerNDCRef.current;
    if (!ndc || !groupRef.current || !glassMeshRef.current) {
      hoverPointRef.current = null;
      return;
    }
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObject(glassMeshRef.current, false);
    if (hits.length === 0) {
      hoverPointRef.current = null;
      return;
    }
    worldHit.copy(hits[0].point);
    const local = groupRef.current.worldToLocal(worldHit);
    local.sub(plasmaOrigin).normalize().multiplyScalar(sphereRadius).add(plasmaOrigin);
    if (!hoverPointRef.current) hoverPointRef.current = new Vector3();
    hoverPointRef.current.copy(local);
  };

  const jitterStrength = 0.01;
  const dispersalBoost = 0.12;
  const dispersalDecayMs = 1400;
  const hoverLerp = 0.55;
  const snapDistance = 0.05;
  const contactSpread = 0.09;
  const contactWander = 0.04;

  const dispersalEndsAtRef = useRef(0);

  const centerDir = useMemo(() => new Vector3(), []);
  const tangent = useMemo(() => new Vector3(), []);
  const perRayTarget = useMemo(() => new Vector3(), []);
  const wanderTarget = useMemo(() => new Vector3(), []);
  const axis = useMemo(() => new Vector3(), []);
  const dispersalAxis = useMemo(() => new Vector3(), []);
  const targetDelta = 0.05;
  const dispersingRef = useRef(false);

  const { contactDirs, targetDirs, hoverOffsets, initialPositions, fibPoints, fibOrder } =
    useMemo(() => {
      const contactDirs = [] as Vector3[];
      const targetDirs = [] as Vector3[];
      const hoverOffsets = [] as Vector3[];
      const initialPositions = [] as Vector3[];
      const numLightningRays = 30;
      const fibPoints = fibonacciSphere(numLightningRays);
      const fibOrder = Array.from({ length: numLightningRays }, (_, i) => i);

      for (let i = 0; i < numLightningRays; i++) {
        const dir = fibPoints[i].clone();
        contactDirs.push(dir);
        targetDirs.push(randomUnitDirection());
        hoverOffsets.push(
          new Vector3().randomDirection().multiplyScalar(Math.sqrt(Math.random()))
        );
        initialPositions.push(
          dir.clone().multiplyScalar(glassSphereDiameter / 2).add(plasmaOrigin)
        );
      }

      return { contactDirs, targetDirs, hoverOffsets, initialPositions, fibPoints, fibOrder };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const lightningRefs = useRef<FixedLightningStrike[]>([]);
  const contactPointRefs = useRef<Mesh[]>([]);

  useFrame(() => {
    updateHoverPointFromPointer();
    const hoverPoint = hoverPointRef.current;

    if (hoverPoint) {
      wasHoveringRef.current = true;
      centerDir.copy(hoverPoint).sub(plasmaOrigin).normalize();
      lightningRefs.current.forEach((thisRef, i) => {
        const dest = thisRef.rayParameters.destOffset;
        if (!dest) return;
        const offset = hoverOffsets[i];
        if (!offset) return;
        wanderTarget.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        offset.lerp(wanderTarget, contactWander);
        tangent.copy(offset).addScaledVector(centerDir, -offset.dot(centerDir));
        perRayTarget
          .copy(centerDir)
          .addScaledVector(tangent, contactSpread)
          .normalize()
          .multiplyScalar(sphereRadius)
          .add(plasmaOrigin);
        if (dest.distanceTo(perRayTarget) < snapDistance) {
          dest.copy(perRayTarget);
        } else {
          dest.lerp(perRayTarget, hoverLerp);
        }
        if (contactPointRefs.current[i]) {
          contactPointRefs.current[i].position.copy(dest);
        }
      });
      return;
    }

    if (wasHoveringRef.current) {
      wasHoveringRef.current = false;
      dispersalEndsAtRef.current = performance.now() + dispersalDecayMs;
      dispersingRef.current = true;
      randomUnitDirection(dispersalAxis);
      const dispersalAngle = Math.random() * Math.PI * 2;
      const order = fibOrder;
      for (let k = order.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [order[k], order[j]] = [order[j], order[k]];
      }
      lightningRefs.current.forEach((thisRef, i) => {
        const dest = thisRef.rayParameters.destOffset;
        if (!dest || !contactDirs[i] || !targetDirs[i] || !fibPoints[order[i]]) return;
        contactDirs[i].copy(dest).sub(plasmaOrigin).normalize();
        targetDirs[i].copy(fibPoints[order[i]]).applyAxisAngle(dispersalAxis, dispersalAngle);
      });
    }

    const remainingBoostMs = dispersalEndsAtRef.current - performance.now();
    const boost = remainingBoostMs > 0 ? remainingBoostMs / dispersalDecayMs : 0;
    const effectiveJitter = jitterStrength + boost * (dispersalBoost - jitterStrength);
    if (dispersingRef.current && boost === 0) dispersingRef.current = false;
    const isDispersing = dispersingRef.current;

    lightningRefs.current.forEach((thisRef, i) => {
      const dest = thisRef.rayParameters.destOffset;
      if (!dest) return;
      const dir = contactDirs[i];
      const target = targetDirs[i];
      if (!dir || !target || !contactPointRefs.current[i]) return;

      const angle = dir.angleTo(target);
      if (angle < targetDelta && !isDispersing) {
        randomUnitDirection(target);
      } else if (angle >= targetDelta) {
        axis.crossVectors(dir, target);
        if (axis.lengthSq() > 1e-8) {
          axis.normalize();
          dir.applyAxisAngle(axis, Math.min(effectiveJitter, angle));
        } else if (!isDispersing) {
          randomUnitDirection(target);
        } else {
          target.x += 1e-3;
          target.normalize();
        }
      }

      dest.copy(dir).multiplyScalar(sphereRadius).add(plasmaOrigin);
      contactPointRefs.current[i].position.copy(dest);
    });
  });

  const plasmaMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: plasmaColor,
      emissive: plasmaColor,
      emissiveIntensity: 4,
      side: DoubleSide,
    });
  }, [plasmaColor]);

  return (
    <group scale={1} ref={groupRef}>
      {initialPositions.map((pos, index) => (
        <group key={index}>
          <SphereMesh
            args={[glassSphereDiameter * 0.004, 24, 12]}
            position={pos.clone()}
            material={plasmaMaterial}
            ref={(elem) => {
              if (elem) {
                contactPointRefs.current.push(elem);
              }
            }}
          />

          <LightningRay
            {...rayParams}
            destOffset={pos.clone()}
            radius0={0.06}
            radius1={0.06}
            material={plasmaMaterial}
            ref={(elem) => {
              if (elem) {
                lightningRefs.current.push(elem);
              }
            }}
          />
        </group>
      ))}

      <Box
        args={[glassSphereDiameter * 0.5, poleHeight * 0.1, glassSphereDiameter * 0.5]}
        position={[0, poleHeight * 0.05 * 0.5, 0]}
        material={blackPlastic}
      />

      <mesh
        position={[0, glassSphereDiameter / 2 - plasmaSphereRadius * 2, 0]}
        material={blackPlastic}
      >
        <cylinderGeometry
          args={[
            plasmaSphereRadius - 0.01,
            plasmaSphereRadius - 0.01,
            poleHeight / 2 - plasmaSphereRadius * 2,
            6,
            1,
            true,
          ]}
        />
      </mesh>

      <mesh position={[0, poleHeight * 0.5, 0]}>
        <sphereGeometry args={[glassSphereDiameter * 0.05, 24, 12]} />
        <meshStandardMaterial color={plasmaColor} emissive={plasmaColor} emissiveIntensity={3} />
      </mesh>

      <mesh
        position={[0, poleHeight / 2, 0]}
        ref={glassMeshRef}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        <sphereGeometry args={[glassSphereDiameter / 2, 80, 40]} />
        <meshPhysicalMaterial
          color={"#ffffff"}
          transparent={true}
          opacity={0.5}
          transmission={0.96}
          side={DoubleSide}
          depthWrite={false}
          metalness={0}
          roughness={0}
        />
      </mesh>
    </group>
  );
};
