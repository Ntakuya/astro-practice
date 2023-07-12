import { prisma } from './client';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function upsertUsers() {
  return await Promise.all(
    [...Array(2)].map(() => {
      const email = faker.internet.email();

      return prisma.user.upsert({
        where: { email },
        update: {},
        create: buildCreateUserInput({ email }),
      });
    }),
  );
}

function buildCreateUserInput(input?: Partial<Prisma.UserCreateInput>) {
  const email = faker.internet.email();
  const name = faker.person.fullName();
  const uuid = randomUUID();

  return {
    userUUID: uuid,
    email,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    posts: {
      createMany: { data: [buildCreatePostInput()] },
    },
    ...input,
  };
}

function buildCreatePostInput(input?: Partial<Prisma.PostCreateInput>) {
  const uuid = randomUUID();
  const title = faker.lorem.word({ length: { max: 100, min: 1 } });
  const content = faker.lorem.word({ length: { max: 190, min: 1 } });
  return {
    postUUID: uuid,
    title,
    content,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...input,
  };
}
