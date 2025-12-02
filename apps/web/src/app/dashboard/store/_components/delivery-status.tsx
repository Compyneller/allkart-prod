"use client";
import React from "react";
import { Switch } from "../../../../components/ui/switch";
import { StoreTypes } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DeliveryStatus = ({ data }: { data: StoreTypes }) => {
  const queryClient = useQueryClient();
  const handleStoreOpenOrClose = async ({
    id,
    home_delivery,
  }: {
    id: number;
    home_delivery: boolean;
  }) => {
    const { data: status } = await api.patch(`/api/v1/dashboard/store/${id}`, {
      home_delivery: !home_delivery,
    });
    return status;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleStoreOpenOrClose,
    onSuccess: async (responseData) => {
      await queryClient.invalidateQueries({ queryKey: ["store"] });
      toast.success(
        responseData?.message || "Store status updated successfully!"
      );
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });

  return (
    <Switch
      className={cn(isPending && "animate-pulse")}
      defaultChecked={data && data.home_delivery}
      onCheckedChange={() =>
        mutate({ id: data?.id, home_delivery: data?.home_delivery! })
      }
    />
  );
};

export default DeliveryStatus;
