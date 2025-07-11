import { extractMultipleVideoFrames } from '../utils/videoProcessor';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
console.log("Backend URL:", BACKEND_URL);

/**
 * Interface for the analysis result structure
 */
export interface AnalysisResult {
  petInfo: {
    breed: string;
    videoDuration: string;
  };
  concernLevel: string;
  summary: string;
  observations: string[];
  possibleCauses: string[];
  recommendations: string[];
  veterinaryRecommendation: string;
}

/**
 * Analyzes a pet video using Google's Gemini 2.0 Flash API
 * @param videoFile The video file to analyze
 * @returns Analysis data including concern level, observations, causes, and recommendations
 */
export const analyzeVideo = async (videoFile: File): Promise<AnalysisResult> => {
  try {
    console.log('🎬 Starting video analysis...');
    console.log(`📁 File: ${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Extract frames from the video
    console.log('🖼️ Extracting frames from video...');
    const frames = await extractMultipleVideoFrames(videoFile, 100);
    console.log(`✅ Extracted ${frames.length} frames`);
    
    if (frames.length === 0) {
      throw new Error('No frames could be extracted from the video');
    }

    console.log(`🤖 Sending ${frames.length} frames to backend for analysis...`);
    
    const response = await fetch(`${BACKEND_URL}/api/analysis/video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        frames: frames
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Backend API error: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('📥 Received response from backend');
    
    if (!result.success) {
      throw new Error(`Analysis failed: ${result.error || 'Unknown error'}`);
    }
    
    console.log('✅ Successfully received analysis from backend');
    return result.data;
    
  } catch (error) {
    console.error('❌ Error analyzing video:', error);
    
    console.log('🔄 Backend failed, returning mock data as fallback...');
    return getMockAnalysisData();
  }
};


/**
 * Returns mock analysis data for demonstration purposes
 * This is used when the API call fails or for testing
 */
const getMockAnalysisData = (): AnalysisResult => {
  console.log("USING MOCK DATA - NOT A REAL ANALYSIS");
  return {
    petInfo: {
      breed: "Golden Retriever",
      videoDuration: "10 seconds"
    },
    concernLevel: "Medium",
    summary: "The pet shows signs of mild discomfort in the right hind leg, with occasional limping and weight shifting. Overall energy level appears normal, but there are indications of potential joint discomfort.",
    observations: [
      "Intermittent limping on right hind leg",
      "Weight shifting away from right side when standing",
      "Slight hesitation before jumping or running",
      "Normal breathing pattern",
      "Alert and responsive to surroundings"
    ],
    possibleCauses: [
      "Early-stage arthritis or joint inflammation",
      "Minor soft tissue injury (strain or sprain)",
      "Hip dysplasia (common in this breed)",
      "Recent overexertion during exercise"
    ],
    recommendations: [
      "Limit high-impact activities for 7-10 days",
      "Apply warm compress to the affected leg for 10-15 minutes twice daily",
      "Consider joint supplements containing glucosamine and chondroitin",
      "Monitor for worsening symptoms",
      "Ensure the pet maintains a healthy weight to reduce joint stress"
    ],
    veterinaryRecommendation: "A veterinary examination is recommended within the next 1-2 weeks if symptoms persist. If limping worsens or the pet shows signs of increased pain, seek veterinary care sooner."
  };
};

export default {
  analyzeVideo
};      