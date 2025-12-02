import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@repo/db";
import { ApiError } from "@repo/express-middleware";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const deleteSingleImageService = async ({ public_id }: { public_id: string }) => {
    try {
        cloudinary.uploader.destroy(public_id, async (error: any, result: any) => {
            if (error) {
                throw new ApiError(error.message, { status: 400 });
            }

            if (result.result === "ok") {
                const checkPublicId = await prisma.productImage.findFirst({
                    where: {
                        publicId: public_id,
                    },
                });
                if (checkPublicId) {
                    await prisma.productImage.delete({
                        where: {
                            id: checkPublicId.id,
                            publicId: public_id,
                        },
                    });
                }
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 400 });
        }
    }
}


export const deleteAllImagesService = async ({ publicIds }: { publicIds: string[] }) => {
    try {
        await cloudinary.api.delete_resources(
            publicIds,
            async (error: any, result: any) => {
                if (error) {
                    throw new ApiError(error.message, { status: 400 });
                }
                const checkPublicId = await prisma.productImage.findMany({
                    where: {
                        publicId: {
                            in: publicIds,
                        },
                    },
                });
                if (checkPublicId) {
                    await prisma.productImage.deleteMany({
                        where: {
                            publicId: {
                                in: publicIds,
                            },
                        },
                    });
                }
            }
        );

    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, { status: 400 });
        }
    }
}