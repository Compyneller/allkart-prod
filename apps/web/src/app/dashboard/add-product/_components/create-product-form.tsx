"use client";
import Categories from "@/components/category";
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
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/ui/upload-image";
import api from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, productSubmissionSchema } from "@repo/schema";
import { ProductVariant } from "@repo/types";
import useDeleteAllImage from "hooks/useDeleteAllImage";
import { X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { clearImage } from "store/slices/imagesSlice";
import {
  clearProduct,
  clearVariants,
  setProduct,
} from "store/slices/productSlice";
import z from "zod";
import StoreDropDown from "./store-dropdown";
import UnitDropdown from "./units-dropdown";

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const handleDeleteAllImages = useDeleteAllImage();
  const images = useAppSelector((state) => state.image);
  const variants = useAppSelector((state) => state.product.variants || []);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      store: "",
      description: "",
      categoryId: "",
      mrp: "",
      selling_price: "",
      sku: "",
      stocks: "",
      unit: "",
      unit_value: "",
    },
  });

  // Memoized numeric input handler
  const createNumericInputHandler = useCallback(
    (onChange: (...event: any[]) => void) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        onChange(value);
      };
    },
    []
  );

  // Add variant handler
  const handleAddVariant = useCallback(() => {
    if (images.length === 0) {
      return toast.warning("Please upload at least one image");
    }
    const values = form.getValues();

    // Validate variant fields before adding
    const variantFields = [
      "unit",
      "unit_value",
      "mrp",
      "selling_price",
      "sku",
      "stocks",
    ];
    const isValid = variantFields.every((field) => {
      const value = values[field as keyof typeof values];
      return value && value.toString().trim() !== "";
    });

    if (!isValid) {
      toast.warning("Please fill all variant fields");
      return;
    }

    const newVariant: ProductVariant = {
      unit: values.unit!,
      unit_value: values.unit_value!,
      mrp: Number(values.mrp),
      selling_price: Number(values.selling_price),
      stock: Number(values.stocks) || 0,
      sku: values.sku!,
      prod_img: images.map((img) => ({
        url: img.url,
        publicId: img.publicId,
        original_filename: img.original_filename,
        bytes: img.bytes,
      })),
    };

    // Update Redux store
    dispatch(
      setProduct({
        variants: [...variants, newVariant],
      })
    );
    dispatch(clearImage());

    // Reset only variant fields
    form.setValue("unit", "");
    form.setValue("unit_value", "");
    form.setValue("mrp", "");
    form.setValue("selling_price", "");
    form.setValue("stocks", "");
    form.setValue("sku", "");
  }, [form, images, variants, dispatch]);

  // Remove variant handler
  const handleRemoveVariant = useCallback(
    async (index: number, variant: ProductVariant) => {
      if (variant) {
        await handleDeleteAllImages(
          variant?.prod_img.map((img) => img.publicId)
        );
      }

      const updatedVariants = variants.filter((_, i) => i !== index);
      dispatch(setProduct({ variants: updatedVariants }));
    },
    [variants, dispatch]
  );

  // Form submission
  const onSubmit = useCallback(
    async (values: z.infer<typeof productFormSchema>) => {
      try {
        // Check if at least one variant exists
        if (variants?.length === 0) {
          toast.warning("Please add at least one product variant");
          return;
        }

        // Prepare submission data
        const submissionData = {
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
          storeId: values.store, // Map 'store' to 'storeId'
          variants: variants,
        };

        // Validate submission data
        const validatedData = productSubmissionSchema.parse(submissionData);

        const { data } = await api.post(
          "/api/v1/create-product",
          validatedData
        );

        if (data.success) {
          toast.success("Product created successfully!");
          dispatch(clearImage());
          dispatch(clearProduct());
          dispatch(clearVariants());
          form.reset();
        } else {
          toast.error("Failed to create product.");
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error(error.message);
          return;
        }
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error("An error occurred while submitting the product.");
      } finally {
        dispatch(clearImage());
        dispatch(clearProduct());
        dispatch(clearVariants());
      }
    },
    [variants, form, dispatch]
  );

  // Memoized variant display
  const variantsList = useMemo(() => {
    return variants.map((variant, index) => (
      <div
        key={index}
        className="flex h-fit items-center justify-between rounded-lg border p-3">
        <div className="flex-1 space-y-1 text-sm">
          <p className="font-medium">
            {variant.unit_value}{" "}
            <span className="uppercase">{variant.unit}</span>
          </p>
          <p className="text-muted-foreground">
            MRP: ₹{Number(variant.mrp)} | Selling: ₹
            {Number(variant.selling_price)} | Stock: {Number(variant.stock)}
          </p>
          <p className="text-xs text-muted-foreground">SKU: {variant.sku}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveVariant(index, variant)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    ));
  }, [variants, handleRemoveVariant]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Product Info */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="store"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Store</FormLabel>
                    <FormControl>
                      <StoreDropDown {...field} />
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

            <UploadImage />

            {/* Product Variants Section */}
            <div className="space-y-3">
              <h5 className="font-semibold">Product Variants</h5>

              {/* Display added variants */}
              {variants.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Added Variants ({variants.length})
                  </p>
                  {variantsList}
                </div>
              )}

              {/* Variant Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <UnitDropdown {...field} />
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
                  name="stocks"
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

              <Button
                type="button"
                variant="outline"
                onClick={handleAddVariant}
                className="w-full">
                Add Variant
              </Button>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              {variants.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  disabled={variants.length === 0}
                  onClick={async () => {
                    form.reset();
                    await handleDeleteAllImages(
                      variants?.flatMap((variant) =>
                        variant.prod_img.map((img) => img.publicId)
                      )
                    );
                    dispatch(clearProduct());
                  }}>
                  Discard
                </Button>
              )}
              <Button type="submit" disabled={variants.length === 0}>
                Create Product
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
