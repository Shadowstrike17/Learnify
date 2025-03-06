import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, FileImage, FileAudio, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  isLoading?: boolean;
}

export const FileUploader = ({ onUpload, isLoading = false }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        onUpload(files);
      }
    }, 200);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return <FileImage className="h-5 w-5" />;
    if (fileType.includes("audio")) return <FileAudio className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-all",
          isDragging
            ? "border-app-blue bg-app-blue/5"
            : "border-gray-300 hover:border-app-blue/50",
          files.length > 0 && "border-app-blue/30"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center text-center cursor-pointer">
          <Upload className="h-10 w-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">
            {isDragging ? "Drop files here" : "Upload your study materials"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop files, or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports: PDF, DOC, TXT, MP3, MP4, JPG, PNG
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.mp3,.mp4,.jpg,.jpeg,.png"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Files:</div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <span className="text-sm truncate max-w-[180px]">
                    {file.name}
                  </span>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Uploading and processing...</span>
            <span>{uploadProgress}%</span>
          </div>
        </div>
      ) : (
        files.length > 0 && (
          <Button
            className="w-full bg-app-blue hover:bg-app-blue-dark"
            onClick={handleUpload}
          >
            <Check className="mr-2 h-4 w-4" /> Process Files
          </Button>
        )
      )}
    </div>
  );
};
