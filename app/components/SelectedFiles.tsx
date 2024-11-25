export default function SelectedFiles({ files, onRemove }: { files: File[]; onRemove: (index: number) => void }) {
  if (!files.length) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Selected Files</h3>
      <ul className="space-y-2">
        {files.map((file, i) => (
          <li key={`${file.name}-${i}`} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="truncate flex-1">{file.name}</span>
            <button onClick={() => onRemove(i)} className="ml-2 p-1 text-red-500 hover:text-red-700">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
