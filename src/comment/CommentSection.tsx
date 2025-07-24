"use client";

import AnimatedComments, { CommentType } from "@/comment/AnimatedComments";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useEffect, useState } from "react";

const comments: CommentType[] = [
  {
    message: "After trying multiple state management libraries, I always come back to Redux. Its predictable flow, centralized state, and ecosystem of tools like Redux DevTools make debugging and scaling .",
    userName: "@stateMaster",
    name: "Ananya Sharma",
  },
  {
    message: "Redux might seem verbose at first, but once you understand the pattern, it brings a lot of clarity to your code. I appreciate how it separates concerns and enforces a unidirectional data flow. ",
    userName: "@cleanCodeFan",
    name: "Rohan Mehta",
  },
  {
    message: "One of the best things about Redux is how easy it becomes to test your application logic. With actions and reducers being pure functions, unit testing becomes straightforward and effective, even in complex scenarios.",
    userName: "@devTester",
    name: "Sneha Kapoor",
  },
  {
    message: "Redux has a bit of a learning curve, but once you overcome it, you'll wonder how you managed state before. It makes scaling React applications smooth and keeps data consistent across the entire app.",
    userName: "@frontendFlow",
    name: "Aditya Verma",
  },
  {
    message: "I used to struggle managing deeply nested state in my apps, but Redux has been a game-changer. With well-structured slices and middleware like redux-thunk or saga, the flow of logic becomes clean and traceable.",
    userName: "@logicBuilder",
    name: "Pooja Iyer",
  },
  {
    message: "Redux helps me keep my project maintainable as it grows. It encourages a clear separation of logic, and when paired with Redux Toolkit, the boilerplate is significantly reduced. Highly recommended for  React .",
    userName: "@maintainabilityMatters",
    name: "Kunal Singh",
  },
  {
    message: "Redux Toolkit really improved the developer experience. What once felt like a lot of ceremony is now compact, intuitive, and powerful. I love the built-in support for immutability and dev tooling.",
    userName: "@rtkPowerUser",
    name: "Meera Joshi",
  },
  {
    message: "Whenever I build a feature-rich React app, I always rely on Redux for managing global state. It allows me to focus more on UI logic rather than worrying about syncing data across components.",
    userName: "@focusDev",
    name: "Ishaan Tiwari",
  },
  {
    message: "Redux gives me confidence in large codebases. The strict data flow and centralized store make it easier to trace bugs and understand how changes in one part of the app affect another.",
    userName: "@bugHunter",
    name: "Nikita Desai",
  },
  {
    message: "For applications where state gets complicated quickly, Redux offers a mature and well-documented solution. It plays well with TypeScript and supports advanced patterns like normalization and memoization.",
    userName: "@typescriptFanboy",
    name: "Devansh Rawat",
  },
  {
    message: "For applications where state gets complicated quickly, Redux offers a mature and well-documented solution. It plays well with TypeScript and supports advanced patterns like normalization and memoization.",
    userName: "@typescriptFanboy",
    name: "Devansh Rawat",
  },
];
export default function CommentSection() {
  const [timelines, setTimeLines] = useState<gsap.core.Timeline[]>();
  gsap.registerPlugin(Observer);

  useEffect(() => {
    console.log(timelines);
  }, [timelines]);

  useEffect(() => {
    if (!timelines) return;
    Observer.create({
      type: "touch,pointer",
      target: ".card-section",
      wheelSpeed: -1,

      onPress: () =>
        timelines.forEach((tween) => {
          tween.pause();
        }),

      onRelease: () =>
        timelines.forEach((tween) => {
          tween.reverse(10).then((tl) => tl.play());
        }),
      tolerance: 10,
      preventDefault: true,
    });
  }, [timelines]);
  return (
    <div className="bg-[#030014]">
      <AnimatedComments setTimeLines={setTimeLines} comments={comments} comentInaRow={5} link="https://dhuruvbansal.online" replace={"redux"} replaceWith="@Redux.js" />;
      {timelines && (
        <div className="flex gap-4">
          <button
            className="text-black bg-white rounded-4xl px-5 py-2"
            onClick={() => {
              timelines.forEach((tween) => {
                tween.play();
              });
            }}
          >
            Play()
          </button>
          <button
            className="text-black bg-white rounded-4xl px-5 py-1"
            onClick={() => {
              timelines.forEach((tween) => {
                tween.pause();
              });
            }}
          >
            Pause()
          </button>
          <button
            className="text-black bg-white rounded-4xl px-5 py-2"
            onClick={() => {
              timelines.forEach((tween) => {
                tween.resume();
              });
            }}
          >
            Resume()
          </button>
          <button
            className="text-black bg-white rounded-4xl px-5 py-2"
            onClick={() => {
              timelines.forEach((tween) => {
                tween.reverse();
              });
            }}
          >
            Reverse()
          </button>
          <button
            className="text-black bg-white rounded-4xl px-5 py-2"
            onClick={() => {
              timelines.forEach((tween) => {
                tween.restart();
              });
            }}
          >
            Restart()
          </button>
        </div>
      )}
    </div>
  );
}
