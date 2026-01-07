"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { storeData } from "data/store";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { NoStore } from "./no-store";
import StoreCard from "./store-card";

const StoreLayout = () => {
  const { data, isLoading, error } = storeData();

  if (data?.length === 0) {
    return (
      <div className="w-[99%] mx-auto py-10">
        <NoStore />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return;
  }

  return (
    <div className="w-[99%] mx-auto py-10">
      <div className="space-y-1.5">
        <div className="w-full flex items-center justify-between p-3 rounded-lg border">
          <h5 className="text-2xl font-semibold">Store</h5>
          <Link href="/dashboard/store/create-store">
            <Button size={"default"} variant="default">
              <Plus /> Create Store
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {data?.map((item) => (
            <StoreCard data={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
