export default function AIResponse({ response }: { response: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Extracted Address</h3>
      <div className="font-mono bg-white p-2 rounded border">{response}</div>
    </div>
  );
}
