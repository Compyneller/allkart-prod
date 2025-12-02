"use client";
import Categories from "@/components/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeUpdateSchema } from "@repo/schema";
import { StoreTypes } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateStore = ({ data }: { data: StoreTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof storeUpdateSchema>>({
    resolver: zodResolver(storeUpdateSchema),
    defaultValues: {
      shop_name: data?.shop_name,
      categoryId: data?.category.id,
      home_delivery: data?.home_delivery,
    },
  });

  const handleSubmitForm = async ({
    values,
    id,
  }: {
    values: z.infer<typeof storeUpdateSchema>;
    id: number;
  }) => {
    const body = values;

    const { data } = await api.patch(`/api/v1/dashboard/store/${id}`, body);
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["store"] });
      setIsOpen(false);
      toast.success("Store Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof storeUpdateSchema>) {
    mutate({ values: values, id: data?.id });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} onClick={() => setIsOpen(true)}>
          <Edit /> UpdateStore
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="shop_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Categories field={field} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Spinner />} Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStore;
