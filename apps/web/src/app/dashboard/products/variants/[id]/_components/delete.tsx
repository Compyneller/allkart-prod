import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios-instance";
import { ProductImage } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteVariant = ({ img, id }: { img: ProductImage[]; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteAllImages = async () => {
    const publicIds = img.map((item) => item.publicId);
    const { data } = await api.post("/api/v1/delete-all-image", {
      ids: publicIds,
    });
    return data;
  };

  const handleDeleteProduct = async ({ id }: { id: string }) => {
    const res = await deleteAllImages();

    // if (!res.success || res.message !== "Images deleted.") {
    //   throw new Error(res.message || "Failed to delete images.");
    // }
    const { data: status } = await api.delete(
      `/api/v1/dashboard/variant/${id}`
    );
    return status;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteProduct,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      toast.success(responseData?.message || "Product Successfully Deleted");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <div className="flex items-center gap-2 text-red-500">
          <Trash className="text-red-500" /> Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => mutate({ id: id })}>
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVariant;
