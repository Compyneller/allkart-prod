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
import { categorySchema } from "@repo/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { clearImage } from "store/slices/imagesSlice";
import z from "zod";

const CreateCategoryForm = () => {
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.image);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      url: "",
      publicId: "",
      original_filename: "",
      bytes: 0,
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof categorySchema>) => {
    const body = {
      ...values,
      url: image[0]?.url,
      publicId: image[0]?.publicId,
      original_filename: image[0]?.original_filename,
      bytes: image[0]?.bytes,
    };

    const { data } = await api.post("/api/v1/dashboard/category", body);

    form.reset();
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["category"] });
      dispatch(clearImage());
      toast.success(data?.message || "Category created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred.");
    },
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    if (!image[0]?.url) {
      return toast.error("Please upload an image");
    }
    mutate(values);
  }

  useEffect(() => {
    console.log(form.formState.errors);

    form.setValue("bytes", Number(image[0]?.bytes))
    form.setValue("original_filename", image[0]?.original_filename || "")
    form.setValue("publicId", image[0]?.publicId || "")
    form.setValue("url", image[0]?.url || "")



  }, [form.formState.errors, image]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UploadImage multiple={false} />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Spinner />} Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
