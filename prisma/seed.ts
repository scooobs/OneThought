import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function seed() {
  const password = process.env.LOCAL_USER_PASSWORD;
  if (!password) {
    throw new Error(`LOCAL_USER_PASSWORD is not set in your env file.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.upsert({
    where: {
      userName: "con",
    },
    update: {
      password: hashedPassword,
    },
    create: {
      userName: "con",
      isAdmin: true,
      password: hashedPassword,
    },
  });

  const user2 = await db.user.upsert({
    where: {
      userName: "pat",
    },
    update: {
      password: hashedPassword,
    },
    create: {
      userName: "pat",
      isAdmin: false,
      password: hashedPassword,
    },
  });

  await db.thought.upsert({
    where: {
      userId_thoughtNumber: {
        userId: user2.id,
        thoughtNumber: 1,
      },
    },
    update: {
      text: `"Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Well, the party was nice, the party was pumpin' Yippie yi yo And everybody havin' a ball Yippie yi yo I tell the fellas start the name callin' Yippie yi yo And the girls respond to the call I heard a woman shout out Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? I see de dance people had a ball 'Coz she really want to skip town Get back, Gruffy, back, Scruffy Get back you flea infested mongrel Gonna tell myself, "Hey, man, no get angry" Yippie yi yo To any girls callin' them canine Yippie yi yo But they tell me, "Hey, man, it's part of the party? Yippie yi yo You put a woman in front and her man behind I heard woman shout out Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Say, a doggy is nuttin' if he don' have a bone All doggy, hold ya' bone, all doggy, hold it A doggy is nuttin' if he don' have a bone All doggy, hold ya' bone, all doggy, hold it Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? I see de dance people had a ball 'Coz she really want to skip town Get back, Gruffy, back, Scruffy Get back you flea infested mongrel Well, if I am a dog, the party is on I gotta get my groove 'cause my mind done gone Do you see the rays comin' from my eye Walkin' through the place that Digi-man is breakin' it down? Me and my white short shorts And I can't see color, any color will do I'll stick on you, that's why they call me 'Pit bull' 'Cause I'm the man of the land When they see me they say, ? Who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who? Who let the dogs out? Who, who, who, who, who?" `,
      views: 9872,
    },
    create: {
      thoughtNumber: 1,
      title: `Placholder Title`,
      text: `This is a seeded thought for the non admin user ${user2.userName}! Just trying to fill up some space here ya know!`,
      userId: user2.id,
    },
  });

  await db.thought.upsert({
    where: {
      userId_thoughtNumber: {
        userId: user.id,
        thoughtNumber: 1,
      },
    },
    update: {},
    create: {
      thoughtNumber: 1,
      title: `Placholder Title`,
      text: `This is a seeded thought for the user ${user.userName}! Just trying to fill up some space here ya know!`,
      userId: user.id,
    },
  });
  await db.thought.upsert({
    where: {
      userId_thoughtNumber: {
        userId: user.id,
        thoughtNumber: 2,
      },
    },
    update: {},
    create: {
      thoughtNumber: 2,
      title: `Placholder Title`,
      text: `This is a 2nd 2nd 2nd 2nd seeded thought for the user ${user.userName}! Just trying to fill up some space here ya know!`,
      userId: user.id,
    },
  });

  await db.thought.upsert({
    where: {
      userId_thoughtNumber: {
        userId: user.id,
        thoughtNumber: 3,
      },
    },
    update: {},
    create: {
      thoughtNumber: 3,
      title: `Placholder Title`,
      text: `This is a 3rd 3rd 3rd 3rd seeded thought for the user ${user.userName}! Just trying to fill up some space here ya know!`,
      userId: user.id,
    },
  });
}

seed();
