"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import React, { useRef } from "react";

export default function Page() {
  const containerDivRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP, MotionPathHelper, MotionPathPlugin);

  useGSAP(
    (context) => {
      const q = context.selector;
      if (!q) return;
      gsap.set(".ball", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50%, 50%",
      });
      const tl = gsap.timeline({ repeat: -1 });
      function restart() {
        tl.play(0);
      }
      tl.to(
        ".ball",
        {
          duration: 10,
          motionPath: {
            path: ".loop",
            align: ".loop",
            start: 0,
            end: 1,
          },
        },
        0.65
      ).add(restart, 10);
    },
    { scope: containerDivRef }
  );
  return (
    <>
      <div ref={containerDivRef} className="flex justify-center items-center w-screen h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" stroke="#393b54" viewBox="0 18.149999618530273 147.25 47.25" data-asc="1.303" width="147.25" height="47.25">
          <defs />
          <g>
            <g fill="none">
              <g transform="translate(0, 0)">
                <path
                  stroke="#393b54"
                  className="loop"
                  strokeWidth={5}
                  d="M13.15 65.40Q10.25 65.40 6.60 64.90Q4.60 64.65 3.85 63.85Q3.10 63.05 3.20 61.25Q3.55 56.30 4.85 49.02Q6.15 41.75 8 35.00Q8.35 33.75 9.40 33.25Q10.45 32.75 12.15 32.75Q15.20 32.75 15.20 34.45Q15.20 35.15 14.90 36.05Q13.60 40.05 12.30 46.77Q11 53.50 10.45 59.60Q11.95 59.75 13.85 59.75Q22.60 59.75 26.93 54.45Q31.25 49.15 31.25 40.30Q31.25 34.35 27.85 31.10Q24.45 27.85 18.25 27.85Q14.25 27.85 10.33 29.10Q6.40 30.35 3.25 32.40Q2.60 32.85 1.85 32.85Q1 32.85 0.50 32.12Q0 31.40 0 30.35Q0 29.15 0.40 28.37Q0.80 27.60 1.75 26.95Q5.20 24.60 9.85 23.37Q14.50 22.15 18.80 22.15Q24.90 22.15 29.35 24.27Q33.80 26.40 36.20 30.50Q38.60 34.60 38.60 40.40Q38.60 47.95 35.60 53.57Q32.60 59.20 26.85 62.30Q21.10 65.40 13.15 65.40Z"
                />
                <circle className="ball" cx="26.76" cy="72.01" r="2.26" fill="#64C898" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
