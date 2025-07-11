import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzeVideoFrames } from '../services/geminiService.js';

const router = express.Router();

const validateAnalysisRequest = (req, res, next) => {
  const { frames } = req.body;
  
  if (!frames || !Array.isArray(frames) || frames.length === 0) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Frames array is required and must not be empty'
    });
  }

  if (frames.length > 100) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Maximum 100 frames allowed'
    });
  }

  next();
};

router.post('/video', validateAnalysisRequest, async (req, res, next) => {
  try {
    const { frames } = req.body;
    
    console.log(`🔍 Analyzing ${frames.length} frames`);
    
    const analysisResult = await analyzeVideoFrames(frames);
    
    console.log('✅ Analysis completed successfully');
    
    res.json({
      success: true,
      data: analysisResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    next(error);
  }
});

export default router;
