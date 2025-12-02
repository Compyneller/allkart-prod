import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Plus } from "lucide-react";
import DeleteProduct from "./delete-product";
import { ProductType } from "@repo/types";
import Link from "next/link";
import { EditProduct } from "./edit";

const Action = ({ data }: { data: ProductType }) => {
  const pData = {
    storeId: Number(data?.storeId),
    title: data?.title,
    categoryId: data?.categoryId,
    description: data?.description,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {data?.variants?.length > 0 ? (
            <Link
              className="flex items-center gap-2"
              href={`/product/${data.id}/variant/${data.variants[0]?.id}`}>
              <Eye /> Detail
            </Link>
          ) : (
            <Link
              className="flex items-center gap-2"
              href={`/dashboard/products/variants/${data.id}`}>
              <Plus /> Add Variant
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditProduct data={pData} pid={data.id} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteProduct pdata={data} id={data.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
