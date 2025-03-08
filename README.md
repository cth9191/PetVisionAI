# PetVision AI

An AI-powered application that analyzes pet videos to identify potential health concerns and provide veterinary insights. PetVision AI uses Google's Gemini 2.0 Flash model to analyze videos of pets, extracting frames and generating detailed health assessments.

![PetVision AI](https://i.imgur.com/placeholder-for-actual-screenshot.jpg)

## Features

- **Video Upload & Analysis**: Upload short videos (up to 10 seconds) of your pet for AI analysis
- **Health Assessment**: Get a detailed health assessment including:
  - Concern level (Low, Medium, High)
  - Summary of observations
  - Key behavioral and physical observations
  - Possible causes for identified issues
  - Recommendations for care
  - Veterinary recommendations
- **Modern UI**: Clean, intuitive interface with clear visual indicators for concern levels

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Google API key with access to Gemini 2.0 Flash model

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/cth9191/PetVisionAI.git
   cd PetVisionAI/pet-vision
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Open the application in your browser
2. Click the upload area or drag and drop a short video of your pet (up to 10 seconds)
3. Click "Analyze Pet Video"
4. Wait for the AI to analyze the video frames
5. Review the detailed health assessment results

## Technical Details

### Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tools**: Vite
- **AI Model**: Google Gemini 2.0 Flash
- **Deployment**: Vercel

### How It Works

1. The application extracts up to 100 frames from the first 10 seconds of the uploaded video
2. These frames are sent to the Gemini AI model with a specialized prompt for veterinary analysis
3. The AI analyzes the frames for signs of gait issues, posture problems, mobility limitations, breathing patterns, and other health indicators
4. The response is parsed and displayed in an organized, user-friendly format

## Limitations

- Video analysis is limited to the first 10 seconds of any uploaded video
- Maximum file size is 100MB
- Results are provided for informational purposes only and should not replace professional veterinary care

## Deployment

This application is deployed on Vercel and can be accessed at [pet-vision-ai.vercel.app](https://pet-vision-ai.vercel.app) (or your custom domain).

## License

[MIT License](LICENSE)

## Acknowledgements

- Google Gemini AI for providing the AI capabilities
- All the pet owners who care about their pets' health 