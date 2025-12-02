import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

const Ban = ({ id, banned }: { id: string; banned: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleStoreOpenOrClose = async ({ id }: { id: string }) => {
    const body = {
      banned: !banned,
    };
    const { data } = await api.patch(
      `/api/v1/dashboard/admin/user/${id}`,
      body
    );
    return data;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleStoreOpenOrClose,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Ban");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        {banned ? "Unban User" : "Ban User"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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

export default Ban;
