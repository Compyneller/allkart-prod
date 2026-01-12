// fix_history.ts
import { prisma } from './src/client'


async function main() {
    try {
        console.log("Cleaning migration history...");
        // This deletes the records of past migrations but KEEPS your data
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "_prisma_migrations";`);
        console.log("Migration history cleaned. You are ready to re-baseline.");
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();