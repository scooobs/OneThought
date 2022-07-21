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
      createdAt: "desc",
    },
  });

  return thoughts;
};

export type GetUserThoughts = Awaited<ReturnType<typeof getUserThoughts>>;

export const getLatestThoughtNumber = async (userId: string) => {
  const endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);

  const thought = await db.thought.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  if (!thought) {
    return 0;
  }
  return thought.thoughtNumber;
};

export const hasThoughtToday = async (userId: string) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);

  const thoughtToday = await db.thought.findFirst({
    where: {
      userId,
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  if (thoughtToday) {
    return true;
  }
  return false;
};

export const createThought = async (
  userId: string,
  text: string,
  title: string
) => {
  const thoughtToday = await hasThoughtToday(userId);

  if (thoughtToday) {
    return false;
  }

  const thoughtNumber = (await getLatestThoughtNumber(userId)) + 1;

  await db.thought.create({
    data: {
      userId,
      text,
      title,
      thoughtNumber,
    },
  });

  return true;
};

export type CreateThought = Awaited<ReturnType<typeof createThought>>;