import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  return (event.context.prisma as PrismaClient).books.findMany();
})