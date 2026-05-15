import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, FileImage, Link2, Loader2, Maximize2, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useImageUpload } from "@/hooks/useImageUpload";

export type ImageObjectFit = "cover" | "contain" | "fill" | "none";
export type ImageOrientation = "landscape" | "portrait" | "square";

export interface ImageDisplayOptions {
  objectFit: ImageObjectFit;
  orientation: ImageOrientation;
}

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string, displayOptions?: ImageDisplayOptions) => void;
  placeholder?: string;
  disabled?: boolean;
  showDisplayOptions?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = "Upload an image or paste URL",
  disabled = false,
  showDisplayOptions = false,
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [manualUrl, setManualUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [displayOptions, setDisplayOptions] = useState<ImageDisplayOptions>({
    objectFit: "cover",
    orientation: "landscape",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImage, uploadFromDataUrl, isUploading } = useImageUpload();

  // Handle value changes from parent
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  // Handle file selection
  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      try {
        const url = await uploadImage(file);
        onChange(url, displayOptions);
      } catch (err) {
        // If upload fails, still allow using the local preview as a fallback
        console.error("Upload failed:", err);
        setError("Upload failed. You can still save with the local preview.");
      }
    },
    [uploadImage, onChange]
  );

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled || isUploading) return;

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [disabled, isUploading, handleFile]
  );

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (disabled || isUploading) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            await handleFile(file);
          }
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [disabled, isUploading, handleFile]);

  // Handle manual URL submission
  const handleUrlSubmit = useCallback(() => {
    if (manualUrl) {
      setPreview(manualUrl);
      onChange(manualUrl, displayOptions);
      setManualUrl("");
      setShowUrlInput(false);
    }
  }, [manualUrl, onChange, displayOptions]);

  // Handle remove
  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange("", { objectFit: "cover", orientation: "landscape" });
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onChange]);

  // Get object fit class
  const getObjectFitClass = (fit: ImageObjectFit): string => {
    switch (fit) {
      case "cover": return "object-cover";
      case "contain": return "object-contain";
      case "fill": return "object-fill";
      case "none": return "object-none";
      default: return "object-cover";
    }
  };

  // Get aspect ratio class
  const getAspectRatioClass = (orientation: ImageOrientation): string => {
    switch (orientation) {
      case "landscape": return "aspect-video";
      case "portrait": return "aspect-[3/4]";
      case "square": return "aspect-square";
      default: return "aspect-video";
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Preview Area */}
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-border bg-muted/20">
          <div className={`w-full h-48 ${getAspectRatioClass(displayOptions.orientation)}`}>
            <img
              src={preview}
              alt="Preview"
              className={`w-full h-full ${getObjectFitClass(displayOptions.objectFit)}`}
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            {showDisplayOptions && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowOptions(!showOptions)}
                className="h-8 px-2"
                title="Display options"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="h-8 px-2"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="h-8 px-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`relative rounded-lg border-2 border-dashed transition-colors ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-muted-foreground"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            disabled={disabled || isUploading}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <FileImage className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag & drop, click to select, or paste (Ctrl+V)
                </p>
                <p className="text-xs text-muted-foreground">
                  Max file size: 5MB
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUrlInput(true);
                  }}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Or enter URL
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Manual URL Input */}
      {showUrlInput && !preview && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
          />
          <Button onClick={handleUrlSubmit} disabled={!manualUrl}>
            Add
          </Button>
        </div>
      )}

      {/* Display Options Panel */}
      {showOptions && showDisplayOptions && (
        <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            <Label className="text-sm font-medium">Display Options</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Object Fit</Label>
              <Select
                value={displayOptions.objectFit}
                onValueChange={(value: ImageObjectFit) => setDisplayOptions({ ...displayOptions, objectFit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Orientation</Label>
              <Select
                value={displayOptions.orientation}
                onValueChange={(value: ImageOrientation) => setDisplayOptions({ ...displayOptions, orientation: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Current: {displayOptions.objectFit} - {displayOptions.orientation}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
