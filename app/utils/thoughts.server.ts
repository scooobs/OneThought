import { db } from "./db.server";

export const getRandomThought = async () => {
  const count = await db.thought.count();
  const randomRow = Math.floor(Math.random() * count);

  const [randomThought] = await db.thought.findMany({
    take: 1,
    skip: randomRow,
    select: {
      user: {
        select: {
          id: true,
          userName: true,
          isAdmin: true,
        },
      },
      id: true,
      thoughtNumber: true,
      views: true,
      text: true,
      title: true,
      createdAt: true,
    },
  });

  return randomThought;
};

export type GetRandomThought = Awaited<ReturnType<typeof getRandomThought>>;

export const getUserThoughts = async (userId: string) => {
  const thoughts = await db.thought.findMany({
    where: {
      userId,
    },
    select: {
      user: {
        select: {
          id: true,
          userName: true,
          isAdmin: true,
        },
      },
      id: true,
      thoughtNumber: true,
      views: true,
      text: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      thoughtNumber: "desc",
    },
  });

  return thoughts;
};

export type GetUserThoughts = Awaited<ReturnType<typeof getUserThoughts>>;
