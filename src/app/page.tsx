"use client";

import DraggableContainer, { DraggableBox } from "@/components/Draggable";

export default function Home() {
  return (
    <DraggableContainer snapOnRelease={true} className="w-screen h-screen text-white">
      <DraggableBox>
        <div className="bg-amber-500 w-34 h-34 rounded-3xl col-span-1 row-start-1"></div>
      </DraggableBox>
      <DraggableBox>live</DraggableBox>
      <DraggableBox>hi</DraggableBox>
    </DraggableContainer>
  );
}
