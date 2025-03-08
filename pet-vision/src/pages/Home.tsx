import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoUpload from '../components/VideoUpload';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import { AnalysisResult } from '../services/geminiService';

// Pet images - using free stock pet images
const petImages = [
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  "https://images.unsplash.com/photo-1597633425046-08f5110420b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
];

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
        {/* Enhanced Hero Section with Background Images */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary-900 to-primary-700 text-white">
          {/* Floating pet images in background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="pet-image-grid">
              {Array(20).fill(0).map((_, i) => (
                <img 
                  key={i} 
                  src={petImages[i % petImages.length]} 
                  alt="Pet" 
                  className="pet-image" 
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 20 - 10}deg)`,
                    opacity: 0.3 + Math.random() * 0.7,
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-block mb-6 p-2 bg-primary-800 bg-opacity-50 rounded-full">
                <div className="flex items-center space-x-2 px-4 py-1 rounded-full bg-primary-600">
                  <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">AI-Powered Pet Health Analysis</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Understand Your Pet's Health <span className="text-primary-200">In Seconds</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Upload a short video of your pet and our AI will analyze their movement, posture, and overall health to provide valuable insights.
              </p>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
                <VideoUpload 
                  onUploadStart={() => setIsUploading(true)}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </div>
              
              {isUploading && (
                <div className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl border border-white border-opacity-20 animate-pulse">
                  <p className="text-primary-100 font-medium mb-3">Analyzing your pet's video...</p>
                  <div className="h-3 bg-primary-300 bg-opacity-30 rounded-full">
                    <div className="h-full bg-primary-200 rounded-full animate-progress w-2/3"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Wave effect at the bottom of the hero section */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Pet Gallery Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Our Happy & Healthy Pets</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Join thousands of pet owners who use PetVision AI to keep their furry companions happy and healthy.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {petImages.map((src, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
                  <img 
                    src={src} 
                    alt={`Happy pet ${idx + 1}`} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg">
                Start Your Pet's Health Journey
              </button>
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
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PetVision AI</h3>
              <p className="text-gray-400">
                Using cutting-edge AI to help you understand and care for your pet's health needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-300 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>© {new Date().getFullYear()} PetVision AI. All rights reserved.</p>
            <p className="mt-2 text-gray-500 text-sm">For demonstration purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 