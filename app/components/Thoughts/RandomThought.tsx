import React from "react";
import { renderName } from "~/utils/common";
import { GetRandomThought } from "~/utils/thoughts.server";

import Thought from "./Thought";

type RandomThoughtProps = {
  thought: GetRandomThought;
  className?: string;
};

export default function RandomThought({
  thought,
  className = "",
}: RandomThoughtProps) {
  return (
    <div className={className}>
      <p className="text-left text-2xl pb-6">
        <strong>{`here's what `}</strong>{" "}
        {renderName(thought.user.userName, thought.user.isAdmin)}
        <strong> thought yesterday... what will </strong> {`you `}
        <strong>think today?</strong>
      </p>
      <Thought thought={thought} key={thought.id} />
    </div>
  );
}
