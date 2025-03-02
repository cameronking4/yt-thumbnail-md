/**
 * Utility function to add a play button overlay to a YouTube thumbnail image
 */

/**
 * Fetches an image from a URL and returns it as a Blob
 */
export const fetchImageAsBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url);
  return await response.blob();
};

/**
 * Adds a play button overlay to an image and returns the result as a Blob
 */
export const addPlayButtonOverlay = async (imageBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Create an image element to load the blob
    const img = new Image();
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image on the canvas
      ctx.drawImage(img, 0, 0);
      
      // Calculate the center of the image
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw the play button (red circle with white triangle)
      const radius = Math.min(canvas.width, canvas.height) * 0.1; // 10% of the smallest dimension
      
      // Draw the red circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'; // Semi-transparent red
      ctx.fill();
      
      // Draw the white triangle (play icon)
      const triangleSize = radius * 0.8;
      ctx.beginPath();
      ctx.moveTo(centerX + triangleSize / 2, centerY);
      ctx.lineTo(centerX - triangleSize / 2, centerY - triangleSize / 2);
      ctx.lineTo(centerX - triangleSize / 2, centerY + triangleSize / 2);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Convert the canvas to a blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Could not convert canvas to blob'));
        }
      }, 'image/jpeg', 0.95); // High quality JPEG
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Load the image from the blob
    img.src = URL.createObjectURL(imageBlob);
  });
};

/**
 * Process a YouTube thumbnail by adding a play button overlay
 * @param videoId YouTube video ID
 * @returns Blob of the processed image
 */
export const processYouTubeThumbnail = async (videoId: string): Promise<Blob> => {
  // Get the YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Fetch the thumbnail image
  const imageBlob = await fetchImageAsBlob(thumbnailUrl);
  
  // Add the play button overlay
  return await addPlayButtonOverlay(imageBlob);
};
