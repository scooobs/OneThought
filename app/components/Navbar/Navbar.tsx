import React from "react";
import { Link } from "remix";
import { getUser } from "~/utils/session.server";
import LoggedIn from "../User/LoggedIn";
import Login from "../User/Login";

export type NavbarProps = {
  suffix: string;
  user?: Awaited<ReturnType<typeof getUser>>;
};

export default function Navbar({ suffix, user = null }: NavbarProps) {
  return (
    <div className="max-h-16 min-h-16 h-16 flex justify-between items-center mx-5">
      <Link to="/">
        <p className="text-lg text-charcoal">
          <strong>One</strong>Thought{suffix && `/${suffix}`}
        </p>
      </Link>
      {user ? <LoggedIn user={user} /> : <Login />}
    </div>
  );
}
