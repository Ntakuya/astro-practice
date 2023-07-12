import { prisma } from './client';
import { upsertUsers } from './create-user-and-post';

async function main() {
  await upsertUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
