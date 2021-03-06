import React from "react";
import { Link } from "remix";

export const renderDate = (date: Date) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
};

export const renderViews = (views: number) => {
  switch (true) {
    case views < 1000: {
      return views.toString();
    }
    case views < 10000: {
      return `${Math.round(views / 1000, 2)}K`;
    }
    default: {
      return views.toString();
    }
  }
};

export const renderName = (userName: string, isAdmin: boolean) => (
  // let colour = "sky-500";
  // if (user.isAdmin) {
  //   colour = "red-700";
  // }

  // What I want
  // <span
  //   className={`hover:underline hover:font-bold decoration-wavy hover:text-${colour}  decoration-${colour}`}
  // >
  //   {user.userName}
  // </span>
  <Link to={`/user/${userName}`}>
    <span
      className={`hover:font-bold ${
        isAdmin
          ? "text-red-700 decoration-red-700"
          : "hover:text-sky-500 decoration-sky-500"
      }`}
    >
      {userName}
    </span>
  </Link>
);
