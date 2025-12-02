import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import AddressDialog from "./address-dialog";
import { StoreAddressTypes } from "@repo/types";

const EditAddress = ({ data }: { data: StoreAddressTypes }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <AddressDialog storeData={data} />
      </TooltipTrigger>
      <TooltipContent>
        <p>Update Address</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EditAddress;
