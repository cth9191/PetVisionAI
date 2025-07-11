import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/geminiService.js', () => ({
  analyzeVideoFrames: jest.fn()
}));

const { analyzeVideoFrames } = await import('../services/geminiService.js');

const app = (await import('../server.js')).default;

describe('Backend API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/analysis/video', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should analyze video frames successfully', async () => {
      const mockAnalysisResult = {
        petInfo: {
          breed: "Golden Retriever",
          videoDuration: "10 seconds"
        },
        concernLevel: "Low",
        summary: "Your pet appears healthy and active.",
        observations: ["Normal gait", "Good posture"],
        possibleCauses: ["No concerns identified"],
        recommendations: ["Continue regular exercise"],
        veterinaryRecommendation: "No immediate care needed"
      };

      analyzeVideoFrames.mockResolvedValue(mockAnalysisResult);

      const response = await request(app)
        .post('/api/analysis/video')
        .send({
          frames: ['frame1', 'frame2', 'frame3']
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toEqual(mockAnalysisResult);
      expect(analyzeVideoFrames).toHaveBeenCalledWith(['frame1', 'frame2', 'frame3']);
    });

    it('should handle missing frames', async () => {
      const response = await request(app)
        .post('/api/analysis/video')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'No frames provided');
    });

    it('should handle empty frames array', async () => {
      const response = await request(app)
        .post('/api/analysis/video')
        .send({ frames: [] })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'No frames provided');
    });

    it('should handle analysis service errors', async () => {
      analyzeVideoFrames.mockRejectedValue(new Error('AI service error'));

      const response = await request(app)
        .post('/api/analysis/video')
        .send({
          frames: ['frame1', 'frame2']
        })
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('AI service error');
    });

    it('should handle rate limiting', async () => {
      const requests = Array(20).fill().map(() => 
        request(app)
          .post('/api/analysis/video')
          .send({ frames: ['frame1'] })
      );

      const responses = await Promise.all(requests);
      
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Error handling', () => {
    it('should handle 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});
