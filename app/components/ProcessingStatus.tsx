export default function ProcessingStatus({ status, error }: { status: string; error: string | null }) {
  return (
    <div className="space-y-2">
      {status && <p className="text-sm text-gray-600">Status: {status}</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
    </div>
  );
}
