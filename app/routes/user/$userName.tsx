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
import {
  getLatestThoughtNumber,
  hasThoughtToday,
} from "~/utils/thoughts.server";

export type ProfilePageLoaderPayload = {
  user?: GetUser;
  requestedUser?: GetUserByNameEnsured;
  latestThoughtNumber: number;
  thoughtToday: boolean;
  isMyProfile: boolean;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const data: ProfilePageLoaderPayload = {};
  data.latestThoughtNumber = 0;
  const requestedUserName = params.userName;
  const user = await getUser(request);
  let thoughtToday = false;
  let isMyProfile = false;

  if (requestedUserName) {
    const requestedUser = await getUserByName(requestedUserName);
    if (requestedUser) {
      const latestThoughtNumber = await getLatestThoughtNumber(
        requestedUser.id
      );
      data.latestThoughtNumber = latestThoughtNumber;
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
  const data = useLoaderData<ProfilePageLoaderPayload>();

  return (
    <Layout
      navbarSuffix={`${
        data.isMyProfile ? "me" : `user/${data.requestedUser?.userName}`
      }`}
      user={data.user}
    >
      <ProfilePage />
    </Layout>
  );
}
