"use client";
import React from "react";
import { OfficeModel } from "@/office/OfficeModel";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import Overlay from "./Overlay";
export default function Experience() {
  return (
    <>
      <ambientLight intensity={3} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        <Overlay />
        <OfficeModel />
      </ScrollControls>
    </>
  );
}
