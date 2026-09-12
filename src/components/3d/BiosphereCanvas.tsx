"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BiosphereCanvasProps {
  health: number; // 20 to 100
}

const BiosphereScene = ({ health }: { health: number }) => {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Colors dynamically based on health
  const t = Math.max(0, Math.min(1, (health - 20) / 80)); // 0 (damaged) to 1 (restored)

  const groundColor = useMemo(() => {
    const c1 = new THREE.Color("#78716c"); // Warm dry stone/earth
    const c2 = new THREE.Color("#16a34a"); // Lush vibrant green
    return c1.lerp(c2, t);
  }, [t]);

  const waterColor = useMemo(() => {
    const c1 = new THREE.Color("#94a3b8"); // Murky dry silt
    const c2 = new THREE.Color("#06b6d4"); // Sparkling azure water
    return c1.lerp(c2, t);
  }, [t]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Particle cloud (spores / fireflies)
  const particleCount = 120;
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [particleCount]);

  return (
    <group ref={globeRef}>
      {/* Central Island Terrain */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.5, 32]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* River / Water Ring */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.25, 32]} />
        <meshStandardMaterial
          color={waterColor}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Center Mound */}
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.75, 0.6, 16]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
        />
      </mesh>

      {/* Trees / Withered Snags vs Lush Trees */}
      {[
        [-0.4, 0.4, 0.3],
        [0.4, 0.4, -0.3],
        [-0.3, 0.35, -0.4],
        [0.3, 0.35, 0.4],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]} scale={0.5 + t * 0.5}>
          {/* Tree Trunk */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.07, 0.5, 8]} />
            <meshStandardMaterial color="#573820" />
          </mesh>
          {/* Foliage (Grows as health rises) */}
          <mesh position={[0, 0.55, 0]} scale={[1, 1 + t * 0.5, 1]}>
            <coneGeometry args={[0.25, 0.55, 8]} />
            <meshStandardMaterial
              color={t > 0.4 ? "#22c55e" : "#a1a1aa"}
              roughness={0.6}
            />
          </mesh>
          {t > 0.7 && (
            <mesh position={[0, 0.8, 0]} scale={0.7}>
              <coneGeometry args={[0.2, 0.4, 8]} />
              <meshStandardMaterial color="#4ade80" />
            </mesh>
          )}
        </group>
      ))}

      {/* Spore / Firefly Floating Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={t > 0.5 ? "#059669" : "#0284c7"}
          transparent
          opacity={0.35 + t * 0.45}
        />
      </points>
    </group>
  );
};

export const BiosphereCanvas: React.FC<BiosphereCanvasProps> = ({ health }) => {
  return (
    <div
      className={`relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border-2 border-white shadow-[0_8px_24px_rgba(15,23,42,0.06),inset_0_2px_8px_rgba(255,255,255,0.9)] transition-colors duration-700 ${
        health < 50
          ? "bg-gradient-to-b from-sky-100 via-amber-50/50 to-slate-100"
          : health < 80
          ? "bg-gradient-to-b from-sky-200/80 via-teal-50/60 to-emerald-50"
          : "bg-gradient-to-b from-sky-200 via-cyan-100/70 to-emerald-100/80"
      }`}
    >
      <Canvas camera={{ position: [0, 1.8, 3.2], fov: 45 }}>
        <ambientLight intensity={1.2 + (health / 100) * 0.6} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.5 + (health / 100) * 0.8}
          color={health > 50 ? "#fffbeb" : "#ffffff"}
        />
        <pointLight
          position={[-3, 2, -2]}
          intensity={0.6}
          color={health > 60 ? "#34d399" : "#93c5fd"}
        />
        <BiosphereScene health={health} />
      </Canvas>

      {/* Overlay Status Pill */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-white text-xs font-black text-slate-700 flex items-center gap-2 shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            health < 50
              ? "bg-rose-500 animate-pulse"
              : health < 80
              ? "bg-amber-500"
              : "bg-emerald-500 animate-ping"
          }`}
        />
        <span>Biosphere Health: {health}%</span>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] font-black text-slate-600 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border-2 border-white shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
        Interactive 3D Simulation
      </div>
    </div>
  );
};
