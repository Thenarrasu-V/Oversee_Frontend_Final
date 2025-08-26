// WarpBackground.js
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = () => {
  const pointsRef = useRef();
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = -Math.random() * 50;
  }

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.z = Math.sin(t * 0.1) * 2 + 10;
    pointsRef.current.rotation.z += 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        color="#00ffd5"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </Points>
  );
};

const WarpBackground = () => (
  <Canvas style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}>
    <ambientLight intensity={0.5} />
    <ParticleField />
  </Canvas>
);

export default WarpBackground;
