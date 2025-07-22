"use client";
/* eslint-disable @next/next/no-img-element */
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function TestPage() {
  const tween = useRef<gsap.core.Tween>(null);
  useEffect(() => {
    const nav = document.querySelector(".nav") as HTMLDivElement;
    if (!nav) return;
    tween.current = gsap.to(".flair", {
      duration: 2,
      x: () => nav.offsetWidth, // animate by the px width of the nav
      xPercent: -100, // offset by the width of the box
      rotation: 360,
      ease: "none",
      paused: true,
    });
  }, [tween]);
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <div className="nav w-1/2">
        <div className="flair w-fit h-fit">
          <img src="/flair-25.png" alt="" />
        </div>
      </div>
      <div className="flex gap-4">
        <button className="text-black bg-white rounded-4xl px-5 py-2" onClick={() => tween.current?.play()}>
          Play()
        </button>
        <button className="text-black bg-white rounded-4xl px-5 py-1" onClick={() => tween.current?.pause()}>
          Pause()
        </button>
        <button className="text-black bg-white rounded-4xl px-5 py-2" onClick={() => tween.current?.resume()}>
          Resume()
        </button>
        <button className="text-black bg-white rounded-4xl px-5 py-2" onClick={() => tween.current?.reverse()}>
          Reverse()
        </button>
        <button className="text-black bg-white rounded-4xl px-5 py-2" onClick={() => tween.current?.restart()}>
          Restart()
        </button>
      </div>
    </div>
  );
}
