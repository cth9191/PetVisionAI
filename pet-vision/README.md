# PetVision AI

PetVision AI is a web application that analyzes pet videos for health issues using Google's Gemini 2.0 Flash API. Upload a short video of your pet and get instant health insights.

## Features

- **Video Analysis**: Upload MP4, MOV, or QuickTime videos up to 100MB
- **AI-Powered Assessment**: Analyzes pet movement, posture, and overall health
- **Detailed Results**: Get concern levels, observations, causes, and recommendations
- **User-Friendly Interface**: Beautiful, modern UI with intuitive navigation

## Technical Implementation

- **Frontend**: React, TypeScript, and Tailwind CSS
- **AI Integration**: Google's Gemini 2.0 Flash API
- **Video Processing**:
  - Extracts 45 frames from each video (evenly distributed)
  - Resizes large frames to max 640px dimension
  - Compresses frames to 0.7 JPEG quality for efficiency

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pet-vision.git
   cd pet-vision
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add your Gemini API key:
   - Get an API key from [Google AI Studio](https://makersuite.google.com/)
   - Open `src/services/geminiService.ts`
   - Replace `YOUR_GEMINI_API_KEY` with your actual API key

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload a short video (up to 10 seconds) of your pet
2. Wait for the AI to analyze the video
3. View the detailed health assessment results
4. Follow the recommendations or consult with a veterinarian if needed

## Project Structure

```
pet-vision/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Benefits.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pricing.tsx
│   │   └── VideoUpload.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Results.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── utils/
│   │   └── videoProcessor.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google's Gemini 2.0 Flash API for providing the AI capabilities
- React and Tailwind CSS for the frontend framework and styling 