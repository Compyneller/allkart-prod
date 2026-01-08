import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteAddress = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const handleDeleteUser = async () => {
    const { data } = await api.delete(`/api/V1/address/${id}`);
    return data;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      toast.success("Address Delete Success");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"icon-sm"} variant={"outline"} onClick={() => mutate()}>
          {isPending ? <Spinner /> : <Trash />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete Address</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DeleteAddress;
