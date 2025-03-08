import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { analyzeVideo, AnalysisResult } from '../services/geminiService';

interface VideoUploadProps {
  onUploadStart: () => void;
  onAnalysisComplete: (analysisData: AnalysisResult) => void;
}

// Pet-themed decorative elements
const pawPrints = [
  { top: '10%', left: '5%', rotate: '15deg', scale: '0.7', color: 'primary' },
  { top: '70%', left: '90%', rotate: '-20deg', scale: '0.9', color: 'primary' },
  { top: '80%', left: '10%', rotate: '45deg', scale: '0.6', color: 'primary' },
  { top: '5%', left: '85%', rotate: '-10deg', scale: '0.8', color: 'primary' },
];

const PawPrintIcon = ({ color = 'primary', opacity = 0.3 }: { color?: string, opacity?: number }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`text-${color}-400`}
    style={{ opacity }}
  >
    <path 
      d="M12 14.5C15.5 14.5 16.5 12 16.5 9.5C16.5 7 15 5 12 5C9 5 7.5 7 7.5 9.5C7.5 12 8.5 14.5 12 14.5Z" 
      fill="currentColor" 
    />
    <path 
      d="M10.5 15.5C9.5 15.5 8.5 16 8.5 17.5C8.5 19 9.5 20 10.5 20C11.5 20 12 19 12 17.5C12 16 11.5 15.5 10.5 15.5Z" 
      fill="currentColor" 
    />
    <path 
      d="M13.5 15.5C12.5 15.5 12 16 12 17.5C12 19 12.5 20 13.5 20C14.5 20 15.5 19 15.5 17.5C15.5 16 14.5 15.5 13.5 15.5Z" 
      fill="currentColor" 
    />
    <path 
      d="M5.5 12.5C4.5 12.5 3.5 13 3.5 14.5C3.5 16 4.5 17 5.5 17C6.5 17 7 16 7 14.5C7 13 6.5 12.5 5.5 12.5Z" 
      fill="currentColor" 
    />
    <path 
      d="M18.5 12.5C17.5 12.5 17 13 17 14.5C17 16 17.5 17 18.5 17C19.5 17 20.5 16 20.5 14.5C20.5 13 19.5 12.5 18.5 12.5Z" 
      fill="currentColor" 
    />
  </svg>
);

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadStart, onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Reset error state
    setError(null);
    
    // Check file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an MP4, MOV, or QuickTime video file.');
      return;
    }
    
    // Check file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('File size exceeds 100MB limit.');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;
    
    try {
      onUploadStart();
      
      // Process the video and analyze it
      const analysisData = await analyzeVideo(selectedFile);
      
      // Pass the analysis data to the parent component
      onAnalysisComplete(analysisData);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error('Analysis error:', err);
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area - Enhanced with decorative elements */}
      <div className="relative">
        {/* Decorative paw prints in the background */}
        {pawPrints.map((paw, index) => (
          <div 
            key={index}
            className="absolute pointer-events-none"
            style={{
              top: paw.top,
              left: paw.left,
              transform: `rotate(${paw.rotate}) scale(${paw.scale})`,
            }}
          >
            <PawPrintIcon color={paw.color} opacity={0.2} />
          </div>
        ))}
        
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 hover-lift ${
            isDragging 
              ? 'border-primary-500 bg-primary-50 shadow-lg' 
              : selectedFile 
                ? 'border-green-500 bg-green-50 shadow-md' 
                : 'border-gray-300 hover:border-primary-400 bg-white'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/quicktime,video/x-msvideo"
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="py-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-green-500 bg-opacity-10 rounded-full animate-ping"></div>
                  <div className="relative z-10 w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-4 text-lg font-medium text-gray-900">Ready to analyze "{selectedFile.name}"</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="py-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  Let PetVision analyze your pet
                </p>
                <p className="text-base text-gray-600 mb-4">
                  Drag and drop your pet's video here, or click to browse
                </p>
                <p className="text-xs text-gray-500 bg-gray-100 py-2 px-4 inline-block rounded-full">
                  MP4, MOV, or QuickTime format (max 10 seconds, 100MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-3 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md text-sm text-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Analyze Button */}
      {selectedFile && !error && (
        <button 
          className="mt-5 w-full py-3 btn btn-primary rounded-xl shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={handleAnalyzeClick}
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Analyze Pet Video
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoUpload; 