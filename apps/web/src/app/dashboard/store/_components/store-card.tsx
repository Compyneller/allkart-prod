"use client";
import OpenMap from "@/components/open-map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { StoreTypes } from "@repo/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import AddressDialog from "./address-dialog";
import DeleteStore from "./delete-store";
import DeliveryStatus from "./delivery-status";
import DetailDialog from "./detail";
import StoreStatus from "./store-status";
import UpdateStore from "./update-store";

const StoreCard = ({ data }: { data: StoreTypes }) => {

  return (
    <Card
      className={cn(
        data.isActive &&
        "bg-linear-to-b from-0% border-t-accent from-accent to-50%"
      )}>
      <CardHeader>
        <CardTitle className="text-xl capitalize">{data?.shop_name}</CardTitle>
        <CardAction>
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5">
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", data.isActive ? "bg-green-500" : "bg-red-500")} />
                  <StoreStatus data={data} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.isActive ? "Store Active" : "Store Close"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        <CardDescription className="capitalize">
          Category: {data?.category.name}
        </CardDescription>

        <CardDescription>
          Store created at:{" "}
          {`${new Date(`${data?.createdAt}`).toLocaleDateString()}`}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <CardDescription className="flex items-center justify-between w-full">
            Home Delivery: {data?.home_delivery ? "Yes" : "No"}
            {/* <CardAction>
              <DeliveryStatus data={data} />
            </CardAction> */}
          </CardDescription>
          <div className="grid gap-1.5 grid-cols-2 w-full">
            <UpdateStore data={data} />
            <AddressDialog storeData={data} />
            <Link href={`/dashboard/store/${data.id}`}>
              <Button size={"sm"} variant={"outline"} className="w-full">
                <Eye /> View Products
              </Button>
            </Link>
            {data.address && <DetailDialog data={data.address} />}

            <DeleteStore id={data.id} />
            <OpenMap lat={data.address?.lat!} lng={data.address?.long!} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
