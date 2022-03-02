import React from "react";

import { GetUserByNameEnsured } from "~/utils/session.server";
import { renderDate, renderName } from "~/utils/user.common";

import Thought from "../Thoughts/Thought";

interface ProfilePageProps {
  user: GetUserByNameEnsured | undefined;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  if (!user) {
    return <div>User does not exist</div>;
  }

  return (
    <div className="mx-auto">
      <div className="overflow-auto scrollbar-hide h-[calc(100vh_-_64px)]">
        <div className="flex flex-row">
          <div className="rounded-md pt-4 mr-6 sticky self-start top-0">
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>user: </strong>
              {renderName(user.userName, user.isAdmin)}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>total thoughts: </strong>
              {user.thoughts.length}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>member since: </strong>
              {renderDate(new Date(user.createdAt))}
            </p>
          </div>
          <div>
            {user.thoughts.map((thought) => (
              <Thought className="mb-6" key={thought.id} thought={thought} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
