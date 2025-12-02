import { Folder } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import AddressDialog from "./address-dialog";

export function NoAddress() {
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
          <AddressDialog />
        </div>
      </EmptyContent>
    </Empty>
  );
}
