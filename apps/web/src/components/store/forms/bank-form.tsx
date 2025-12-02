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
import { InputGroup } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankSchema } from "@repo/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Banknote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsLoading } from "store/slices/sellerStepsSlice";
import {
  resetStoreCreation,
  setBankDetails,
} from "store/slices/storeCreationSlice";
import { z } from "zod";

const BankDetailForm = () => {
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { addressDetails, bankDetails, kycDetails, storeDetails } =
    useAppSelector((state) => state.storeCreation);

  const form = useForm<z.infer<typeof bankSchema>>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      name: "",
      account_number: "",
      ifsc_code: "",
      branch: "",
      bank_name: "",
    },
  });

  const handleSubmitForm = async () => {
    dispatch(setIsLoading(true));
    const body = {
      addressDetails,
      bankDetails,
      kycDetails,
      storeDetails,
    };
    const { data } = await api.post("/api/v1/dashboard/store", body);
    form.reset();
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async (req) => {
      dispatch(setIsLoading(false));

      if (pathname === "/onboarding") {
        router.push("/dashboard");
        dispatch(resetStoreCreation());
        toast.success("Store created");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["store"] });
      router.push("/dashboard/store");
      toast.success(req.message);
      dispatch(resetStoreCreation());
      toast.success("Store created");
    },
    onError: (error) => {
      dispatch(setIsLoading(false));

      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof bankSchema>) {
    dispatch(setBankDetails(values));
    mutate();
  }

  useEffect(() => {
    console.log(form.formState.errors);
  }, [dispatch, form.formState.errors]);

  return (
    <Card>
      <CardHeader className=" flex ">
        <CardTitle className="text-lg flex items-center gap-1">
          <Banknote /> Add Bank Details
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account holder name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={50}
                        placeholder="Enter name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account number</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <Input
                          required
                          maxLength={10}
                          inputMode="numeric"
                          placeholder="Enter name"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 10) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank name</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Enter bank name...."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="ifsc_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC code</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter IFSC code"
                        {...field}
                        maxLength={11}
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
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter Branch" {...field} />
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
      </CardContent>
    </Card>
  );
};

export default BankDetailForm;
