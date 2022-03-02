import React from "react";
import { Form, LoaderFunction } from "remix";
import { getUser, requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const user = getUser(request);
  return { user };
};

export default function ProtectedPage() {
  return (
    <>
      <div>This page is protected</div>
      <Form method="post" action="/logout">
        <button type="submit">Logout</button>
      </Form>
    </>
  );
}
