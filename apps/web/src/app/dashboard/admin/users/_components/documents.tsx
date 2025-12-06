import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserType } from "@repo/types";
import { fetchSellerDoc } from "data/admin/fetchSellerDoc";

export function DocumentsDialog({ userData }: { userData: UserType }) {
  const { data, isLoading } = fetchSellerDoc(userData?.id);

  return (
    <Dialog>
      <form>
        <DialogTrigger>Check Documents</DialogTrigger>
        <DialogContent className="w-4xl sm:max-w-2xl" key={userData.id}>
          <DialogHeader>
            <DialogTitle>Documents</DialogTitle>
          </DialogHeader>
          <div
            className="grid text-black grid-cols-1 md:grid-cols-2 gap-3"
            draggable="false">
            <div className="w-full bg-linear-to-b from-orange-400 via-white to-green-400 rounded-lg  p-3">
              <div className="flex mb-3 text-center  items-center justify-between">
                <img src="/pngegg.png" className="h-[25px]" alt="" />
                <div className="flex flex-col gap-1">
                  <div className="bg-orange-400 text-[10px]">
                    <p>भारत सरकार</p>
                  </div>
                  <div className="bg-green-400 px-1 text-[10px]">
                    <p className="capitalize ">government of india</p>
                  </div>
                </div>
                <img src="/pngwing.com.png" className="h-[25px]" alt="" />
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2">
                  <Avatar className="rounded-xs cursor-pointer w-full h-full bg-white">
                    <AvatarImage src={`${userData?.image}`} />
                    <AvatarFallback className="bg-white">
                      {userData?.name
                        ? userData?.name.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-4">
                  <p className="text-sm">{userData?.name}</p>
                  {isLoading ? (
                    <p className="text-xs animate-pulse">Loading...</p>
                  ) : (
                    <p className="text-xs">
                      <span>Issue Date:</span>
                      {new Date(data?.createdAt!).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <h5 className="text-center  text-base/[11px]">{data?.aadhar}</h5>
            </div>
            <div className="w-full bg-blue-400 rounded-lg  p-3">
              <div className="flex mb-3 items-center justify-between">
                <div className="flex flex-col ">
                  <div className=" text-[10px]">
                    <p>आय कर विभाग</p>
                  </div>
                  <div className=" text-[10px]">
                    <p className="capitalize ">Income Tax Department</p>
                  </div>
                </div>
                <img src="/pngegg.png" className="h-[25px]" alt="" />
                <div className="flex flex-col">
                  <div className="text-[10px]">
                    <p>भारत सरकार</p>
                  </div>
                  <div className=" text-[10px]">
                    <p className="capitalize ">government of india</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2">
                  <Avatar className="rounded-xs cursor-pointer w-full h-full bg-white">
                    <AvatarImage src={`${userData?.image}`} />
                    <AvatarFallback className="bg-white">
                      {userData?.name
                        ? userData?.name.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-4">
                  <p className="text-sm">{userData?.name}</p>
                  {isLoading ? (
                    <p className="text-xs animate-pulse">Loading...</p>
                  ) : (
                    <p className="text-xs">
                      <span>Issue Date:</span>
                      {new Date(data?.createdAt!).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <h5 className="text-center  text-base/[11px]">{data?.pancard}</h5>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
