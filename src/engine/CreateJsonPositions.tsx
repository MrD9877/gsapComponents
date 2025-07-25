import { writeJson } from "@/utility/writeJson";
import { useAnimations } from "@react-three/drei";
import React, { useEffect, useState } from "react";
export type EndVectors = Record<string, { x: number; y: number; z: number }>;
import * as THREE from "three";

export default function CreateJsonPositions(animations: THREE.AnimationClip[], group: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>) {
  const [endPositions, setEndPositions] = useState<EndVectors>();
  const { actions, mixer } = useAnimations(animations, group);
  useEffect(() => {
    if (!animations.length || !group.current) return;

    // Play the first animation
    const action = actions[animations[0].name];
    if (!action) return;

    action.play();
    action.paused = true;

    // Set to specific time
    const targetTime = 1.68; // seconds
    action.time = targetTime;

    // Force mixer to apply animation
    mixer.update(0);

    // Wait one frame to ensure scene graph is updated
    requestAnimationFrame(() => {
      if (!animations.length || !group.current) return;
      const vec: EndVectors = {};
      group.current.traverse((child) => {
        if ((child as THREE.Group).isGroup) {
          const group = child as THREE.Group;
          const name = group.name;
          const x = group.position.x;
          const y = group.position.y;
          const z = group.position.z;
          vec[name] = { x, y, z };
        }
      });
      setEndPositions(vec);
      action.stop();
      mixer.update(0);
    });
  }, [actions, animations, mixer, group]);

  useEffect(() => {
    if (endPositions) writeJson(endPositions);
  }, [endPositions]);

  return <div></div>;
}
