import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.0-flash';

if (!API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY environment variable is not set. API calls will fail.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: MODEL_NAME }) : null;

export const analyzeVideoFrames = async (frames) => {
  if (!API_KEY || !model) {
    console.log('🚫 No API key configured, returning mock data for testing');
    return getMockAnalysisResult();
  }
  
  try {
    console.log(`🤖 Preparing to send ${frames.length} frames to Gemini API`);
    
    const imagePrompts = frames.map(frame => ({
      inlineData: {
        data: frame.replace('data:image/jpeg;base64,', ''),
        mimeType: 'image/jpeg',
      }
    }));
    
    let totalPayloadSize = 0;
    imagePrompts.forEach(prompt => {
      totalPayloadSize += prompt.inlineData.data.length;
    });
    console.log(`📊 Total payload size: ~${Math.round(totalPayloadSize / 1024)} KB`);
    
    const estimatedTokens = Math.round(totalPayloadSize / 4);
    console.log(`🔢 Estimated token count: ~${estimatedTokens.toLocaleString()} tokens`);
    
    const prompt = `You are a veterinary AI specialist analyzing a series of video frames from a pet. These are ${frames.length} frames from a short video, giving you exceptional temporal resolution to detect even subtle movement patterns or irregularities.

Please carefully examine the following aspects of the pet:
1. Gait analysis - look for limping, uneven weight distribution, or hesitation when moving
2. Posture - observe any abnormal body positioning, hunching, or asymmetry
3. Mobility - evaluate range of motion in joints, flexibility, and ease of movement
4. Breathing patterns - note any rapid, shallow, or labored breathing
5. Behavior - assess signs of pain, distress, lethargy, or unusual reactions
6. Physical condition - check for visible swelling, injuries, abnormal growths, or skin issues
7. Neurological signs - watch for tremors, head tilting, circling, or poor coordination

Based on your detailed frame-by-frame analysis, provide a comprehensive health assessment in EXACTLY the following format. Do not use asterisks or other markdown formatting:

CONCERN_LEVEL: [Low/Medium/High]

SUMMARY: [Provide a detailed overview that synthesizes all your observations into a cohesive assessment]

OBSERVATIONS:
- [Specific observation 1]
- [Specific observation 2]
- [Specific observation 3]
- [Specific observation 4]
- [Specific observation 5]

POSSIBLE_CAUSES:
- [Potential cause 1]
- [Potential cause 2]
- [Potential cause 3]
- [Potential cause 4]

RECOMMENDATIONS:
- [Specific recommendation 1]
- [Specific recommendation 2]
- [Specific recommendation 3]
- [Specific recommendation 4]
- [Specific recommendation 5]

VETERINARY_RECOMMENDATION: [Clear statement about whether veterinary care is needed, with what urgency, and what type of veterinary specialist might be most appropriate]

Be extremely detailed and precise in your observations. Use EXACTLY this format with a single line break between sections and proper bullet points for list items.`;
    
    console.log('🚀 Sending request to Gemini API...');
    const result = await model.generateContent([prompt, ...imagePrompts]);
    
    const response = result.response;
    const text = response.text();
    console.log('📥 Received response from Gemini API');
    console.log(`📏 Response length: ${text.length} characters`);
    
    const parsedResult = parseAnalysisResults(text);
    console.log('✅ Successfully parsed API response');
    return parsedResult;
    
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
};

function parseAnalysisResults(analysisText) {
  console.log('🔍 Parsing Gemini response...');
  
  const result = {
    petInfo: {
      breed: "Not specified",
      videoDuration: "10 seconds"
    },
    concernLevel: "Medium",
    summary: "",
    observations: [],
    possibleCauses: [],
    recommendations: [],
    veterinaryRecommendation: ""
  };

  try {
    const cleanText = analysisText.replace(/\*\*/g, '');
    
    if (cleanText.includes('CONCERN_LEVEL:')) {
      const match = cleanText.match(/CONCERN_LEVEL:(.*?)(?=SUMMARY:|$)/s);
      if (match && match[1]) {
        result.concernLevel = match[1].trim();
      }
    }
    
    if (cleanText.includes('SUMMARY:')) {
      const match = cleanText.match(/SUMMARY:(.*?)(?=OBSERVATIONS:|$)/s);
      if (match && match[1]) {
        result.summary = match[1].trim();
      }
    }
    
    if (cleanText.includes('OBSERVATIONS:')) {
      const match = cleanText.match(/OBSERVATIONS:(.*?)(?=POSSIBLE_CAUSES:|$)/s);
      if (match && match[1]) {
        result.observations = match[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line && (line.startsWith('-') || line.startsWith('•')))
          .map(line => line.replace(/^[-•]\s*/, '').trim());
      }
    }
    
    if (cleanText.includes('POSSIBLE_CAUSES:')) {
      const match = cleanText.match(/POSSIBLE_CAUSES:(.*?)(?=RECOMMENDATIONS:|$)/s);
      if (match && match[1]) {
        result.possibleCauses = match[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line && (line.startsWith('-') || line.startsWith('•')))
          .map(line => line.replace(/^[-•]\s*/, '').trim());
      }
    }
    
    if (cleanText.includes('RECOMMENDATIONS:')) {
      const match = cleanText.match(/RECOMMENDATIONS:(.*?)(?=VETERINARY_RECOMMENDATION:|$)/s);
      if (match && match[1]) {
        result.recommendations = match[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line && (line.startsWith('-') || line.startsWith('•')))
          .map(line => line.replace(/^[-•]\s*/, '').trim());
      }
    }
    
    if (cleanText.includes('VETERINARY_RECOMMENDATION:')) {
      const match = cleanText.match(/VETERINARY_RECOMMENDATION:(.*?)$/s);
      if (match && match[1]) {
        result.veterinaryRecommendation = match[1].trim();
      }
    }

    if (!result.summary || (result.observations.length === 0 && cleanText.includes('OBSERVATIONS:'))) {
      console.log('🔄 Regex parsing incomplete, trying alternative parsing method...');
      const sections = cleanText.split('\n\n');
      
      for (const section of sections) {
        const trimmedSection = section.trim();
        
        if (trimmedSection.startsWith('CONCERN_LEVEL:')) {
          result.concernLevel = trimmedSection.replace('CONCERN_LEVEL:', '').trim();
        } 
        else if (trimmedSection.startsWith('SUMMARY:')) {
          result.summary = trimmedSection.replace('SUMMARY:', '').trim();
        }
        else if (trimmedSection.startsWith('OBSERVATIONS:')) {
          const lines = trimmedSection
            .replace('OBSERVATIONS:', '')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);
            
          result.observations = lines
            .filter(line => line.startsWith('-') || line.startsWith('•'))
            .map(line => line.replace(/^[-•]\s*/, '').trim());
            
          if (result.observations.length === 0) {
            result.observations = lines.filter(line => line.length > 10);
          }
        }
        else if (trimmedSection.startsWith('POSSIBLE_CAUSES:')) {
          const lines = trimmedSection
            .replace('POSSIBLE_CAUSES:', '')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);
            
          result.possibleCauses = lines
            .filter(line => line.startsWith('-') || line.startsWith('•'))
            .map(line => line.replace(/^[-•]\s*/, '').trim());
            
          if (result.possibleCauses.length === 0) {
            result.possibleCauses = lines.filter(line => line.length > 10);
          }
        }
        else if (trimmedSection.startsWith('RECOMMENDATIONS:')) {
          const lines = trimmedSection
            .replace('RECOMMENDATIONS:', '')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);
            
          result.recommendations = lines
            .filter(line => line.startsWith('-') || line.startsWith('•'))
            .map(line => line.replace(/^[-•]\s*/, '').trim());
            
          if (result.recommendations.length === 0) {
            result.recommendations = lines.filter(line => line.length > 10);
          }
        }
        else if (trimmedSection.startsWith('VETERINARY_RECOMMENDATION:')) {
          result.veterinaryRecommendation = trimmedSection
            .replace('VETERINARY_RECOMMENDATION:', '')
            .trim();
        }
      }
    }
    
    console.log('✅ Parsing completed successfully');
  } catch (error) {
    console.error('❌ Error parsing analysis:', error);
  }
  
  return result;
}

function getMockAnalysisResult() {
  return {
    petInfo: {
      breed: "Mixed breed (test data)",
      videoDuration: "10 seconds"
    },
    concernLevel: "Low",
    summary: "Based on the video analysis, your pet appears to be moving normally with no obvious signs of distress or mobility issues. The gait appears steady and balanced.",
    observations: [
      "Normal gait pattern observed",
      "Good balance and coordination",
      "No visible signs of limping or favoring limbs",
      "Alert and responsive behavior",
      "Normal breathing pattern"
    ],
    possibleCauses: [
      "No concerning issues identified",
      "Normal healthy pet behavior"
    ],
    recommendations: [
      "Continue regular exercise routine",
      "Maintain current diet and care",
      "Schedule routine veterinary checkups",
      "Monitor for any changes in behavior"
    ],
    veterinaryRecommendation: "No immediate veterinary attention needed. Continue with regular wellness checkups as recommended by your veterinarian."
  };
}
