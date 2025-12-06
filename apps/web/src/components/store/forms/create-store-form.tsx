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
import { zodResolver } from "@hookform/resolvers/zod";
import { storeDetailsSchema, StoreSchemaTypes } from "@repo/schema";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hook";
import { nextStep, setStoreDetails } from "store/slices/storeCreationSlice";
import z from "zod";
import Categories from "../../category";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";

const CreateStoreForm = ({ data }: { data?: StoreSchemaTypes }) => {
  const dispatch = useAppDispatch();
  const [toggleHomeDelivery, setToggleHomeDelivery] = useState(false);
  const { storeDetails } = useAppSelector((state) => state.storeCreation);

  const form = useForm<z.infer<typeof storeDetailsSchema>>({
    resolver: zodResolver(storeDetailsSchema),
    defaultValues: {
      shop_name: storeDetails ? storeDetails.shop_name : data?.shop_name || "",
      categoryId: storeDetails
        ? storeDetails.categoryId
        : data?.categoryId || "",
      home_delivery: storeDetails?.home_delivery
        ? storeDetails.home_delivery
        : data?.home_delivery || false,
      delivery_charge: storeDetails
        ? storeDetails.delivery_charge
        : data?.delivery_charge || undefined,
      handling_charge: storeDetails
        ? storeDetails.handling_charge
        : data?.handling_charge || undefined,
      free_delivery_after: storeDetails
        ? storeDetails.free_delivery_after
        : data?.free_delivery_after || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof storeDetailsSchema>) {
    dispatch(setStoreDetails(values));
    dispatch(nextStep());
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
              Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateStoreForm;
