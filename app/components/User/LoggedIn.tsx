import React, { useState } from "react";
import { Form } from "remix";
import { GetUserEnsured } from "~/utils/session.server";

type LoggedInProps = {
  user: GetUserEnsured;
};

type HoverHandlerProps = {
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  children?: React.ReactNode;
};

function HoverHandler({
  handleMouseOver,
  handleMouseOut,
  children,
}: HoverHandlerProps) {
  return (
    <div
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      {children}
    </div>
  );
}

type LoggedInStateProps = {
  isAdmin: boolean;
  userName: string;
};

function LoggedInState({ isAdmin, userName }: LoggedInStateProps) {
  return (
    <div className="w-[156px] text-right">
      <p>
        <strong>Logged in as:</strong>
        <span className={isAdmin ? "text-red-700" : ""}>{` ${userName}`}</span>
      </p>
    </div>
  );
}

function LogoutState() {
  return (
    <div className="w-[156px] text-right">
      <Form method="post" action="/logout">
        <button type="submit">
          <strong>Logout</strong>
        </button>
      </Form>
    </div>
  );
}

export default function LoggedIn({ user }: LoggedInProps) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <HoverHandler
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
    >
      {isHovering ? (
        <LogoutState />
      ) : (
        <LoggedInState isAdmin={user.isAdmin} userName={user.userName} />
      )}
    </HoverHandler>
  );
}
