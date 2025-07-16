/* eslint-disable @next/next/no-img-element */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { clsx } from "clsx";

//   --background: #1a1721

const textClass = clsx("fixed", "top-[50vh]", "w-full", "text-white", "z-[-2]", "font-[termina,sans-serif]", "font-black", "not-italic", "text-[8vw]", "text-center", "transform -translate-y-full");

export const defaultImages = [
  { speed: 0.8, src: "https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60", alt: "" },
  { speed: 0.9, src: "https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", alt: "" },
  { speed: 1, src: "https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", alt: "" },
  { speed: 1.1, src: "https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80", alt: "" },
  { speed: 0.9, src: "https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80", alt: "" },
  { speed: 1.2, src: "https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", alt: "" },
  { speed: 0.8, src: "https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60", alt: "" },
  { speed: 1, src: "https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60", alt: "" },
];

type ImageScrolling =
  | {
      speed?: number;
      src: string;
      alt: string;
    }
  | {
      speed?: number;
      src: string;
      alt: string;
      gridArea: string;
    };

const imageGridArea = ["1/1/6/8", "3/12/8/20", "9/5/13/15", "14/1/18/8", "16/12/20/19", "20/2/25/9", "22/11/24/20", "26/5/30/15"];

export default function SmoothScrollImages({ images }: { images: ImageScrolling[] }) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
  const containerDivRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const skewSetter = gsap.quickTo("img", "skewY"); // fast
      const clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

      ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        speed: 3,
        effects: true,
        onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
        onStop: () => skewSetter(0),
      });
    },
    { scope: containerDivRef }
  );

  return (
    <div ref={containerDivRef} className="bg-darkPurpleBackground w-fit h-fit">
      <h1 style={{ WebkitTextStrokeWidth: "1.5px", WebkitTextStrokeColor: "white" }} className={`${textClass} text`}>
        Scrolly Images
      </h1>
      <h1
        aria-hidden="true"
        style={{
          color: "transparent",
          WebkitTextStrokeWidth: "1.5px",
          WebkitTextStrokeColor: "white",
        }}
        className={`${textClass} text  outline-text `}
      >
        Scrolly Images
      </h1>
      <h1
        aria-hidden="true"
        style={{
          zIndex: 2,
          color: "#804691",
          mixBlendMode: "screen",
          WebkitTextStrokeWidth: "1.5px",
          WebkitTextStrokeColor: "white",
        }}
        className={`${textClass} text filter-text`}
      >
        Scrolly Images
      </h1>

      <div id="wrapper" className="overflow-hidden fixed h-full w-full top-0 left-0 ">
        <section id="content" className="overflow-visible w-full">
          <section
            style={{
              gridTemplateColumns: "repeat(20, 2%)",
              gridTemplateRows: "repeat(30, 3%)",
            }}
            className="images pt-[60vh] relative w-full max-w-[1200px] my-0 mx-auto min-h-[150vh] h-full grid justify-center justify-items-center items-center z-[1] object-cover "
          >
            {images.map((item, index) => {
              let gridArea: string | undefined;

              return (
                <img
                  style={{
                    gridArea: gridArea || imageGridArea[index],
                  }}
                  data-speed={`${item.speed || 1}`}
                  key={index}
                  className="w-full h-full object-cover"
                  src={item.src}
                  alt={item.alt}
                />
              );
            })}
          </section>
        </section>
      </div>
    </div>
  );
}
