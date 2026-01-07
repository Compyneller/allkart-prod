"use client";
import CreateStoreForm from "@/components/store/forms/create-store-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { StoreTypes } from "@repo/types";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "store/hook";

const UpdateStore = ({ data }: {
  data: StoreTypes
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} onClick={() => setIsOpen(true)}>
          <Edit /> UpdateStore
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateStoreForm setIsOpen={setIsOpen} data={data} />
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="shop_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
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
                  <FormLabel>Select Category</FormLabel>
                  <Categories field={field} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Spinner />} Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>  */}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStore;
