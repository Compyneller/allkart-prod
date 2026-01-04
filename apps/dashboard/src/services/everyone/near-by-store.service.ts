import { prisma } from "@repo/db";
import redisClient from "@repo/redis-client";

export const getNearByStore = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const radiusKm = 5;
    const cachedData = await redisClient.get(`nearby-stores-${latitude}-${longitude}`);

    if (cachedData) {
        console.log('cached hit');

        return JSON.parse(cachedData);
    }

    const stores = await prisma.$queryRaw`
    WITH calculated_stores AS (
        SELECT 
            s.*, 
            a.lat, 
            a.long,
            a.address,
            a.city,
            (
                6371 * acos(
                    cos(radians(${latitude})) * cos(radians(a.lat)) 
                    * cos(radians(a.long) - radians(${longitude})) 
                    + sin(radians(${latitude})) * sin(radians(a.lat))
                )
            ) AS distance
        FROM "address" a
        INNER JOIN "store" s ON a."storeId" = s."id"
        WHERE s."isActive" = true
    )
    SELECT * FROM calculated_stores 
    WHERE distance <= ${radiusKm} 
    ORDER BY distance ASC;
`;


    await redisClient.set(`nearby-stores-${latitude}-${longitude}`, JSON.stringify(stores), {
        EX: 60 * 5
    });

    return stores;
}