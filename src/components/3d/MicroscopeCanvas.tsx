"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MicroscopeVisualProps {
  shape: "bacillus" | "hyphae" | "amoeboid" | "flagellate";
  color: string;
  focus: number; // 0 to 100 (50 is sharp focus)
  light: number; // 0 to 100
}

const BacteriaColony = ({ color, focus }: { color: string; focus: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const blurFactor = Math.abs(focus - 50) / 50; // 0 is sharp, 1 is blurry

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.2;
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.003;
        child.position.x += Math.cos(state.clock.elapsedTime * 1.5 + i) * 0.003;
      });
    }
  });

  const bacteriaPositions = [
    [-0.8, 0.4, 0],
    [0.7, -0.5, 0.2],
    [-0.2, -0.7, -0.1],
    [0.4, 0.8, -0.2],
    [0.1, 0.1, 0.1],
    [-0.9, -0.4, 0.1],
    [0.9, 0.3, -0.1],
  ];

  return (
    <group ref={groupRef}>
      {bacteriaPositions.map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} rotation={[0, 0, idx * 0.8]}>
          <capsuleGeometry args={[0.18, 0.45, 12, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6 * (1 - blurFactor * 0.5)}
            roughness={0.2 + blurFactor * 0.7}
            transparent
            opacity={0.9 - blurFactor * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const FungiHyphae = ({ color, focus }: { color: string; focus: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const blurFactor = Math.abs(focus - 50) / 50;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central spore cluster */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.4 + blurFactor * 0.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Radiating hyphae filaments */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, 0, rad]}>
            <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.08, 1.4, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8 - blurFactor * 0.3}
              />
            </mesh>
            <mesh position={[1.4, 0.1, 0]}>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const ProtozoaCell = ({ color, focus }: { color: string; focus: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const blurFactor = Math.abs(focus - 50) / 50;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.scale.x = 1 + Math.sin(time * 3) * 0.08;
      meshRef.current.scale.y = 1 + Math.cos(time * 2.5) * 0.08;
      meshRef.current.position.x = Math.sin(time * 0.8) * 0.2;
      meshRef.current.position.y = Math.cos(time * 0.6) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[0.8, 2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1 + blurFactor * 0.7}
        transparent
        opacity={0.75 - blurFactor * 0.3}
        wireframe={false}
      />
    </mesh>
  );
};

const AlgaeColony = ({ color, focus }: { color: string; focus: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const blurFactor = Math.abs(focus - 50) / 50;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  const cells = [
    [0, 0, 0],
    [0.4, 0.4, 0.2],
    [-0.4, 0.3, -0.2],
    [0.3, -0.4, -0.1],
    [-0.3, -0.3, 0.3],
    [0.5, -0.2, 0.3],
  ];

  return (
    <group ref={groupRef}>
      {cells.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            roughness={0.2 + blurFactor * 0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
};

export const MicroscopeCanvas: React.FC<MicroscopeVisualProps> = ({
  shape,
  color,
  focus,
  light,
}) => {
  const lightIntensity = (light / 100) * 2.5 + 0.5;

  return (
    <div className="relative w-56 h-56 sm:w-80 sm:h-80 2xl:w-[400px] 2xl:h-[400px] mx-auto rounded-full overflow-hidden border-4 sm:border-8 border-slate-700 bg-slate-950 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/30">
      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={lightIntensity * 0.6} />
        <pointLight position={[2, 2, 4]} intensity={lightIntensity * 1.5} color="#ffffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color={color} />

        {shape === "bacillus" && <BacteriaColony color={color} focus={focus} />}
        {shape === "hyphae" && <FungiHyphae color={color} focus={focus} />}
        {shape === "amoeboid" && <ProtozoaCell color={color} focus={focus} />}
        {shape === "flagellate" && <AlgaeColony color={color} focus={focus} />}
      </Canvas>

      {/* Microscope Circular Reticle Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Crosshairs */}
        <div className="w-full h-[1px] bg-emerald-500/20" />
        <div className="absolute h-full w-[1px] bg-emerald-500/20" />
        <div className="w-36 h-36 sm:w-48 sm:h-48 2xl:w-64 2xl:h-64 rounded-full border border-emerald-500/30 border-dashed" />
        <div className="w-20 h-20 sm:w-28 sm:h-28 2xl:w-36 2xl:h-36 rounded-full border border-emerald-500/20" />
      </div>

      {/* Vignette & Lens Glare */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_45%,rgba(2,6,23,0.85)_100%)]" />
      <div className="absolute top-4 left-6 w-16 h-8 bg-white/10 rounded-full blur-md rotate-[-30deg] pointer-events-none" />

      {/* Magnification label */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 text-emerald-400 border border-emerald-500/40 text-[9px] sm:text-[10px] 2xl:text-xs font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full tracking-widest pointer-events-none shadow">
        1000× OIL IMMERSION
      </div>
    </div>
  );
};
