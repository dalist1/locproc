'use client';

import { useState } from 'react';
import FileUploader from './components/FileUploader';
import MapDisplay from './components/MapDisplay';
import ProcessingStatus from './components/ProcessingStatus';
import SelectedFiles from './components/SelectedFiles';
import AIResponse from './components/AIResponse';

interface DebugInfo {
  rawAIResponse: string;
  extractedAddress: string;
  geocodeResponse: any;
}

export default function Home() {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  const processFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    if (selectedFiles.length + fileArray.length > 6) return setError('Maximum 6 files allowed');
    if (!fileArray.every(file => file.name.endsWith('.txt'))) return setError('Only .txt files allowed');
    setSelectedFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setAIResponse(null);
    setDebugInfo(null);
  };

  const processTranscripts = async () => {
    if (!selectedFiles.length) return setError('Please upload at least one file');
    setStatus('Processing transcripts...');
    setError(null);
    setAIResponse(null);
    setDebugInfo(null);
    
    try {
      const fileContents = await Promise.all(selectedFiles.map(file => file.text()));
      const combinedTranscripts = fileContents.join('\n\n--- Next Transcript ---\n\n');
      
      const aiRes = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: combinedTranscripts }),
      });

      if (!aiRes.ok) throw new Error('AI processing failed');
      const { text: rawResponse } = await aiRes.json();
      const streetAddress = rawResponse.trim();
      
      if (!streetAddress) throw new Error('No address extracted from transcripts');
      setAIResponse(streetAddress);
      
      const geocodeRes = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: streetAddress }),
      });

      const geocodeData = await geocodeRes.json();
      setDebugInfo({ rawAIResponse: rawResponse, extractedAddress: streetAddress, geocodeResponse: geocodeData });

      if (geocodeData.error) {
        throw new Error(geocodeData.error);
      }

      if (geocodeData.features?.length > 0) {
        const firstResult = geocodeData.features[0];
        const [lng, lat] = firstResult.center;
        setLocation({ lat, lng });
        setStatus(`Location found: ${firstResult.place_name}`);
      } else {
        throw new Error('No location found for this address');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setStatus('Error occurred');
      console.error('Processing error:', err);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Transcript Location Processor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <FileUploader onUpload={processFiles} fileCount={selectedFiles.length} maxFiles={6} />
          <SelectedFiles files={selectedFiles} onRemove={removeFile} />
          <button
            onClick={processTranscripts}
            disabled={!selectedFiles.length}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Process Transcripts
          </button>
          <ProcessingStatus status={status} error={error} />
          {aiResponse && <AIResponse response={aiResponse} />}
          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2 text-sm font-mono">
              <h3 className="font-bold">Debug Information:</h3>
              <pre className="overflow-x-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </div>
        <div className="h-[400px] border rounded-lg overflow-hidden">
          <MapDisplay location={location} />
        </div>
      </div>
    </main>
  );
}
