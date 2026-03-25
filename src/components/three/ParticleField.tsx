// @ts-nocheck
"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const RING_COUNT = 3;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const { viewport } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const accentColors = [
      [230 / 255, 57 / 255, 57 / 255],   // red
      [0 / 255, 180 / 255, 216 / 255],    // blue
      [0 / 255, 200 / 255, 83 / 255],     // green
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const colorIdx = Math.floor(Math.random() * accentColors.length);
      col[i * 3] = accentColors[colorIdx][0];
      col[i * 3 + 1] = accentColors[colorIdx][1];
      col[i * 3 + 2] = accentColors[colorIdx][2];

      siz[i] = Math.random() * 3 + 0.5;
    }

    return [pos, col, siz];
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001;
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const speed = 0.3 + (i % 5) * 0.1;

      positions[i3] += Math.sin(time * speed + i) * 0.002;
      positions[i3 + 1] += Math.cos(time * speed + i) * 0.002;

      // Mouse reactivity
      positions[i3] += mouseRef.current.x * 0.001;
      positions[i3 + 1] += mouseRef.current.y * 0.001;

      // Wrap around
      if (positions[i3] > 10) positions[i3] = -10;
      if (positions[i3] < -10) positions[i3] = 10;
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.z = time * 0.02 + scrollRef.current * 0.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRing({ radius, color, speed, rotationAxis }: {
  radius: number;
  color: string;
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = rotationAxis[0] * time;
    meshRef.current.rotation.y = rotationAxis[1] * time;
    meshRef.current.rotation.z = rotationAxis[2] * time;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export function ParticleField() {
  return (
    <>
      <Particles />
      <FloatingRing radius={3} color="#e63939" speed={0.15} rotationAxis={[1, 0.5, 0]} />
      <FloatingRing radius={4} color="#00b4d8" speed={0.1} rotationAxis={[0, 1, 0.3]} />
      <FloatingRing radius={5} color="#00c853" speed={0.08} rotationAxis={[0.3, 0, 1]} />
      <ambientLight intensity={0.1} />
    </>
  );
}
