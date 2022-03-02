import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "remix";
import { db } from "./db.server";

const invalidLoginError = {
  errors: {
    password: "password is incorrect",
  },
};
export const loginUser = async (userName: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      userName,
    },
  });

  if (!user) {
    return invalidLoginError;
  }

  const correctPassword = await bcrypt.compare(password, user?.password);

  if (!correctPassword) {
    return invalidLoginError;
  }

  return { errors: null, id: user.id, userName };
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error(`SESSION_SECRET is not defined in your .env file`);
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RT_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  },
});

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const getUserSession = (request: Request) =>
  storage.getSession(request.headers.get("Cookie"));

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
};

export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return user;
  } catch {
    throw logout(request);
  }
};

export type GetUser = Awaited<ReturnType<typeof getUser>>;

export type GetUserEnsured = NonNullable<GetUser>;

export const getUserByName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: {
      userName,
    },
    select: {
      id: true,
      userName: true,
      isAdmin: true,
      createdAt: true,
      thoughts: {
        select: {
          user: true,
          thoughtNumber: true,
          views: true,
          text: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          thoughtNumber: "desc",
        },
      },
    },
  });

  return user;
};

export type GetUserByName = Awaited<ReturnType<typeof getUserByName>>;
export type GetUserByNameEnsured = NonNullable<GetUserByName>;
