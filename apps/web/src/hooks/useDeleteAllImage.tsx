"use client";
import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { clearImage } from "store/slices/imagesSlice";

const useDeleteAllImage = () => {
  const images = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();

  const handleDeleteAllImages = async (publicId?: string[]) => {
    try {
      const { data } = await api.post("/api/v1/delete-all-image", {
        ids: publicId ? publicId : images.map((img) => img.publicId),
      });
      if (!data.success || data.message !== "Images deleted.") {
        throw new Error(data.message || "Failed to delete images.");
      }
      dispatch(clearImage());
      toast.success("All images deleted successfully.");
    } catch (error) {
      dispatch(clearImage());
      console.error("Error deleting images:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return handleDeleteAllImages;
};

export default useDeleteAllImage;
