import React from "react";
import { GetRandomThought } from "~/utils/thoughts.server";
import RandomThought from "../Thoughts/RandomThought";

interface HomePageProps {
  randomThought?: GetRandomThought;
}

export default function HomePage({ randomThought }: HomePageProps) {
  return (
    <div className="mx-auto overflow-auto scrollbar-hide">
      {randomThought ? (
        <RandomThought className="mt-24 pb-10" thought={randomThought} />
      ) : (
        <p>Could not render a randomThought</p>
      )}
    </div>
  );
}
