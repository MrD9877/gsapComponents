"use client";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

function TextBox({ right, opacity, children }: { right?: boolean; opacity: number; children: ReactNode }) {
  return (
    <section className={`h-screen flex justify-center flex-col w-screen p-10 ${right ? "items-end" : "items-start"}`}>
      <div style={{ opacity }} className="w-1/2 flex justify-center items-center">
        <div className="max-w-sm bg-white px-8 py-12 rounded-lg">{children}</div>
      </div>
    </section>
  );
}

export default function Overlay() {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <main>
        <TextBox opacity={opacityFirstSection}>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-semibold font-serif text-2xl mb-1">Hello, I&apos;m Dhuruv Bansal</h1>
              <p className="text-gray-500">Welcome to my portfolio</p>
            </div>
            <div>
              <p className="mb-2"> I know:</p>
              <ul className="flex flex-col gap-2">
                <li>🌐 How to create beautiful wesites</li>
                <li>🛠️ How to solve problems</li>
                <li>📦 How to deliver</li>
              </ul>
            </div>
            <ArrowDown className="mt-8 animate-bounce" />
          </div>
        </TextBox>
        <TextBox right opacity={opacitySecondSection}>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-semibold font-serif text-2xl mb-1"> Here are my skillsets 🔥</h1>
              <p className="text-gray-500">Welcome to my portfolio</p>
            </div>
            <div>
              <p className="mb-2 font-bold">Frontend 🚀:</p>
              <ul className="flex flex-col gap-2">
                <li>ReactJS</li>
                <li>Nextjs</li>
                <li>Tailwind</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-bold"> Backend 🔬:</p>
              <ul className="flex flex-col gap-2">
                <li>NodeJs</li>
                <li>MongoDB</li>
                <li>Sockets</li>
              </ul>
            </div>
            <ArrowDown className="mt-8 animate-bounce" />
          </div>
        </TextBox>
        <TextBox opacity={opacityLastSection}>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-semibold font-serif text-2xl mb-1 ">Contact Me</h1>
            </div>
            <div>
              <ul className="flex flex-col gap-2">
                <li>✉︎ Dhuruvbansal99@gmail.com</li>
                <li>📞 +91 9877262039</li>
                <li>
                  <Link target="_blank" href={"https://dhuruvbansal.online"}>
                    🌐 dhuruvbansal.online
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </TextBox>
      </main>
    </Scroll>
  );
}
