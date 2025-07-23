"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useRef, useState } from "react";

export default function DragCircleInPath() {
  gsap.registerPlugin(Draggable);
  const DEG = 180 / Math.PI;

  const drag = useRef<SVGGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [{ pathLength, startPoint }, setData] = useState<{ pathLength: number; startPoint: DOMPoint | undefined }>({ pathLength: 0, startPoint: undefined });

  useEffect(() => {
    if (!path.current) return;
    const pathLength = path.current?.getTotalLength() || 0;
    const startPoint = path.current?.getPointAtLength(0);
    setData({ pathLength, startPoint });
  }, []);

  useEffect(() => {
    if (!startPoint || !drag.current || !path.current) return;
    function closestPoint(pathNode: SVGPathElement | null, pathLength: number, point: { x: number; y: number }) {
      if (!pathNode) return;
      let precision = 8;
      let best;
      let bestLength: number | undefined;
      let bestDistance = Infinity;

      // linear scan for coarse approximation
      for (let i = 0; i <= pathLength; i += precision) {
        const scan = pathNode.getPointAtLength(i);
        const scanDistance = distance2(scan);
        if (scanDistance < bestDistance) {
          best = scan;
          bestLength = i;
          bestDistance = scanDistance;
        }
      }
      // binary search for precise estimate
      precision /= 2;
      while (precision > 0.5) {
        if (!bestLength) return;

        const beforeLength = bestLength - precision;
        const before = pathNode.getPointAtLength(beforeLength);
        const beforeDistance = distance2(before);
        const afterLength = bestLength + precision;
        const after = pathNode.getPointAtLength(afterLength);
        const afterDistance = distance2(after);

        if (beforeLength >= 0 && beforeDistance < bestDistance) {
          best = before;
          bestLength = beforeLength;
          bestDistance = beforeDistance;
        } else if (afterLength <= pathLength && afterDistance < bestDistance) {
          best = after;
          bestLength = afterLength;
          bestDistance = afterDistance;
        } else {
          precision /= 2;
        }
      }

      return best;

      function distance2(p: { x: number; y: number }) {
        const dx = p.x - point.x,
          dy = p.y - point.y;
        return dx * dx + dy * dy;
      }
    }

    gsap.set(drag.current, {
      transformOrigin: "center",
      xPercent: -50,
      yPercent: -50,
      x: startPoint.x,
      y: startPoint.y,
    });

    new Draggable(drag.current, {
      liveSnap: {
        points: (point) => {
          const p = closestPoint(path.current, pathLength, point);
          if (!p) return;
          return p;
        },
      },
    });

    gsap.set(".container", {
      autoAlpha: 1,
    });
  }, [drag, startPoint, pathLength, DEG, path]);

  return (
    <div className="flex w-full h-screen  justify-center items-center">
      <svg viewBox="0 0 800 600" className="w-[70%]">
        <defs>
          <linearGradient id="grad-1" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0.2" stopColor="rgb(255, 135, 9)"></stop>
            <stop offset="0.8" stopColor="rgb(247, 189, 248)"></stop>
          </linearGradient>
        </defs>
        {/* <path ref={path} id="path" fill="none" className="path" stroke="url(#grad-1)" d="M159 70c-50.386 35.428-74.284 72.547-71.691 111.355 2.592 38.81 31.514 76.92 86.765 114.333L447.7 84.137l-9.812 263.996" strokeWidth="4" /> */}
        <path ref={path} id="path" fill="none" className="path" stroke="url(#grad-1)" d="M439.7 206.4c26.3 0 26.3 34.2 52.6 34.2s26.3-34.2 52.6-34.2 26.3 34.2 52.6 34.2 26.3-34.2 52.6-34.2" strokeWidth="4" />
        <g ref={drag} id="drag">
          <circle className="oval" cx="15" cy="15" r="15" fill="rgb(255, 135, 9)" />
        </g>
      </svg>
    </div>
  );
}
