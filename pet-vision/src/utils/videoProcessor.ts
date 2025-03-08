/**
 * Extracts multiple frames from a video file
 * @param videoFile The video file to extract frames from
 * @param frameCount The number of frames to extract
 * @returns An array of base64-encoded JPEG images
 */
export const extractMultipleVideoFrames = async (
  videoFile: File,
  frameCount: number = 100
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a video element to load the video
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      // Create a URL for the video file
      const videoUrl = URL.createObjectURL(videoFile);
      video.src = videoUrl;
      
      // When the video metadata is loaded, we can access its duration
      video.onloadedmetadata = () => {
        // Limit video to 10 seconds for processing
        const maxDuration = Math.min(video.duration, 10);
        const frameInterval = maxDuration / frameCount;
        
        // Array to store the extracted frames
        const frames: string[] = [];
        
        // Create a canvas element for frame extraction
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Function to extract a frame at a specific time
        const extractFrame = (time: number) => {
          return new Promise<string>((resolveFrame) => {
            // Set the video to the specific time
            video.currentTime = time;
            
            // When the video is seeked to the time, extract the frame
            video.onseeked = () => {
              // Set canvas dimensions based on the video frame
              // Resize large frames to max 640px dimension
              let width = video.videoWidth;
              let height = video.videoHeight;
              
              if (width > 640 || height > 640) {
                if (width > height) {
                  height = Math.round((height / width) * 640);
                  width = 640;
                } else {
                  width = Math.round((width / height) * 640);
                  height = 640;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              
              // Draw the video frame on the canvas
              context.drawImage(video, 0, 0, width, height);
              
              // Convert the canvas to a JPEG image with 0.7 quality
              const frameDataUrl = canvas.toDataURL('image/jpeg', 0.7);
              
              // Resolve with the frame data URL
              resolveFrame(frameDataUrl);
            };
          });
        };
        
        // Extract frames at regular intervals
        const extractFrames = async () => {
          for (let i = 0; i < frameCount; i++) {
            const time = i * frameInterval;
            if (time < maxDuration) {
              try {
                const frame = await extractFrame(time);
                frames.push(frame);
              } catch (error) {
                console.error(`Error extracting frame at time ${time}:`, error);
              }
            }
          }
          
          // Clean up
          URL.revokeObjectURL(videoUrl);
          
          // Resolve with the extracted frames
          resolve(frames);
        };
        
        // Start extracting frames
        extractFrames();
      };
      
      // Handle errors
      video.onerror = (error) => {
        URL.revokeObjectURL(videoUrl);
        reject(new Error(`Error loading video: ${error}`));
      };
      
      // Load the video
      video.load();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Extracts a single frame from a video file at a specific time
 * @param videoFile The video file to extract a frame from
 * @param time The time in seconds to extract the frame at
 * @returns A base64-encoded JPEG image
 */
export const extractVideoFrame = async (
  videoFile: File,
  time: number = 0
): Promise<string> => {
  const frames = await extractMultipleVideoFrames(videoFile, 1);
  return frames[0];
};

export default {
  extractMultipleVideoFrames,
  extractVideoFrame
}; 