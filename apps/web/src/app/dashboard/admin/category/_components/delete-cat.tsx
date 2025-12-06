import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios-instance";
import { CategoryType } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteCat = ({ catData }: { catData: CategoryType }) => {
  const queryClient = useQueryClient();

  const deleteImage = async (id: string) => {
    try {
      const { data } = await api.post(`/api/v1/delete-image`, { id: id });
      if (!data.success || data.message !== "Image deleted.") {
        toast.error("Failed to delete image.");
        throw new Error(data.message || "Failed to delete image.");
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };
  const handleDelete = async () => {
    try {
      await deleteImage(catData.publicId);
      const { data } = await api.delete(
        `/api/v1/dashboard/admin/category/${catData.id}`
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred.");
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleDelete,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success(responseData?.message || "Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <Button
      className="absolute top-0 right-0"
      size={"icon-sm"}
      disabled={isPending}
      onClick={() => mutate()}>
      {isPending ? <Spinner /> : <Trash />}
    </Button>
  );
};

export default DeleteCat;
