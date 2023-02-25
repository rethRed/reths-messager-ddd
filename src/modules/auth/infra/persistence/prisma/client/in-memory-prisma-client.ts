import { PrismaClient } from "@prisma/client"
import sqlite3 from 'sqlite3';

export const inMemoryPrismaClient = new PrismaClient({
    datasources: {
      db: {
        url: 'sqlite::memory',
      },
    },
  });