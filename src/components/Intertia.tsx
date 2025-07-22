//original by Blake Bowen https://codepen.io/osublake/
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import React, { useRef } from "react";

export default function Intertia() {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  const boundRef = useRef<HTMLDivElement>(null);
  const friction = -0.5;
  useGSAP(
    () => {
      if (!boundRef.current) return;
      const ball = gsap.utils.toArray(".ball")[0] as HTMLDivElement;
      if (!ball) return;
      const ballProps = gsap.getProperty(ball);
      const radius = ball.getBoundingClientRect().width / 2;
      const tracker = InertiaPlugin.track(ball, "x,y")[0];
      const vw = boundRef.current.offsetWidth;
      const vh = boundRef.current.offsetHeight;
      gsap.defaults({
        overwrite: true,
      });
      gsap.set(ball, {
        xPercent: -50,
        yPercent: -50,
        x: vw / 2,
        y: vh / 2,
      });

      Draggable.create(ball, {
        bounds: window,
        onPress() {
          gsap.killTweensOf(ball);
          this.update();
        },
        onDragEnd: animateBounce,
        onDragEndParams: [],
      });

      function animateBounce(x = "+=0", y = "+=0", vx = "auto", vy = "auto") {
        gsap.fromTo(
          ball,
          { x, y },
          {
            inertia: {
              x: vx,
              y: vy,
            },
            onUpdate: checkBounds,
          }
        );
      }

      function checkBounds() {
        const r = radius;
        const x = Number(ballProps("x"));
        const y = Number(ballProps("y"));
        let vx = tracker.get("x");
        let vy = tracker.get("y");
        let xPos = x;
        let yPos = y;

        let hitting = false;

        if (x + r > vw) {
          xPos = vw - r;
          vx *= friction;
          hitting = true;
        } else if (x - r < 0) {
          xPos = r;
          vx *= friction;
          hitting = true;
        }

        if (y + r > vh) {
          yPos = vh - r;
          vy *= friction;
          hitting = true;
        } else if (y - r < 0) {
          yPos = r;
          vy *= friction;
          hitting = true;
        }

        if (hitting) {
          animateBounce(`${xPos}`, `${yPos}`, `${vx}`, `${vy}`);
        }
      }
    },
    { dependencies: [boundRef] }
  );
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div ref={boundRef} className="w-1/2 h-1/2 border border-red-500">
        <div className="bg-amber-500 w-34 h-34 rounded-3xl col-span-1 row-start-1 ball"></div>
      </div>
    </div>
  );
}
