"use client";
import useDeleteAllImage from "hooks/useDeleteAllImage";
import { Button } from "./button";

const DeleteAllImage = () => {
  const handleDeleteAllImages = useDeleteAllImage();

  return (
    <div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={async () => await handleDeleteAllImages()}>
        Remove all files
      </Button>
    </div>
  );
};

export default DeleteAllImage;
