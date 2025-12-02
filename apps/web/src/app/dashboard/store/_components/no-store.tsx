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
import { Button } from "@/components/ui/button";

export function NoStore() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Store Found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any store yet. Get started by creating your
          first store.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/dashboard/store/create-store">
          <Button size={"default"} variant="default">
            <Plus /> Create Store
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
