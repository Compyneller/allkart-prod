import { prisma, Prisma } from "@repo/db";

// 1. Define the Interface for the Raw SQL Result
// This helps TypeScript understand what the database is actually sending back.
interface RawSearchResult {
    id: number;
    title: string;
    description: string;
    storeId: number;
    // Variant Details (Cheapest)
    variant_id: string;
    selling_price: number;
    mrp: number;
    unit: string;
    unit_value: string;
    // Metadata
    variant_count: bigint; // Postgres COUNT returns BigInt
    image: string | null;
    score: number;
}

export const searchProducts = async ({ query, storeIds, page = 1 }: { query: string; storeIds: number[]; page: number; }) => {
    const sanitizedQuery = query.replace(/[^\w\s]/gi, '').trim();
    if (!sanitizedQuery) return [];

    // 2. THE SQL QUERY
    // We added subqueries for 'unit', 'unit_value', 'variant_id', and 'count'
    const rawProducts = await prisma.$queryRaw<RawSearchResult[]>`
        SELECT 
            p.id, 
            p.title, 
            p.description, 
            p."storeId",
            
            -- GET VARIANT COUNT (Matches _count)
            (SELECT COUNT(*)::int FROM "variants" v WHERE v."productId" = p.id) as variant_count,

            -- GET CHEAPEST VARIANT ID
            (SELECT v.id FROM "variants" v WHERE v."productId" = p.id ORDER BY v.selling_price ASC LIMIT 1) as variant_id,

            -- GET PRICES & UNITS (Matches variant fields)
            (SELECT v.selling_price FROM "variants" v WHERE v."productId" = p.id ORDER BY v.selling_price ASC LIMIT 1) as selling_price,
            (SELECT v.mrp FROM "variants" v WHERE v."productId" = p.id ORDER BY v.selling_price ASC LIMIT 1) as mrp,
            (SELECT v.unit FROM "variants" v WHERE v."productId" = p.id ORDER BY v.selling_price ASC LIMIT 1) as unit,
            (SELECT v.unit_value FROM "variants" v WHERE v."productId" = p.id ORDER BY v.selling_price ASC LIMIT 1) as unit_value,
            
            -- GET IMAGE
            (
                SELECT pi.url 
                FROM "productimage" pi 
                INNER JOIN "variants" v ON v.id = pi."variantId"
                WHERE v."productId" = p.id 
                LIMIT 1
            ) as image,

            -- RELEVANCE SCORE
            (
                SIMILARITY(p.title, ${sanitizedQuery}) * 2.0 
                + 
                SIMILARITY(p.description, ${sanitizedQuery}) * 0.5
            ) as score

        FROM "product" p
        WHERE 
            p."storeId" IN (${Prisma.join(storeIds)}) 
            AND (
                SIMILARITY(p.title, ${sanitizedQuery}) > 0.1
                OR 
                SIMILARITY(p.description, ${sanitizedQuery}) > 0.1
                OR
                EXISTS (
                    SELECT 1 FROM "category" c 
                    WHERE c.id = p."categoryId" 
                    AND SIMILARITY(c.name, ${sanitizedQuery}) > 0.2
                )
            )
        ORDER BY score DESC
        LIMIT 20 OFFSET ${(page - 1) * 20};
    `;

    // 3. THE MAPPER (The Magic Step)
    // We loop through the flat SQL results and rebuild the nested Prisma structure.
    return rawProducts.map(row => ({
        id: row.id,
        title: row.title,

        // 1. Match the _count structure
        _count: {
            variants: Number(row.variant_count) // Convert BigInt to Number
        },

        // 2. Match the nested variants array structure
        variants: [{
            id: row.variant_id,
            selling_price: row.selling_price,
            mrp: row.mrp,
            unit: row.unit,
            unit_value: row.unit_value,
            // 3. Match the nested prod_img array
            prod_img: row.image ? [{ url: row.image }] : []
        }]
    }));
};