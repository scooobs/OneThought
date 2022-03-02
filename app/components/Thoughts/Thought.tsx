import React from "react";

import { GetRandomThought } from "~/utils/thoughts.server";
import { renderDate, renderName } from "~/utils/user.common";

interface ThoughtProps {
  thought: GetRandomThought;
  className?: string;
}

const renderViews = (views: number) => {
  switch (true) {
    case views < 1000: {
      return views.toString();
    }
    case views < 10000: {
      return `${Math.round(views / 1000, 2)}K`;
    }
    default: {
      return views.toString();
    }
  }
};

export default function Thought({ thought, className = "" }: ThoughtProps) {
  const thoughtDate = renderDate(new Date(thought.createdAt));

  return (
    <div className={className} id={thought.thoughtNumber}>
      <div className="bg-white flex flex-col rounded-md p-4 w-[1090px] flex-grow shadow-thought shadow-sky-700/50 br-8 m-[2px]">
        <p className="font-bold pb-3 text-2xl">{thought.title}</p>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-3">
            <hr className="h-[1px] bg-black border-0" />
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>author: </strong>
              {renderName(thought.user.userName, thought.user.isAdmin)}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>thought: </strong>
              {`#${thought.thoughtNumber}`}
            </p>
            <p className="px-2 text-sm whitespace-nowrap">
              <strong>date: </strong>
              {`${thoughtDate}`}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>views: </strong>
              {`${renderViews(thought.views)}`}
            </p>
          </div>
          <p className="text-sm text-justify">{`${thought.text}`}</p>
        </div>
        <div className="flex flex-row justify-end">
          <p className="text-xs">
            {renderName(thought.user.userName, thought.user.isAdmin)}
            <strong>{` #${thought.thoughtNumber} (${thoughtDate})`}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
