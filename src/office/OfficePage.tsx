"use client";
import Experience from "@/office/Experience";

import "./threescroll.css";

import { Canvas } from "@react-three/fiber";
import React from "react";

export default function OfficePage() {
  return (
    <Canvas camera={{ fov: 64, position: [2.3, 1.5, 2.3] }}>
      <Experience />
    </Canvas>
  );
}
