import { formatBytes } from "hooks/use-file-upload";
import React from "react";
import { Button } from "./button";
import { XIcon } from "lucide-react";

const Preview = ({ files, removeFile, uploadStatus, getStatusIcon }: any) => {
  return (
    <>
      {files.map((file: any) => (
        <div
          key={file.id}
          className="flex animate-pulse items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="aspect-square shrink-0 rounded bg-accent">
              <img
                src={file.preview}
                alt={file.file.name}
                className="size-10 rounded-[inherit] object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-[13px] font-medium">
                {file.file.name}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.file.size)}
                </p>
                {uploadStatus[file.id]?.status === "error" && (
                  <p className="text-xs text-destructive">
                    {uploadStatus[file?.id]?.error}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getStatusIcon(file.id)}
            <Button
              size="icon"
              variant="ghost"
              className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
              onClick={() => removeFile(file.id)}
              aria-label="Remove file">
              <XIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Preview;
