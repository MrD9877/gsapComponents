import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import useAnimationPosition from "./useAnimationPosition";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
export type EndVectors = Record<string, { x: number; y: number; z: number }>;

const GEAR1 = { name: "polySurface11", speed: 0.1, gears: 39 };
const GEAR2 = { name: "polySurface12", gears: [11, 20], speed: -GEAR1.speed * (GEAR1.gears / 11) };
const GEAR3 = { name: "polySurface10", gears: 10, speed: -GEAR2.speed * (GEAR2.gears[1] / 11) };
const GEAR4 = { name: "polySurface666", gears: null, speed: GEAR3.speed };

export default function useEngineApart(group: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>, animations: THREE.AnimationClip[]) {
  const scroll = useScroll();
  const { endPositions, startPosition } = useAnimationPosition(animations, group);
  const tl = useRef<gsap.core.Timeline>(null);
  const { camera } = useThree();

  useFrame((s, delta) => {
    tl.current?.seek(scroll.offset * tl.current.duration());
    if (group.current) {
      group.current.traverse((child) => {
        if ((child as THREE.Group).isGroup) {
          const childGroup = child as THREE.Group;
          if (childGroup.name === GEAR1.name) {
            childGroup.rotation.y += delta * GEAR1.speed;
          }
          if (childGroup.name === GEAR2.name) {
            childGroup.rotation.y += delta * GEAR2.speed;
          }
          if (childGroup.name === GEAR3.name) {
            childGroup.rotation.y += delta * GEAR3.speed;
          }
          if (childGroup.name === GEAR4.name) {
            childGroup.rotation.y += delta * GEAR4.speed;
          }
        }
      });
    }
  });

  useLayoutEffect(() => {
    const timeline = gsap.timeline();
    tl.current = timeline;
    const timeout = setTimeout(() => {
      if (!group.current || !endPositions || !tl.current || !camera) return;
      tl.current.addLabel("main");
      tl.current.to(camera.position, { duration: 1, x: 6.839780469593434, y: 0.14591153711601176, z: 1.2470905458208157 }, "main");
      tl.current.to(camera.rotation, { duration: 1, x: -0.11647200866063376, y: 1.3169596903732201, z: 0.11277186829189283 }, "main");
      tl.current.to(group.current.position, { x: 0, y: 0, z: 0 }, "main");
      group.current.traverse((child) => {
        if ((child as THREE.Group).isGroup) {
          const group = child as THREE.Group;
          const name = group.name;
          const start = startPosition?.[name];
          if (start && tl.current) {
            tl.current.to(group.position, { x: start.x, y: start.y, z: start.z, duration: 1 }, "main");
          }
          if (endPositions[name] && tl.current) {
            tl.current.to(
              child.position,
              {
                x: endPositions[name].x,
                y: endPositions[name].y,
                z: endPositions[name].z,
                duration: 2,
              },
              "main+1"
            );
          }
        }
      });
      tl.current.progress(0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [endPositions, startPosition]);
}
