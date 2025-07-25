import React, { useRef } from "react";
import { EngineModel } from "./EngineModel";
import { useControls } from "leva";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export const apartAnimationStart = 0;
export const apartAnimationEnd = 5;
export const totalPages = 5;
export const eachPagedistance = 1 / totalPages;

export default function Expirence() {
  const { x, y, z, scale, px, py, pz, stop } = useControls({ name: "rotationx", x: -20.0, y: 20.0, z: 4, scale: 0.04, pz: 0, px: 0, py: 0, stop: 0 });
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    // Get camera position
    if (stop === 0) return;
    console.log("Camera Position:", camera.position);
    // Get camera rotation (Euler angles)
    console.log("Camera Rotation:", camera.rotation);

    // Optionally get target of OrbitControls
    if (controlsRef.current) {
      console.log("Controls Target:", controlsRef.current.target);
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} enableZoom={false} />

      <ambientLight intensity={2} />
      <directionalLight intensity={2} position={[-49.0, 2.0, 50.0]} />
      <directionalLight intensity={2} position={[0.0, -2.0, 2.0]} />
      <ScrollControls pages={5} damping={0.25}>
        <EngineModel scale={[scale, scale, scale]} position={[px, py, pz]} rotation={[Math.PI / (x * 0.1), Math.PI / (y * 0.1), Math.PI / (z * 0.01)]} />
      </ScrollControls>
    </>
  );
}
