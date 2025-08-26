// ThreeBackground.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function SphereMesh({ position, color }) {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

const ThreeBackground = () => {
  return (
    <Canvas style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Few floating spheres as animated backdrop */}
      <SphereMesh position={[-2, 1, -5]} color="#1976d2" />
      <SphereMesh position={[2, -1, -6]} color="#9c27b0" />
      <SphereMesh position={[0, 2, -7]} color="#00c853" />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default ThreeBackground;
