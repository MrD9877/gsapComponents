import { RefObject } from "react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function useTrain(container: RefObject<HTMLDivElement | null>) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, MorphSVGPlugin);

  useGSAP(
    () => {
      gsap.set("#bridge", { autoAlpha: 1 });

      MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

      const treibstange = document.querySelector("#treibstange");
      const Kuppelstange = document.querySelector("#Kuppelstange");
      const kolbenStange = document.querySelector("#Kolbenstange");
      const svgWidth = document.querySelector("#bridge")?.getBoundingClientRect().width;
      if (!svgWidth) return;
      const duration = 1;
      const radius = 22.5;
      const ww = window.innerWidth;

      gsap.set("#helperCircle, #helperCircle02", { rotation: 180, transformOrigin: "center" });

      function theLoc(rep: number) {
        const tl = gsap.timeline({ repeat: rep });

        tl.to(
          "#Treibrad, #KuppelradH, #KuppelradV",
          {
            rotation: 360,
            transformOrigin: "center",
            duration: duration,
            ease: "none",
          },
          0
        );
        tl.to(
          ".small",
          {
            rotation: 360 * 2.4,
            transformOrigin: "center",
            duration: duration,
            ease: "none",
          },
          0
        );

        tl.to(
          kolbenStange,
          {
            duration: duration / 2,
            x: -radius,
            ease: "sine.inOut",
            repeat: 1,
            yoyo: true,
          },
          0
        );
        tl.to(
          treibstange,
          {
            motionPath: {
              path: "#helperCircle",
              align: "#helperCircle",
              offsetX: -13.1,
              offsetY: -13.0,
            },
            duration: duration,
            ease: "none",
            onUpdate: function () {
              const prog = this.progress();
              gsap.set(treibstange, { rotation: Math.sin(prog * Math.PI * 2) * -6.5, transformOrigin: "left center" }); // ???
            },
          },
          0
        );

        tl.to(
          Kuppelstange,
          {
            motionPath: {
              path: "#helperCircle02",
              align: "#helperCircle02",
              offsetX: -7.5,
              offsetY: -7.5,
            },
            duration: duration,
            ease: "none",
          },
          0
        );
        return tl;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#wrap",
          scrub: 0.3,
          pin: "#wrap",
          start: "top top",
          end: "+=4000",
          markers: true,
        },
      });

      tl.to("#bridge", { x: -svgWidth + ww, duration: 40, ease: "none" });
      tl.to("#lok", { x: 1200, duration: 65, ease: "none" }, 0);
      tl.from("#bridge", { attr: { viewBox: "0 140 1000 80" }, duration: 40, ease: "power2.out" }, 0);
      const tl2 = tl.add(theLoc(50), 0);

      return () => {
        tl.kill();
        tl2.kill();
      };
    },
    { scope: container }
  );
  return "";
}
