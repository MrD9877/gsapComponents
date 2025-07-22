import React, { use, createContext, useState, useEffect, useRef } from "react";
import "@/style/comments.css";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
type CommentsType = { comments: CommentType[]; comentInaRow: number; setTimeLines: React.Dispatch<React.SetStateAction<gsap.core.Timeline[] | undefined>> };
type AnimatedCommentsType = (CommentsType & CommentContextType) | CommentsType;

export type CommentType = {
  message: string;
  userName: string;
  name: string;
};

export type CommentContextType = {
  replaceWith: string;
  link: string;
  replace: string;
};

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

function ReplaceMessage({ message }: { message: string }) {
  const [parts, setParts] = useState<{ before: string; after: string }>();
  const context = use(CommentContext);

  useEffect(() => {
    if (!context) return;
    const pattern = new RegExp(`\\b${context.replace}\\b`, "i");
    const match = message.match(pattern);
    if (!match) return;
    const patternSplit = new RegExp(`\\b${match[0]}\\b`, "i");
    const parts = message.split(patternSplit);
    const before = parts[0].trim();
    const after = parts[1]?.trim() ?? "";
    setParts({ before, after });
  }, [context, message]);

  return (
    <>
      {parts ? (
        <>
          <span>{parts.before}</span>{" "}
          <Link href={context?.link || ""} target="_blank" className="cursor-pointer text-[#9382ff]">
            {context?.replaceWith}
          </Link>{" "}
          <span>{parts.after}</span>
        </>
      ) : (
        <>{message}</>
      )}
    </>
  );
}

function CommentsCard({ comment }: { comment: CommentType }) {
  return (
    <main className="w-[496px] px-[16px]">
      <div className="w-[480px] h-52 rounded-2xl comment-box px-7 py-6 text-white">
        <div className="flex gap-4 items-center mb-4.5">
          <div className="w-[50px] h-[50px]">
            <Image src={"/testDp.png"} alt="Profile Pic" width={50} height={50} className="object-cover rounded-full " />
          </div>
          <div className="flex flex-col">
            <span>{comment.name}</span>
            <span className="text-sm text-[#efedfd99]">{comment.userName}</span>
          </div>
        </div>
        <p className="text-[#efedfdb3]">
          <ReplaceMessage message={comment.message} />{" "}
        </p>
      </div>
    </main>
  );
}

export default function AnimatedComments(props: AnimatedCommentsType) {
  const { comentInaRow, comments, setTimeLines } = props;
  const containerDivRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const [context, setContext] = useState<CommentContextType>();
  const [commentsRow, setCommentsRow] = useState<CommentType[][]>();

  useEffect(() => {
    if (comments.length < 0 || comentInaRow < 5) return;
    const commentsRow: CommentType[][] = [];
    const rows = comments.length / comentInaRow;
    //
    for (let i = 0; i < rows; i++) {
      const a: CommentType[] = [];
      const lessThanJ = Math.min(comentInaRow + i * comentInaRow, comments.length);
      for (let j = 0 + i * comentInaRow; j < lessThanJ; j++) {
        a.push(comments[j]);
      }
      if (a.length >= 5) {
        commentsRow.push(a);
      }
    }
    ///
    setCommentsRow(commentsRow);
  }, [comentInaRow, comments]);

  useEffect(() => {
    if ("link" in props) {
      const { link, replace, replaceWith } = props;
      setContext({ link, replace, replaceWith });
    }
  }, [props]);

  useGSAP(
    (context) => {
      const q = context.selector;
      if (!q) return;
      const commentRows = q(".comment-row");
      const timeLine: gsap.core.Timeline[] = [];
      commentRows.forEach((row: HTMLDivElement) => {
        const rowWidth = row.offsetWidth;
        const commentBoxes = row.querySelectorAll(".comment-box");
        const commentBoxesWidth = rowWidth / commentBoxes.length;
        const directionBoolen = row.getAttribute("data-direction");
        const direction: boolean = directionBoolen === "true" ? false : true;
        commentBoxes.forEach((box, index) => {
          const tl = gsap.timeline({ repeat: -1 });
          const move = direction ? rowWidth - commentBoxesWidth * index : commentBoxesWidth * index;
          tl.to(box, {
            x: direction ? move : -move,
            duration: move / 15,
            ease: "none",
          });
          tl.set(box, { x: -commentBoxesWidth * index + (direction ? 0 : rowWidth) });
          tl.to(box, {
            x: direction ? move : -move,
            duration: rowWidth / 15,
            ease: "none",
          });
          timeLine.push(tl);
        });
      });
      setTimeLines(timeLine);
    },
    { scope: containerDivRef, dependencies: [commentsRow] }
  );

  return (
    <main ref={containerDivRef} className=" h-screen w-2/3 mx-auto relative overflow-x-hidden card-section">
      <CommentContext.Provider value={context}>
        <div className="flex flex-col gap-4 py-8  w-max justify-center items-center absolute left-[-800] z-10 h-max">
          {commentsRow?.map((comments, index) => {
            return (
              <div data-direction={index % 2 === 0} key={index} className="flex w-max comment-row h-max ">
                {comments.map((comment, index2) => {
                  return <CommentsCard key={`${index},${index2}`} comment={comment} />;
                })}
              </div>
            );
          })}
        </div>
      </CommentContext.Provider>
    </main>
  );
}
