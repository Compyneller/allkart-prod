import { Prisma, prisma } from "@repo/db";

export const getSearchSuggestions = async ({
    query,
    storeIds
}: {
    query: string;
    storeIds: number[];
}) => {
    // 1. Sanitize (Basic security)
    const sanitizedQuery = query.replace(/[^\w\s]/gi, '').trim();

    if (!sanitizedQuery || sanitizedQuery.length < 2) return [];

    // 2. LIGHTWEIGHT QUERY (Target < 20ms)
    // We select DISTINCT titles to avoid duplicates.
    const suggestions = await prisma.$queryRaw<{ title: string }[]>`
        SELECT DISTINCT p.title
        FROM "product" p
        WHERE 
            -- A. Only check stores within 5km
            p."storeId" IN (${Prisma.join(storeIds)}) 
            
            -- B. "Starts With" Logic (Fastest for typing)
            -- We use ILIKE for case-insensitive matching
            AND p.title ILIKE ${sanitizedQuery + '%'} 

        ORDER BY p.title ASC
        
    `;

    // 3. Flatten the result (From [{title: "A"}] to ["A"])
    return suggestions;
};