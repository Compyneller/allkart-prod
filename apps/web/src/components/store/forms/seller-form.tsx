"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema } from "@repo/schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hook";
import { nextStep, setKycDetails } from "store/slices/storeCreationSlice";
import { z } from "zod";

const SellerForm = () => {
  const dispatch = useAppDispatch();
  const { kycDetails } = useAppSelector((state) => state.storeCreation);

  const form = useForm<z.infer<typeof kycSchema>>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      aadhar: kycDetails ? kycDetails.aadhar : "",
      pancard: kycDetails ? kycDetails.pancard : "",
      gst: kycDetails ? kycDetails.gst : "",
    },
  });

  function onSubmit(values: z.infer<typeof kycSchema>) {
    dispatch(setKycDetails(values));
    dispatch(nextStep());
  }
  useEffect(() => {
    console.log(form.formState.errors);
  }, [dispatch, form.formState.errors]);

  return (
    <motion.div
      exit={{
        x: "-50%",
        opacity: 0,
        transition: {
          duration: 500,
        },
      }}>
      <Card>
        <CardHeader>
          <CardTitle>Add verification documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="aadhar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Card</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        maxLength={12}
                        inputMode="numeric"
                        placeholder="Enter Aadhar number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 12) {
                            field.onChange(value);
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
                name="pancard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Card</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={10}
                        className="placeholder:capitalize"
                        placeholder="Enter PAN number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number (optional)</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={15}
                        placeholder="Enter GST number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Next
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SellerForm;
