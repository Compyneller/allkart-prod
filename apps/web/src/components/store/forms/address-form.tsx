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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressDetailsType, addressSchema } from "@repo/schema";
import useGeolocation from "hooks/useGeolocation";
import { LocateIcon, LocationEdit } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hook";
import { nextStep, setAddressDetails } from "store/slices/storeCreationSlice";
import { z } from "zod";

const ShopAddress = ({
  storeData,
  storeId,
}: {
  storeData?: AddressDetailsType;
  storeId?: number;
}) => {
  const { coordinates, address, handleAutomaticAddress, isLoading } =
    useGeolocation();
  const dispatch = useAppDispatch();
  const { addressDetails } = useAppSelector((state) => state.storeCreation);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: addressDetails ? addressDetails.name : storeData?.name || "",
      contact: addressDetails
        ? addressDetails.contact
        : storeData?.contact || "",
      address: addressDetails
        ? addressDetails.address
        : storeData?.address || "",
      state: addressDetails ? addressDetails.state : storeData?.state || "",
      city: addressDetails ? addressDetails.city : storeData?.city || "",
      district: addressDetails
        ? addressDetails.district
        : storeData?.district || "",
      pincode: addressDetails
        ? addressDetails.pincode
        : storeData?.pincode || "",
      landmark: addressDetails
        ? addressDetails.landmark
        : storeData?.landmark || "",
    },
  });

  useEffect(() => {
    if (storeData) {
      return;
    }
    handleAutomaticAddress();
  }, []);

  useEffect(() => {
    form.setValue("address", address?.display_name!);
    form.setValue("city", address?.address?.city!);
    form.setValue("state", address?.address?.state!);
    form.setValue("district", address?.address?.state_district!);
    form.setValue("pincode", address?.address?.postcode!);
    form.setValue("lat", Number(coordinates?.latitude!));
    form.setValue("long", Number(coordinates?.longitude!));

    return () => {
      form.reset();
    };
  }, [address]);

  function onSubmit(values: z.infer<typeof addressSchema>) {
    dispatch(setAddressDetails(values));
    dispatch(nextStep());
  }

  useEffect(() => {
    console.log(form.formState.errors);
  }, [dispatch, form.formState.errors]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 items-center text-lg">
          <LocationEdit size={18} /> Store Address
        </CardTitle>
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 h-0.5 bg-primary" />
          <Button onClick={() => handleAutomaticAddress()}>
            {isLoading ? <Spinner /> : <LocateIcon />} Automatic Address
          </Button>
          <div className="flex-1 h-0.5 bg-primary" />
        </div>
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
                    <FormLabel>Name</FormLabel>
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
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact number</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>+91</InputGroupAddon>
                        <InputGroupInput
                          maxLength={10}
                          inputMode="numeric"
                          required
                          placeholder="Contact number"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          required
                          placeholder="Enter Address...."
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={7}
                        required
                        inputMode="numeric"
                        placeholder="Enter pin code"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 7) {
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
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter landmark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ShopAddress;
