# Transcript Location Processor

A modern web application that processes text transcripts to extract and visualize location data. The application allows users to upload text files, processes them using AI to extract address information, and displays the location on an interactive map.

## Features

- File Upload:
  - Support for multiple text file uploads (up to 6 files)
  - Drag and drop functionality
  - File validation and management
  - Individual file removal capability

- Location Processing:
  - AI-powered address extraction from transcripts
  - Geocoding support for accurate location data
  - Interactive map visualization using Mapbox
  - Detailed debug information display

- User Interface:
  - Responsive design for all screen sizes
  - Real-time processing status updates
  - Error handling and user feedback
  - Clean and modern UI with Tailwind CSS

## Getting Started

### Prerequisites

Before running this project, make sure you have:
- Node.js (v18 or higher)
- npm or yarn or bun package manager
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

## Project Structure

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

## Usage

1. Upload text files using the drag-and-drop interface or file selector
2. Manage uploaded files using the file list interface
3. Click "Process Transcripts" to start the analysis
4. View the extracted address and its location on the map
5. Check debug information if needed

## Error Handling

The application includes comprehensive error handling for:
- File upload limits and types
- API processing failures
- Geocoding issues
- Network problems

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Maps powered by Mapbox
- AI capabilities provided by Google's Generative AI