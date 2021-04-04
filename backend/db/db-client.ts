import {PrismaClient} from '@prisma/client';

const prismaClientPropertyName = `__prevent-name-collision__prisma`;

type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

let dbClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  dbClient = new PrismaClient();
} else {
  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
  if (!newGlobalThis[prismaClientPropertyName]) {
    newGlobalThis[prismaClientPropertyName] = new PrismaClient();
  }
  dbClient = newGlobalThis[prismaClientPropertyName];
}

export {dbClient};
