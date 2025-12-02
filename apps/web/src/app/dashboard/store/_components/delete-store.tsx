import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { Spinner } from "../../../../components/ui/spinner";
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

const DeleteStore = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleStoreOpenOrClose = async ({ id }: { id: number }) => {

    const { data: status } = await api.delete(`/api/v1/dashboard/store/${id}`);

    return status;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleStoreOpenOrClose,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["store"] });
      toast.success(responseData?.message || "Store Deleted");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className=" text-red-500"
          disabled={isPending}
          variant={"outline"}
          onClick={() => setIsOpen(true)}>
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            store and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => mutate({ id: id })}>
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStore;
