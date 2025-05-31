import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowRight, Upload, Check, X, Image } from 'lucide-react';

interface ImageInputSectionProps {
  onSubmit: (data: { image: File }) => void;
  isLoading: boolean;
}

const ImageInputSection: React.FC<ImageInputSectionProps> = ({ onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit({ image: selectedFile });
    } else {
      setError('Please select an image to analyze');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload news image or screenshot
        </label>
        
        {!selectedFile ? (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
              isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
            } cursor-pointer`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className={`h-10 w-10 mb-3 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
              <p className="text-sm text-gray-600 mb-1">
                {isDragActive
                  ? 'Drop the image here...'
                  : 'Drag & drop an image, or click to select'}
              </p>
              <p className="text-xs text-gray-500">
                Supports JPG, PNG, GIF, BMP (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="relative border rounded-lg p-4">
            <div className="absolute top-2 right-2">
              <button
                type="button"
                onClick={handleRemoveFile}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4 bg-gray-100">
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="Selected file preview" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center text-sm font-medium text-gray-900">
                  <Check className="h-4 w-4 text-success-500 mr-1" />
                  <span>Image selected</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium mb-2">Image detection capabilities:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Extract and analyze text from memes, screenshots, or news images</li>
          <li>Detect image manipulation and editing</li>
          <li>Identify deepfakes and synthetically generated content</li>
        </ul>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !selectedFile}
          className={`btn ${!selectedFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'btn-primary'}`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              <span>Processing Image...</span>
            </>
          ) : (
            <>
              <span>Verify Image</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ImageInputSection;