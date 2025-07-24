"use client";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh, Object3DEventMap } from "three";
import { useControls } from "leva";
function Donut() {
  const ring = useRef<Mesh>(null);
  const sphere = useRef<Mesh>(null);
  const { aNumber } = useControls({ name: "rotation", aNumber: -1 });

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta;
  });

  return (
    <group>
      <mesh rotation={[Math.PI / aNumber, 0, 0]} position={[0, 0, 0]} ref={sphere}>
        <sphereGeometry args={[1, 38, 16, 0, 3.19185813604723]} />
        <meshStandardMaterial color={"orange"} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / aNumber, 0, 0]} position={[0, 0, 0]} ref={ring}>
        <ringGeometry args={[1, 2]} />
        <meshStandardMaterial color={"orange"} wireframe />
      </mesh>
    </group>
  );
}

function Scene() {
  const directionalLightRef = useRef<DirectionalLight>(null!) as React.RefObject<DirectionalLight>;
  useHelper(directionalLightRef, DirectionalLightHelper);
  return (
    <>
      <directionalLight ref={directionalLightRef} position={[0, 0, 2]} intensity={0.5} rotation={[0, Math.PI / 8, 0]} />
      <ambientLight intensity={0.1} />
      <OrbitControls enableZoom enableRotate enableDamping />
      <Donut />
    </>
  );
}
export default function ThreeFiber() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
