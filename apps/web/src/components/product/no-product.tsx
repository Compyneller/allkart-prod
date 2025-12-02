import { Folder, Plus } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import { Button } from "../ui/button";

export function NoProduct() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Product Found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any product yet. Get started by creating your
          first product.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link href="/dashboard/add-product">
            <Button size={"sm"}>
              <Plus /> Create Product
            </Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
}
