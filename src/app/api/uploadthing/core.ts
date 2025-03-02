import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Simple auth function - replace with your own
// Normally you would use your auth provider
const auth = () => ({ id: "anonymous-user" });

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define a route for uploading images
  thumbnailUploader: f({
    image: {
      maxFileSize: "32MB" as const,
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = auth();
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      // Return the file URL to the client
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
