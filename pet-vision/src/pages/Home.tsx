import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoUpload from '../components/VideoUpload';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import { AnalysisResult } from '../services/geminiService';

const Home = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  const handleAnalysisComplete = (analysisData: AnalysisResult) => {
    // Navigate to results page with the analysis data
    navigate('/results', { state: { analysisData } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
                Understand Your Pet's Health In Seconds
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Upload a short video of your pet and our AI will analyze their movement, posture, and overall health.
              </p>
              
              <div className="mt-10">
                <VideoUpload 
                  onUploadStart={() => setIsUploading(true)}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </div>
              
              {isUploading && (
                <div className="mt-8 p-4 bg-white rounded-lg shadow-md animate-pulse">
                  <p className="text-primary-600 font-medium">Analyzing your pet's video...</p>
                  <div className="mt-3 h-2 bg-primary-200 rounded-full max-w-md mx-auto">
                    <div className="h-full bg-primary-500 rounded-full animate-progress"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Benefits Section */}
        <Benefits />
        
        {/* Pricing Section */}
        <Pricing />
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom text-center">
          <p>© {new Date().getFullYear()} PetVision AI. All rights reserved.</p>
          <p className="mt-2 text-gray-400 text-sm">For demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 