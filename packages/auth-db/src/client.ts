import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.USER_DATABASE_URL,
});

const globalForPrisma = global as unknown as { userdb: PrismaClient };

export const userdb =
  globalForPrisma.userdb ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.userdb = userdb;
