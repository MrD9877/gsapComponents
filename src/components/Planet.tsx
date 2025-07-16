"use client";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function Earth({ map }: { map: string }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, map);

  //   useFrame(() => {
  //     if (earthRef.current) {
  //       earthRef.current.rotation.y += 0.002;
  //     }
  //   });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
