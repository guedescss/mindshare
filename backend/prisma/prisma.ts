import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prismaClient = globalForPrisma.prisma || new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

globalForPrisma.prisma = prismaClient;
