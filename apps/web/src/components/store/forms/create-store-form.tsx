"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeDetailsSchema, storeUpdateSchema } from "@repo/schema";
import { StoreTypes } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { nextStep, setStoreDetails } from "store/slices/storeCreationSlice";
import z from "zod";
import Categories from "../../category";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Spinner } from "@/components/ui/spinner";

const CreateStoreForm = ({ data, setIsOpen }: { data?: StoreTypes, setIsOpen?: any }) => {
  const dispatch = useAppDispatch();
  const [toggleHomeDelivery, setToggleHomeDelivery] = useState(data ? data.home_delivery : false);
  const { storeDetails } = useAppSelector((state) => state.storeCreation);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof storeDetailsSchema>>({
    resolver: zodResolver(storeDetailsSchema),
    defaultValues: {
      shop_name: data ? data.shop_name : storeDetails?.shop_name || "",
      categoryId: data
        ? data.categoryId
        : storeDetails?.categoryId || "",
      home_delivery: storeDetails?.home_delivery
        ? storeDetails.home_delivery
        : storeDetails?.home_delivery || false,
      delivery_charge: data
        ? data.delivery_charge
        : storeDetails?.delivery_charge || undefined,
      handling_charge: data
        ? data.handling_charge
        : storeDetails?.handling_charge || undefined,
      free_delivery_after: data
        ? data.free_delivery_after
        : storeDetails?.free_delivery_after || undefined,
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
      setIsOpen(false)
      toast.success("Store Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(values: z.infer<typeof storeDetailsSchema>) {
    if (data) {
      mutate({ values: values, id: data?.id });
    } else {
      dispatch(setStoreDetails(values));
      dispatch(nextStep());
    }

  }

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Card>
      <CardHeader className="flex  my-auto">
        <CardTitle className="my-auto flex items-center gap-1 text-lg">
          <Store size={18} /> Create Store
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="shop_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name *</FormLabel>
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
                  <FormLabel>Select Category *</FormLabel>
                  <Categories field={field} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="home_delivery"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex items-center justify-between border rounded-lg p-3">
                    <div className="flex flex-col gap-1">
                      <p>Home delivery available?</p>
                      <p className="text-xs text-accent-foreground">
                        You can change it later
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                          setToggleHomeDelivery(value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {toggleHomeDelivery && (
              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="delivery_charge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery charge</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="₹30"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 4) {
                              field.onChange(Number(value));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="handling_charge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handling charge</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="₹20"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 4) {
                              field.onChange(Number(value));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="free_delivery_after"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Free delivery after</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="₹100"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 4) {
                              field.onChange(Number(value));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              {data && isPending ? <Spinner /> : null} Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateStoreForm;
