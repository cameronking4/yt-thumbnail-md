"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "./api/uploadthing/core";

export const UploadThingButton = ({
  onClientUploadComplete,
  onUploadError,
}: {
  onClientUploadComplete: (res: { url: string }[]) => void;
  onUploadError: (error: Error) => void;
}) => {
  return (
    <UploadButton<OurFileRouter, "thumbnailUploader">
      endpoint="thumbnailUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white ut-button:font-medium ut-button:py-3 ut-button:px-6 ut-button:rounded-lg ut-button:transition-colors"
      content={{
        button({ ready }) {
          return ready ? "Upload Thumbnail" : "Loading...";
        },
      }}
      appearance={{
        button: {
          padding: "10px 20px",
        },
      }}
    />
  );
};
