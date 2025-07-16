"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "@/components/Planet";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 2, 1]} intensity={0.6} />
        <Earth map="/8K_earth_daymap.jpg" />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 2, 1]} intensity={0.6} />
        <Earth map="/8K_suns.jpg" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
