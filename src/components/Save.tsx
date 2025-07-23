"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useRef, useState } from "react";

export default function TestPage() {
  gsap.registerPlugin(Draggable);
  const DEG = 180 / Math.PI;

  const drag = useRef<SVGGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [{ pathLength, startAngle, startPoint }, setData] = useState<{ pathLength: number; startPoint: DOMPoint | undefined; startAngle: number }>({ pathLength: 0, startAngle: 0, startPoint: undefined });

  useEffect(() => {
    if (!path.current) return;
    const pathLength = path.current?.getTotalLength() || 0;
    const startPoint = path.current?.getPointAtLength(0);
    const startAngle = getRotation(startPoint, path.current.getPointAtLength(0.1));
    setData({ pathLength, startAngle, startPoint });
  }, [path]);

  useEffect(() => {
    if (!startPoint || !drag.current || !path.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function closestPoint(pathNode: any, pathLength: any, point: any) {
      let precision = 8;
      let best;
      let bestLength;
      let bestDistance = Infinity;

      // linear scan for coarse approximation
      for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2((scan = pathNode.getPointAtLength(scanLength)))) < bestDistance) {
          best = scan;
          bestLength = scanLength;
          bestDistance = scanDistance;
        }
      }
      if (!bestLength) return;
      // binary search for precise estimate
      precision /= 2;
      while (precision > 0.5) {
        let before, after, beforeLength, afterLength, beforeDistance, afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2((before = pathNode.getPointAtLength(beforeLength)))) < bestDistance) {
          best = before;
          bestLength = beforeLength;
          bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2((after = pathNode.getPointAtLength(afterLength)))) < bestDistance) {
          best = after;
          bestLength = afterLength;
          bestDistance = afterDistance;
        } else {
          precision /= 2;
        }
      }

      // const len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
      // const rotation = getRotation(best, pathNode.getPointAtLength(len2));

      return {
        point: best,
        // rotation: rotation * DEG,
        distance: Math.sqrt(bestDistance),
      };

      function distance2(p: { x: number; y: number }) {
        const dx = p.x - point.x,
          dy = p.y - point.y;
        return dx * dx + dy * dy;
      }
    }

    function pointModifier(point: unknown) {
      const p = closestPoint(path.current, pathLength, point);
      if (!p) return;
      // gsap.set(drag.current, {
      //   rotation: p.rotation,
      // });

      return p.point;
    }
    gsap.set(drag.current, {
      transformOrigin: "center",
      // rotation: startAngle + "_rad",
      xPercent: -50,
      yPercent: -50,
      x: startPoint.x,
      y: startPoint.y,
    });

    new Draggable(drag.current, {
      liveSnap: {
        points: pointModifier,
      },
    });

    gsap.set(".container", {
      autoAlpha: 1,
    });
  }, [drag, startPoint, startAngle, pathLength, DEG, path]);

  function getRotation(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.atan2(dy, dx);
  }

  return (
    <div className="flex w-full h-screen  justify-center items-center">
      <svg viewBox="0 0 500 400" className="w-[70%]">
        <defs>
          <linearGradient id="grad-1" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0.2" stopColor="rgb(255, 135, 9)"></stop>
            <stop offset="0.8" stopColor="rgb(247, 189, 248)"></stop>
          </linearGradient>
        </defs>
        <path ref={path} id="path" fill="none" className="path" stroke="url(#grad-1)" d="M159 70c-50.386 35.428-74.284 72.547-71.691 111.355 2.592 38.81 31.514 76.92 86.765 114.333L447.7 84.137l-9.812 263.996" strokeWidth="4" />
        <g ref={drag} id="drag">
          <circle className="oval" cx="15" cy="15" r="15" fill="rgb(255, 135, 9)" />
          <polygon className="arrow" points="10,10 25,15 10,20" fill="#FFFCDC" />
        </g>
      </svg>
    </div>
  );
}
