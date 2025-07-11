import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { analyzeVideo } from '../geminiService';

global.fetch = vi.fn();

vi.mock('../videoProcessor', () => ({
  extractMultipleVideoFrames: vi.fn().mockResolvedValue(['frame1', 'frame2'])
}));

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully analyze video and return results', async () => {
    const mockResponse = {
      success: true,
      data: {
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
      }
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const mockVideoFile = new File(['mock video content'], 'test-video.mp4', {
      type: 'video/mp4'
    });


    const result = await analyzeVideo(mockVideoFile);

    expect(result).toEqual(mockResponse.data);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/analysis/video',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('frames')
      })
    );
  });

  it('should return mock data when backend fails', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));


    const mockVideoFile = new File(['mock video content'], 'test-video.mp4', {
      type: 'video/mp4'
    });

    const result = await analyzeVideo(mockVideoFile);

    expect(result).toHaveProperty('concernLevel');
    expect(result).toHaveProperty('summary');
    expect(result).toHaveProperty('observations');
    expect(result).toHaveProperty('recommendations');
  });

  it('should handle backend error response', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ error: 'Server error' })
    });


    const mockVideoFile = new File(['mock video content'], 'test-video.mp4', {
      type: 'video/mp4'
    });

    const result = await analyzeVideo(mockVideoFile);

    expect(result).toHaveProperty('concernLevel');
    expect(result).toHaveProperty('summary');
  });
});
