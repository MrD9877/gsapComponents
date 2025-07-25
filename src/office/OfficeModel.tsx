/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/WawaOffice.glb 
*/
"use client";
import React, { JSX, useLayoutEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export function OfficeModel(props: JSX.IntrinsicElements["group"]) {
  const FLOOR_HEIGHT = 2.3;
  const NUMBER_OF_FLOORS = 3;
  const { nodes, materials } = useGLTF("/models/WawaOffice.glb");
  const ref = useRef<THREE.Group>(null);
  const libraryRef = useRef<THREE.Group>(null);
  const atticRef = useRef<THREE.Group>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const scroll = useScroll();

  useFrame(() => {
    tl.current?.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (!ref.current || !libraryRef.current || !atticRef.current) return;

      const timeline = gsap.timeline();
      tl.current = timeline;

      if (!ref.current || !libraryRef.current || !atticRef.current) return;
      // VERTICAL ANIMATION
      tl.current.to(
        ref.current.position,
        {
          duration: 2,
          y: -FLOOR_HEIGHT * (NUMBER_OF_FLOORS - 1),
        },
        0
      );

      // Office Rotation
      tl.current.to(ref.current.rotation, { duration: 1, x: 0, y: Math.PI / 6, z: 0 }, 0);
      tl.current.to(ref.current.rotation, { duration: 1, x: 0, y: -Math.PI / 6, z: 0 }, 1);

      // Office movement
      tl.current.to(
        ref.current.position,
        {
          duration: 1,
          x: -1,
          z: 2,
        },
        0
      );
      tl.current.to(
        ref.current.position,
        {
          duration: 1,
          x: 1,
          z: 2,
        },
        1
      );

      // LIBRARY FLOOR
      tl.current.from(
        libraryRef.current.position,
        {
          duration: 0.5,
          x: -2,
        },
        0.5
      );
      tl.current.from(
        libraryRef.current.rotation,
        {
          duration: 0.5,
          y: -Math.PI / 2,
        },
        0
      );

      // ATTIC
      tl.current.from(
        atticRef.current.position,
        {
          duration: 1.5,
          y: 2,
        },
        0
      );

      tl.current.from(
        atticRef.current.rotation,
        {
          duration: 0.5,
          y: Math.PI / 2,
        },
        1
      );

      tl.current.from(
        atticRef.current.position,
        {
          duration: 0.5,

          z: -2,
        },
        1.5
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null} position={[0.5, -1, -1]} rotation={[0, -Math.PI / 3, 0]}>
      <mesh geometry={(nodes["01_office"] as THREE.Mesh).geometry} material={materials["01"]} />
      <group position={[0, 2.114, -2.23]}>
        <group ref={libraryRef}>
          <mesh geometry={(nodes["02_library"] as THREE.Mesh).geometry} material={materials["02"]} />
        </group>
      </group>
      <group position={[-1.97, 4.227, -2.199]}>
        <group ref={atticRef}>
          <mesh geometry={(nodes["03_attic"] as THREE.Mesh).geometry} material={materials["03"]} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/WawaOffice.glb");
