"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

type DraggableContainerType = {
  children: React.ReactNode;
  liveSnap?: boolean;
  snapOnRelease?: boolean;
  gridHeight?: number;
  gridWidth?: number;
};

type MyComponentProps = React.HTMLAttributes<HTMLDivElement>;

export function DraggableBox({ className = "", children, ...props }: MyComponentProps) {
  return (
    <div className={`${className} box absolute`} id="box" {...props}>
      {children}
    </div>
  );
}

export default function DraggableContainer({ liveSnap, snapOnRelease, gridHeight = 50, gridWidth = 50, className = "", children, ...props }: DraggableContainerType & Omit<MyComponentProps, "ref">) {
  const containerDivRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
  console.log(gsap.plugins.inertia);
  function update() {
    const containerDiv = containerDivRef.current;
    if (!containerDiv) return;

    const boxes = gsap.utils.toArray(".box") as HTMLElement[];
    boxes.forEach((box) => {
      Draggable.create(box, {
        bounds: containerDiv,
        autoScroll: 1,
        edgeResistance: 0.65,
        type: "x,y",
        // throwProps: true,
        inertia: true,
        liveSnap: liveSnap,

        onRelease: function () {
          const tBounds = this.target.getBoundingClientRect();
          const wBounds = containerDiv.getBoundingClientRect();
          let wCenter = wBounds.left + wBounds.width / 2;
          let tCenter = tBounds.left + tBounds.width / 2;

          const scroll: { left?: number; top?: number } = {};

          if (tBounds.right > wBounds.right || tBounds.left < wBounds.left) {
            scroll.left = containerDiv.scrollLeft + (tCenter - wCenter);
          }

          if (tBounds.bottom > wBounds.bottom || tBounds.top < wBounds.top) {
            wCenter = wBounds.top + wBounds.height / 2;
            tCenter = tBounds.top + tBounds.height / 2;
            scroll.top = containerDiv.scrollTop + (tCenter - wCenter);
          }
          if (scroll.left && scroll.top)
            gsap.to(containerDiv, {
              duration: 0.8,
              scrollTo: scroll as ScrollToPlugin.Vars,
              ease: "power2.out",
            });
          applySnap();
        },

        snap: {
          x: function (endValue) {
            return snapOnRelease || liveSnap ? Math.round(endValue / gridWidth) * gridWidth : endValue;
          },
          y: function (endValue) {
            return snapOnRelease || liveSnap ? Math.round(endValue / gridHeight) * gridHeight : endValue;
          },
        },
      });
    });
  }

  function applySnap() {
    const containerDiv = containerDivRef.current;
    if (!containerDiv) return;

    if (snapOnRelease || liveSnap) {
      const boxes = gsap.utils.toArray(".box") as HTMLElement[];
      boxes.forEach((element) => {
        const x = Number(gsap.getProperty(element, "x"));
        const y = Number(gsap.getProperty(element, "y"));

        gsap.to(element, 0.5, {
          x: Math.round(x / gridWidth) * gridWidth,
          y: Math.round(y / gridHeight) * gridHeight,
          delay: 0.1,
          ease: "Power2.easeInOut",
        });
      });
      update();
    }
  }
  // Hook up event listeners

  useGSAP(
    () => {
      update();
    },
    { scope: containerDivRef }
  );

  return (
    <>
      <div ref={containerDivRef} className={`${className}  relative overflow-visible`} {...props}>
        {children}
      </div>
    </>
  );
}
