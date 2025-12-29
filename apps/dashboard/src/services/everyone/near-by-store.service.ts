import { prisma } from "@repo/db";

export const getNearByStore = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const radiusKm = 5;

    const stores = await prisma.$queryRaw`
        WITH calculated_stores AS (
            SELECT 
                *, 
                (
                    6371 * acos(
                        cos(radians(${latitude})) * cos(radians(lat)) 
                        * cos(radians(long) - radians(${longitude})) 
                        + sin(radians(${latitude})) * sin(radians(lat))
                    )
                ) AS distance
            FROM "address"
        )
        SELECT * FROM calculated_stores 
        WHERE distance <= ${radiusKm} 
        ORDER BY distance ASC;
    `;




    return stores;
}