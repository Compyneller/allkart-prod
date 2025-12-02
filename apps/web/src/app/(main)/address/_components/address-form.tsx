"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@repo/schema";
import { StoreAddressTypes } from "@repo/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGeolocation from "hooks/useGeolocation";
import { LocateIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import { reset } from "store/slices/sellerStepsSlice";
import { clearStore } from "store/slices/storeSlice";
import { z } from "zod";

const UserAddress = ({ storeData }: { storeData?: StoreAddressTypes }) => {
  const queryClient = useQueryClient();
  const { coordinates, address, handleAutomaticAddress, isLoading } =
    useGeolocation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // FIX 1: Provide robust default values to prevent "Uncontrolled to Controlled" warnings
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: storeData?.name || "",
      contact: storeData?.contact || "",
      address: storeData?.address || "",
      state: storeData?.state || "",
      city: storeData?.city || "",
      district: storeData?.district || "",
      pincode: storeData?.pincode || "",
      landmark: storeData?.landmark || "",
      // Ensure these default to 0, not undefined, to match your Float schema
      lat: storeData?.lat || 0,
      long: storeData?.long || 0,
    },
  });

  useEffect(() => {
    if (storeData) {
      return;
    }
    // Only trigger auto-address if no existing data
    handleAutomaticAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array is correct for mount-only logic

  // FIX 2 & 3: Safe property access and removed dangerous reset in cleanup
  useEffect(() => {
    if (address && address.address) {
      const addr = address.address;

      // Use optional chaining and fallbacks.
      // Note: OpenStreetMap sometimes puts district in 'state_district' or 'county'
      form.setValue("address", address.display_name || "");
      form.setValue("city", addr.city || addr.town || addr.village || "");
      form.setValue("state", addr.state || "");
      form.setValue("district", addr.state_district || addr.county || "");
      form.setValue("pincode", addr.postcode || "");

      // FIX 4: Prevent NaN. If latitude is undefined, default to 0
      form.setValue(
        "lat",
        coordinates?.latitude ? Number(coordinates.latitude) : 0
      );
      form.setValue(
        "long",
        coordinates?.longitude ? Number(coordinates.longitude) : 0
      );
    }

    // REMOVED: return () => form.reset();
    // Creating a cleanup that resets the form is dangerous here as it might
    // wipe user data if the component re-renders or address updates oddly.
  }, [address, coordinates, form]);

  const handleSubmitForm = async (values: z.infer<typeof addressSchema>) => {
    try {
      if (storeData?.id) {
        const { data } = await api.patch(
          "/api/v1/address/" + storeData.id,
          values
        );
        return data;
      } else {
        const { data } = await api.post("/api/v1/address", values);
        // Only reset on successful submission, not inside useEffect
        form.reset();
        return data;
      }
    } catch (error: any) {
      throw error; // Let react-query onError handle it
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: async (req) => {
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      toast.success(req.message || "Address saved successfully");
      dispatch(clearStore());
      dispatch(reset());
      dispatch(setIsOpen(false));
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    },
  });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    mutate(values);
  }

  // Debugging errors
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("Form Errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 h-0.5 bg-primary" />
          <Button
            type="button" // Explicitly set type button to prevent form submission
            onClick={() => handleAutomaticAddress()}
            disabled={isLoading || isPending}>
            {isLoading ? <Spinner /> : <LocateIcon className="mr-2 h-4 w-4" />}
            Automatic Address
          </Button>
          <div className="flex-1 h-0.5 bg-primary" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* FIX 5: Hidden inputs for lat/long ensure they exist in the DOM 
                and are registered properly, even though setValue is used. */}
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value ?? 0} />
              )}
            />
            <FormField
              control={form.control}
              name="long"
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value ?? 0} />
              )}
            />

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
                        maxLength={6} // Standard Indian Pincode is 6 digits (changed from 7)
                        required
                        inputMode="numeric"
                        placeholder="Enter pin code"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 6) {
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
                      <Input
                        placeholder="Enter landmark"
                        {...field}
                        value={field.value || ""}
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
      </CardContent>
    </Card>
  );
};

export default UserAddress;
