import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  // const results = await event.context.pg.query('SELECT * FROM users');
  // console.log('> api -> get | users: resuls', results.rows);
  // return {
  //   count: results.rowCount,
  //   users: results.rows
  // }
  return (event.context.prisma as PrismaClient).users.findMany();
})