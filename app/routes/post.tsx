import { ActionFunction, redirect, json } from "remix";
import {
  THOUGHT_TEXT_LENGTH,
  THOUGHT_TITLE_LENGTH,
} from "~/components/Thoughts/consts";
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

export type ThoughtPostAction = {
  data: {
    title: string;
    text: string;
  };
  errors: {
    title: string | undefined | null;
    text: string | undefined | null;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const text = formData.get("text");
  const thoughtNumber = parseInt(formData.get("thoughtNumber"), 10);
  const data = {
    title,
    text,
  };
  const errors = {};

  if (!title) {
    errors.title = "You are missing a title";
  }

  if (typeof title !== "string" || title.length > THOUGHT_TITLE_LENGTH) {
    errors.title = "Your title is invalid";
  }

  if (!text) {
    errors.text = "You are missing a text body";
  }

  if (typeof text !== "string" || text.length > THOUGHT_TEXT_LENGTH) {
    errors.text = "Your text body is invalid";
  }

  if (typeof thoughtNumber !== "number") {
    errors.thoughtNumber = "thoughtNumber is NaN";
  }

  const returnedErrors = {
    data,
    errors,
  };

  if (Object.keys(errors).length) {
    return json(returnedErrors, { status: 422 });
  }

  await db.thought.create({
    data: {
      text,
      title,
      thoughtNumber,
      userId,
    },
  });

  return json(returnedErrors, { status: 200 });
};
