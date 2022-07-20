import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import Layout from "~/components/Layout/Layout";
import ProfilePage from "~/components/ProfilePage/ProfilePage";
import {
  getUser,
  GetUser,
  getUserByName,
  GetUserByNameEnsured,
} from "~/utils/session.server";
import { hasThoughtToday } from "~/utils/thoughts.server";

interface LoaderPayload {
  user?: GetUser;
  requestedUser?: GetUserByNameEnsured;
  thoughtToday: boolean;
  isMyProfile: boolean;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const data: LoaderPayload = {};
  const requestedUserName = params.userName;
  const user = await getUser(request);
  let thoughtToday = false;
  let isMyProfile = false;

  if (requestedUserName) {
    const requestedUser = await getUserByName(requestedUserName);
    if (requestedUser) {
      data.requestedUser = requestedUser;
    }
  }

  if (user) {
    data.user = user;
    thoughtToday = await hasThoughtToday(user.id);
    data.thoughtToday = thoughtToday;
    if (requestedUserName === user.userName) {
      isMyProfile = true;
    }
  }

  data.isMyProfile = isMyProfile;
  return data;
};

export default function ProfileController() {
  const data = useLoaderData<LoaderPayload>();

  return (
    <Layout
      navbarSuffix={`${
        data.isMyProfile ? "me" : `user/${data.requestedUser?.userName}`
      }`}
      user={data.user}
    >
      <ProfilePage
        user={data.requestedUser}
        isMyProfile={data.isMyProfile}
        thoughtToday={data.thoughtToday}
      />
    </Layout>
  );
}
