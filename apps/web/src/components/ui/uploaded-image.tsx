import api from "@/lib/axios-instance";
import { formatBytes } from "hooks/use-file-upload";
import { CheckCircle2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { deleteImageState } from "store/slices/imagesSlice";
import { Button } from "./button";
import { useEffect } from "react";
import { ProductImage } from "@repo/types";

const UploadedImage = ({ uploadStatus, clearFiles }: any) => {
  const dispatch = useAppDispatch();

  const images = useAppSelector((state) => state.image);
  const deleteImage = async (id: string) => {
    try {
      const { data } = await api.post(`/api/v1/delete-image`, { id: id });
      dispatch(deleteImageState(id));
      toast.success("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting images:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    clearFiles();
  }, [images]);

  return (
    <>
      {images.map((file: ProductImage) => (
        <div
          key={file.publicId}
          className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="aspect-square shrink-0 rounded bg-accent">
              <img
                src={file.url}
                alt={file.original_filename}
                className="size-10 rounded-[inherit] object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-[13px] font-medium">
                {file.original_filename}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.bytes)}
                </p>
                {uploadStatus[file.publicId]?.status === "error" && (
                  <p className="text-xs text-destructive">
                    {uploadStatus[file?.publicId]?.error}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="size-4 text-green-500" />
            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
              onClick={() => deleteImage(file.publicId)}
              aria-label="Remove file">
              <XIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default UploadedImage;
