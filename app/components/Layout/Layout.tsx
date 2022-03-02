import React from "react";
import { getUser } from "~/utils/session.server";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  user?: Awaited<ReturnType<typeof getUser>>;
  navbarSuffix?: string;
}

export default function Layout({
  children,
  navbarSuffix = "",
  user,
}: LayoutProps) {
  return (
    <>
      <Navbar user={user} suffix={navbarSuffix} />
      {children}
    </>
  );
}
