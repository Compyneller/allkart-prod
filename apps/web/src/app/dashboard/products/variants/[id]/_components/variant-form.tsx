"use client";
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
import UploadImage from "@/components/ui/upload-image";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantSchema } from "@repo/schema";
import { ProductResponseType } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UnitDropdown from "app/dashboard/add-product/_components/units-dropdown";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import { clearImage, setImage } from "store/slices/imagesSlice";
import { setIsLoading } from "store/slices/sellerStepsSlice";
import z from "zod";

const EditVariantForm = ({
  variant,
  pid,
}: {
  pid: number;
  variant?: Partial<ProductResponseType>;
}) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image || []);

  const queryClient = useQueryClient();

  useEffect(() => {
    variant?.prod_img?.map((img) => {
      dispatch(setImage(img));
    });

    return () => {
      dispatch(clearImage());
    };
  }, [variant]);

  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: variant
      ? {
          unit: variant?.unit,
          unit_value: variant?.unit_value,
          mrp: Number(variant?.mrp),
          selling_price: Number(variant?.selling_price),
          stock: Number(variant?.stock),
          sku: variant?.sku,
          prod_img: variant?.prod_img?.map((img) => {
            return {
              url: img.url,
              publicId: img.publicId,
              original_filename: img.original_filename,
              bytes: img.bytes,
            };
          }),
        }
      : undefined,
  });

  const createNumericInputHandler = useCallback(
    (onChange: (...event: any[]) => void) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value.replace(/\D/g, ""));
        onChange(value);
      };
    },
    []
  );

  const handleSubmitForm = async (values: z.infer<typeof variantSchema>) => {
    if (variant) {
      try {
        const { data } = await api.patch(
          "/api/v1/dashboard/variant/" + variant?.id,
          {
            data: values,
            pid: pid,
          }
        );
        dispatch(clearImage());
        dispatch(setIsOpen(false));
        form.reset();
        return data;
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        throw error;
      }
    } else {
      try {
        const { data } = await api.post("/api/v1/dashboard/variant", {
          data: values,
          pid: pid,
        });
        dispatch(clearImage());
        dispatch(setIsOpen(false));
        form.reset();
        return data;
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        throw error;
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["variants", pid],
      });
      toast.success(data?.message || "Product Successfully Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof variantSchema>) {
    if (images.length <= 0) {
      toast.warning("Please upload at least one image");
      return;
    }
    mutate(values);
  }

  useEffect(() => {
    dispatch(setIsLoading(isPending));
    form.setValue(
      "prod_img",
      images.map((img) => {
        return {
          url: img.url,
          publicId: img.publicId,
          original_filename: img.original_filename,
          bytes: img.bytes,
        };
      })
    );
    console.log(form.formState.errors);
  }, [isPending, dispatch, form, images, form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3 grid grid-cols-2 gap-3">
          <UploadImage />

          <div className="grid h-fit grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <UnitDropdown
                      defaultValue={variant && variant?.unit_value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>M.R.P</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter MRP"
                      inputMode="numeric"
                      {...field}
                      onChange={createNumericInputHandler(field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selling_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter selling price"
                      inputMode="numeric"
                      {...field}
                      onChange={createNumericInputHandler(field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter stock quantity"
                      inputMode="numeric"
                      {...field}
                      onChange={createNumericInputHandler(field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Spinner />} Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditVariantForm;
