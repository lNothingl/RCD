import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
