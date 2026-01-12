import { prisma } from "@repo/db";

/**
 * Migration script to populate the PostGIS coordinates field for existing addresses
 * This script updates all addresses that have lat/long but missing coordinates
 */
async function migrateExistingAddresses() {
    try {
        console.log("Starting migration of existing addresses...");

        // Update all addresses with lat/long to populate coordinates
        const result = await prisma.$executeRaw`
      UPDATE "address"
      SET coordinates = ST_SetSRID(ST_MakePoint("long", lat), 4326)::geography
      WHERE coordinates IS NULL 
        AND lat IS NOT NULL 
        AND "long" IS NOT NULL
        AND lat != 0 
        AND "long" != 0
    `;

        console.log(`Migration complete! Updated ${result} address records.`);

        // Verify the migration
        const totalAddresses = await prisma.address.count();
        const addressesWithCoordinates = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) 
      FROM "address" 
      WHERE coordinates IS NOT NULL
    `;

        console.log(`\nVerification:`);
        console.log(`- Total addresses: ${totalAddresses}`);
        console.log(`- Addresses with coordinates: ${addressesWithCoordinates[0].count}`);

    } catch (error) {
        console.error("Migration failed:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the migration
migrateExistingAddresses();
