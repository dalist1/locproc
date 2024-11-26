# Transcript Location Processor 🚀

This project was built as part of a challange.

Revolutionize your data processing with our Transcript Location Processor! This state-of-the-art web application extracts and visualizes location data from text transcripts using powerful AI technology.

## 🌟 Overview
Effortlessly upload text files and let our AI-powered system extract address information and visualize it on an interactive map. Built for accuracy and efficiency, our application leverages advanced AI models and seamless map integration.

## 🛠️ Features

- **File Upload:**
  - Support for up to 6 text file uploads simultaneously
  - Drag and drop functionality for ease of use
  - Robust file validation and management
  - Option to remove individual files

- **Location Processing:**
  - AI-driven address extraction from transcripts
  - Accurate geocoding support
  - Interactive map visualization powered by Mapbox
  - Detailed debug information for transparency

- **User Interface:**
  - Fully responsive design for all devices
  - Real-time processing status updates
  - Comprehensive error handling and user feedback
  - Sleek and modern UI with Tailwind CSS

## 🌐 Getting Started

### Prerequisites

Before you start, ensure you have:
- Node.js (v18 or higher)
- npm, yarn, or bun package manager
- Mapbox API key
- Google AI API key

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/dalist1/geoloc-ten
cd transcript-location-processor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

### Running the Application

For development:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

For production:
```bash
npm run build
npm start
# or
yarn build
yarn start
# or
bun run build
bun start
```

Visit `http://localhost:3000` to view the application.

## 📂 Project Structure

```
geoloc-ten/
├── app/
│   ├── components/
│   │   ├── AIResponse.tsx
│   │   ├── FileUploader.tsx
│   │   ├── MapDisplay.tsx
│   │   ├── ProcessingStatus.tsx
│   │   └── SelectedFiles.tsx
│   ├── api/
│   │   ├── ai/
│   │   └── geocode/
│   ├── layout.tsx
│   └── page.tsx
├── public/
└── ...config files
```

## 🚀 Usage

1. Upload text files using the drag-and-drop interface or file selector.
2. Manage uploaded files using the file list interface.
3. Click "Process Transcripts" to start the analysis.
4. View the extracted addresses and their locations on the map.
5. Check debug information if needed.

## 🛡️ Error Handling

Our application includes robust error handling for:
- File upload limits and types
- API processing failures
- Geocoding issues
- Network problems

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
