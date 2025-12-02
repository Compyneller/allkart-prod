"use client";
import React from "react";
import { Switch } from "../../../../components/ui/switch";
import { StoreTypes } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const StoreStatus = ({ data }: { data: StoreTypes }) => {
  const queryClient = useQueryClient();
  const handleStoreOpenOrClose = async ({
    id,
    isActive,
  }: {
    id: number;
    isActive: boolean;
  }) => {
    const { data: status } = await api.patch(`/api/v1/dashboard/store/${id}`, {
      isActive: !isActive,
    });
    return status;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleStoreOpenOrClose,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["store"] });
      toast.success("Store status updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });

  return (
    <Switch
      disabled={isPending}
      className={cn(isPending && "animate-pulse")}
      defaultChecked={data?.isActive}
      checked={data?.isActive}
      onCheckedChange={() =>
        mutate({ id: data?.id, isActive: data?.isActive! })
      }
    />
  );
};

export default StoreStatus;
