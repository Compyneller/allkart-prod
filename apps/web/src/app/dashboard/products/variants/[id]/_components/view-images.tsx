import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductImage } from "@repo/types";

export function ViewImages({ data }: { data: ProductImage[] }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size={"sm"} variant="outline">
            View Images
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Images</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            {data?.map((item) => (
              <div className="w-full" key={item.id}>
                <img
                  className="w-full h-[200px] object-contain"
                  src={item.url}
                  alt=""
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
