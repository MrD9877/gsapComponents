/* eslint-disable @next/next/no-img-element */
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import React from "react";

export default function FlipBox() {
  gsap.registerPlugin(Flip);

  function flip() {
    const squares = gsap.utils.toArray(".box") as HTMLDivElement[];
    if (!squares) return;
    const state = Flip.getState(squares);
    squares[0].classList.toggle("col-start-2");
    squares[1].classList.toggle("col-start-1");
    Flip.from(state, {
      duration: 2,
      spin: 1,
    });
  }
  function flipImg() {
    const images = gsap.utils.toArray(".img") as HTMLDivElement[];
    if (!images) return;
    const state = Flip.getState(images);
    images[0].classList.toggle("w-full");
    images[0].classList.toggle("h-full");
    images[0].classList.toggle("object-contain");
    Flip.from(state, {
      duration: 2,
      scale: true,
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen gap-8 flex-col">
      <div className="w-1/2 grid grid-cols-2 grid-rows-1">
        <div className="box bg-amber-500 w-34 h-34 rounded-3xl col-span-1 row-start-1"></div>
        <div className="box bg-blue-500 w-34 h-34 rounded-3xl col-span-1 row-start-1"></div>
      </div>
      <button className="text-black bg-white rounded-4xl px-5 py-2" onClick={flip}>
        Flip()
      </button>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex justify-center items-center w-1/2 h-1/2">
          <img src="/flair-25.png" alt="" className="img" onClick={flipImg} />
        </div>
        {/* <img src="/flair-25.png" alt="" className="w-full h-full object-cover img hidden" onClick={flipImg} /> */}
      </div>
    </div>
  );
}
