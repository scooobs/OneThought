import React from "react";
import { useLoaderData } from "remix";
import { ProfilePageLoaderPayload } from "~/routes/user/$userName";
import { renderDate, renderName } from "~/utils/common";

import EmptyThought from "../Thoughts/EmptyThought";

import Thought from "../Thoughts/Thought";

export default function ProfilePage() {
  const { requestedUser, isMyProfile, thoughtToday } =
    useLoaderData<ProfilePageLoaderPayload>();

  if (!requestedUser) {
    return <div>User does not exist</div>;
  }

  return (
    <div className="mx-auto">
      <div className="overflow-auto scrollbar-hide h-[calc(100vh_-_64px)]">
        <div className="flex flex-row">
          <div className="rounded-md pt-4 mr-6 sticky self-start top-0">
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>user: </strong>
              {renderName(requestedUser.userName, requestedUser.isAdmin)}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>total thoughts: </strong>
              {requestedUser.thoughts.length}
            </p>
            <p className="px-2 text-sm  whitespace-nowrap">
              <strong>member since: </strong>
              {renderDate(new Date(requestedUser.createdAt))}
            </p>
          </div>

          <div>
            {!thoughtToday && isMyProfile ? (
              <EmptyThought user={requestedUser} className="mb-12" />
            ) : null}
            {requestedUser.thoughts.map((thought) => (
              <Thought className="mb-6" key={thought.id} thought={thought} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
