import { useState, useCallback } from "react";

interface UploadOptions {
  apiUrl?: string;
}

interface UploadResult {
  secure_url: string;
  public_id: string;
}

export const useCloudinaryUpload = (options: UploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(
    async (file: File): Promise<string> => {
      setIsUploading(true);
      setError(null);

      try {
        const apiUrl = options.apiUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001';

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `${apiUrl}/api/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.url;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  const uploadFromDataUrl = useCallback(
    async (dataUrl: string, fileName: string = "clipboard-image.png"): Promise<string> => {
      setIsUploading(true);
      setError(null);

      try {
        const apiUrl = options.apiUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001';

        // Convert data URL to blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], fileName, { type: blob.type });

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `${apiUrl}/api/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.url;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  return {
    uploadImage,
    uploadFromDataUrl,
    isUploading,
    error,
  };
};

// Default configuration
export const useImageUpload = () => {
  return useCloudinaryUpload({
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  });
};

export default useImageUpload;
