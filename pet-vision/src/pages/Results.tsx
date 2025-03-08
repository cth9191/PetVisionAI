import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnalysisResult } from '../services/geminiService';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state?.analysisData as AnalysisResult;

  // Redirect to home if no analysis data is present
  if (!analysisData) {
    navigate('/');
    return null;
  }

  // Determine concern level color and icon
  const getConcernLevelStyles = () => {
    switch (analysisData.concernLevel.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          pill: 'bg-green-100 text-green-800',
          icon: (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          pill: 'bg-yellow-100 text-yellow-800',
          icon: (
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        };
      case 'high':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          pill: 'bg-red-100 text-red-800',
          icon: (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          pill: 'bg-blue-100 text-blue-800',
          icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const styles = getConcernLevelStyles();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className={`${styles.bg} p-8 rounded-t-xl shadow-lg border-t ${styles.border} border-x ${styles.border}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-center">
                  {styles.icon}
                  <div className="ml-4">
                    <h1 className="text-3xl font-bold text-primary-800">Pet Health Analysis</h1>
                    <p className={`mt-1 ${styles.text}`}>
                      Analysis completed on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button 
                    onClick={() => navigate('/')}
                    className="btn btn-outline"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            </div>
            
            {/* Pet Info & Concern Level */}
            <div className="p-6 bg-white border-x border-gray-200 flex flex-col md:flex-row md:justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <svg className="w-10 h-10 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Pet Information</h2>
                  <div className="flex space-x-4 mt-1">
                    <div>
                      <span className="text-sm text-gray-500">Breed:</span>{" "}
                      <span className="font-medium">{analysisData.petInfo.breed || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Duration:</span>{" "}
                      <span className="font-medium">{analysisData.petInfo.videoDuration || '10 seconds'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-500 mb-1">Concern Level</div>
                <div className={`px-5 py-2 rounded-full font-bold ${styles.pill} flex items-center justify-center`}>
                  <span className="flex items-center mr-2">{styles.icon}</span>
                  {analysisData.concernLevel}
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="p-8 bg-white border-x border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                {analysisData.summary}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
              {/* Observations */}
              <div className="p-8 bg-white border-b border-l border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Key Observations
                </h2>
                <ul className="space-y-3">
                  {analysisData.observations.map((observation, index) => (
                    <li key={index} className="flex items-start animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{observation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Possible Causes */}
              <div className="p-8 bg-white border-b border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Possible Causes
                </h2>
                <ul className="space-y-3">
                  {analysisData.possibleCauses.map((cause, index) => (
                    <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="text-gray-700">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="p-8 bg-white border-x border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Recommendations
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-5 rounded-lg border border-primary-100">
                <ul className="space-y-3">
                  {analysisData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Veterinary Recommendation */}
            <div className={`p-8 ${styles.bg} border-x ${styles.border} border-b ${styles.border} rounded-b-xl shadow-lg`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className={`h-8 w-8 ${styles.text.replace('800', '600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className={`text-xl font-semibold ${styles.text} flex items-center`}>
                    Veterinary Recommendation
                    <div className={`inline-block ml-3 px-3 py-1 rounded-full text-sm font-medium ${styles.pill}`}>
                      {analysisData.concernLevel}
                    </div>
                  </h3>
                  <p className={`mt-3 ${styles.text.replace('800', '700')} bg-white bg-opacity-60 p-4 rounded-lg border ${styles.border}`}>
                    {analysisData.veterinaryRecommendation}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary py-3 px-6 flex-1 max-w-xs mx-auto sm:mx-0 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save to Health History
              </button>
              <button className="btn btn-outline py-3 px-6 flex-1 max-w-xs mx-auto sm:mx-0 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Find a Vet Near Me
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="container-custom text-center">
          <p>© {new Date().getFullYear()} PetVision AI. All rights reserved.</p>
          <p className="mt-2 text-gray-400 text-sm">For demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Results; 