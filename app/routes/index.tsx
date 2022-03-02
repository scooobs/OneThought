import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import HomePage from "~/components/HomePage/HomePage";
import Layout from "~/components/Layout/Layout";
import { getUser, GetUser } from "~/utils/session.server";
import { GetRandomThought, getRandomThought } from "~/utils/thoughts.server";

interface LoaderPayload {
  user?: GetUser;
  randomThought?: GetRandomThought;
}

export const loader: LoaderFunction = async ({ request }) => {
  const data: LoaderPayload = {};
  const randomThought = await getRandomThought();
  const user = await getUser(request);

  if (user) {
    data.user = user;
  }

  if (randomThought) {
    data.randomThought = randomThought;
  }

  return data;
};

export default function HomeController() {
  const data = useLoaderData<LoaderPayload>();

  return (
    <Layout user={data.user}>
      <HomePage randomThought={data.randomThought} />
    </Layout>
  );
}
