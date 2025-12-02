"use client";

import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ImageIcon,
  Loader2Icon,
  UploadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import api from "@/lib/axios-instance";
import axios from "axios";
import { useFileUpload } from "hooks/use-file-upload";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setImage } from "store/slices/imagesSlice";
import DeleteAllImage from "./delete-all-image";
import Preview from "./prev-image";
import UploadedImage from "./uploaded-image";
import { m } from "motion/react";

// Upload status for each file
type UploadStatus = {
  [fileId: string]: {
    status: "uploading" | "success" | "error";
    progress?: number;
    error?: string;
    url?: string;
  };
};

export default function UploadImage({
  multiple = true,
}: {
  multiple?: boolean;
}) {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image);

  const [uploading, setUploading] = useState(false);
  const maxSizeMB = 1;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 5;
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({});

  // Function to upload a single file to the server
  const uploadFileToServer = async (file: File, fileId: string) => {
    const formData = new FormData();
    setUploading(true);
    try {
      setUploadStatus((prev) => ({
        ...prev,
        [fileId]: { status: "uploading", progress: 0 },
      }));

      const { data } = await api.get("/api/v1/get-upload-signature");
      formData.append("file", file);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp);
      formData.append("signature", data.signature);
      formData.append("folder", data.folder);
      const uploadUrl = `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`;

      const uploadResponse = await axios.post(uploadUrl, formData);

      const imageResponse = {
        original_filename: uploadResponse?.data?.original_filename,
        bytes: uploadResponse?.data?.bytes,
        publicId: uploadResponse?.data?.public_id,
        url: uploadResponse?.data?.secure_url,
      };
      dispatch(setImage(imageResponse));
      setUploading(false);
      setUploadStatus((prev) => ({
        ...prev,
        [fileId]: {
          status: "success",
          progress: 100,
          url: uploadResponse?.data?.secure_url, // Assuming server returns the uploaded file URL
        },
      }));

      return uploadResponse.data;
    } catch (error) {
      console.log(error);
      setUploading(false);
      setUploadStatus((prev) => ({
        ...prev,
        [fileId]: {
          status: "error",
          error: error instanceof Error ? error.message : "Upload failed",
        },
      }));

      console.error("Error deleting images:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      clearFiles,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: multiple,
    maxFiles,
    onFilesAdded: async (addedFiles) => {
      // Upload each newly added file
      for (const fileWithPreview of addedFiles) {
        if (fileWithPreview.file instanceof File) {
          try {
            await uploadFileToServer(fileWithPreview.file, fileWithPreview.id);
          } catch (error) {
            console.error("Failed to upload file:", error);
            if (error instanceof Error) {
              toast.error(error.message);
            }
          }
        }
      }
    },
  });

  const getStatusIcon = (fileId: string) => {
    const status = uploadStatus[fileId];

    if (!status || status.status === "uploading") {
      return <Loader2Icon className="size-4 animate-spin text-blue-500" />;
    }

    if (status.status === "success") {
      return <CheckCircle2Icon className="size-4 text-green-500" />;
    }

    if (status.status === "error") {
      return <AlertCircleIcon className="size-4 text-destructive" />;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed border-input p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50">
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true">
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
          <p className="text-xs text-muted-foreground">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={openFileDialog}>
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {
        <div className="space-y-2">
          {uploading ? (
            <Preview
              files={files}
              removeFile={removeFile}
              uploadStatus={uploadStatus}
              getStatusIcon={getStatusIcon}
            />
          ) : (
            <UploadedImage
              clearFiles={clearFiles}
              removeFile={removeFile}
              uploadStatus={uploadStatus}
              getStatusIcon={getStatusIcon}
            />
          )}

          {images.length > 1 && <DeleteAllImage />}
        </div>
      }
    </div>
  );
}
