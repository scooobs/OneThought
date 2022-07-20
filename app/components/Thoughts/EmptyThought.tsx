import React, { useEffect, useState } from "react";
import { useFetcher } from "remix";

import { renderDate, renderName } from "~/utils/user.common";
import { GetUserByNameEnsured } from "~/utils/session.server";
import Input from "../Inputs/Input";
import TextArea from "../Inputs/TextArea";
import { THOUGHT_TEXT_LENGTH, THOUGHT_TITLE_LENGTH } from "./consts";
import { ThoughtPostAction } from "~/routes/post";

type EmptyThoughtProps = {
  user: GetUserByNameEnsured;
  className?: string;
};

// Figure out a better post button look
export default function EmptyThought({
  className = "",
  user,
}: EmptyThoughtProps) {
  const fetcher = useFetcher();
  const [data, setData] = useState<ThoughtPostAction>();

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

  const thoughtDate = renderDate(new Date());
  let latestThoughtNumber = 0;

  user.thoughts.forEach((thought) => {
    if (thought.thoughtNumber > latestThoughtNumber) {
      latestThoughtNumber = thought.thoughtNumber;
    }
  });

  latestThoughtNumber += 1;

  return (
    <fetcher.Form method="post" action="/post">
      <input name="thoughtNumber" type="hidden" value={latestThoughtNumber} />
      <div className={className} id="empty">
        <div className="bg-white flex flex-col rounded-md p-4 w-[1090px] flex-grow shadow-thought shadow-sky-700/50 br-8 m-[2px]">
          <Input
            name="title"
            type="text"
            placeholder="Empty Title"
            data={data ? data.data.title : null}
            error={data ? data.errors.title : null}
            maxLength={THOUGHT_TITLE_LENGTH}
            className="font-bold pb-3 text-2xl outline-none w-full"
          />
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              <hr className="h-[1px] bg-black border-0" />
              <p className="px-2 text-sm  whitespace-nowrap">
                <strong>author: </strong>
                {renderName(user.userName, user.isAdmin)}
              </p>
              <p className="px-2 text-sm  whitespace-nowrap">
                <strong>thought: </strong>#{latestThoughtNumber}
              </p>
              <p className="px-2 text-sm whitespace-nowrap">
                <strong>date: </strong>
                {`${thoughtDate}`}
              </p>
              <p className="px-2 text-sm  whitespace-nowrap">
                <strong>views: </strong>0
              </p>
              <button
                className="px-2 pt-[0.5] w-0 text-sm text-sky-500 hover:font-bold"
                type="submit"
              >
                Post
              </button>
            </div>
            <div className="flex flex-col flex-grow mb-1">
              <TextArea
                name="text"
                data={data ? data.data.text : null}
                error={data ? data.errors.text : null}
                maxLength={THOUGHT_TEXT_LENGTH}
                placeholder="Empty Text"
                className="text-sm text-justify w-full outline-none resize-none"
              />
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <p className="text-xs">
              {renderName(user.userName, user.isAdmin)}
              <strong>{` #${latestThoughtNumber} (${thoughtDate})`}</strong>
            </p>
          </div>
        </div>
      </div>
    </fetcher.Form>
  );
}
