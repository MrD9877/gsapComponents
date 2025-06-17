"use client";

import DraggableContainer, { DraggableBox } from "@/components/Draggable";

export default function Home() {
  return (
    <DraggableContainer snapOnRelease={true} className="w-screen h-screen">
      <DraggableBox>hi</DraggableBox>
      <DraggableBox>live</DraggableBox>
      <DraggableBox>hi</DraggableBox>
    </DraggableContainer>
  );
}
