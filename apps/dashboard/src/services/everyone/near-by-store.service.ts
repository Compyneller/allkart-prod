import { prisma } from "@repo/db";
import redisClient from "@repo/redis-client";
import ngeohash from "ngeohash";

// Define a type so we don't lie to TypeScript
type StoreWithAddress = Awaited<ReturnType<typeof prisma.store.findMany>>[number];
type StoreWithAddressAndDistance = StoreWithAddress & { distance: number };
export const getNearByStore = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const RADIUS_METERS = 5000;
    const CACHE_TTL = 60 * 5;
    const geoHash = ngeohash.encode(latitude, longitude, 6);

    const cacheKey = `nearby-stores-data:${geoHash}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {


        return JSON.parse(cachedData) as (StoreWithAddress & { distance: number })[];
    }

    const stores = await prisma.$queryRaw<StoreWithAddressAndDistance[]>`
        SELECT 
            -- Store Details
            s.id,
            s.shop_name,
            s."categoryId",
            s."home_delivery",
            s."delivery_charge",
            s."handling_charge",
            s."free_delivery_after",
            s."isActive",
            
            -- Address Details (Renamed to avoid collisions if needed)
            a.address,
            a.city,
            a.landmark,
            a.pincode,
            
            -- Calculated Distance
            ST_Distance(
                a.coordinates,
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
            ) as distance

        FROM "address" a
        INNER JOIN "store" s ON s.id = a."storeId"  -- <--- THE JOIN
        WHERE 
            s."isActive" = true -- Filter active stores first
            AND ST_DWithin(
                a.coordinates, 
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography, 
                ${RADIUS_METERS}
            )
        ORDER BY distance ASC;
    `;

    await redisClient.set(cacheKey, JSON.stringify(stores), {
        EX: CACHE_TTL
    });

    return stores;
}