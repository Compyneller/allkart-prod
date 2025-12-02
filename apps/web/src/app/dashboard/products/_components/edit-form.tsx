"use client";
import Categories from "@/components/category";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { productEditSchema, ProductEditType } from "@repo/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import { clearImage } from "store/slices/imagesSlice";
import { setIsLoading } from "store/slices/sellerStepsSlice";
import z from "zod";
import StoreDropDown from "../../add-product/_components/store-dropdown";

const EditProductForm = ({
  data,
  pid,
}: {
  pid: number;
  data: Partial<ProductEditType>;
}) => {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof productEditSchema>>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      storeId: data?.storeId,
      title: data?.title,
      categoryId: data?.categoryId,
      description: data?.description,
    },
  });

  const handleSubmitForm = async (
    values: z.infer<typeof productEditSchema>
  ) => {
    try {
      const { data } = await api.patch(
        "/api/v1/dashboard/product/" + pid,
        values
      );
      dispatch(clearImage());
      dispatch(setIsOpen(false));
      form.reset();
      return data;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      throw error;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success(data?.message || "Product Successfully Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof productEditSchema>) {
    mutate(values);
  }

  useEffect(() => {
    dispatch(setIsLoading(isPending));

    console.log(form.formState.errors);
  }, [isPending, dispatch, form, form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="storeId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Store</FormLabel>
                <FormControl>
                  <StoreDropDown defaultValue={data?.storeId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product title" {...field} />
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
                <FormControl>
                  <Categories field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Spinner />} Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditProductForm;
