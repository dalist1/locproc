interface FileUploaderProps {
  onUpload: (files: FileList) => void;
  fileCount: number;
  maxFiles: number;
}

export default function FileUploader({ onUpload, fileCount, maxFiles }: FileUploaderProps) {
  const isDisabled = fileCount >= maxFiles;
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => (e.preventDefault(), e.dataTransfer.files && onUpload(e.dataTransfer.files));
  
  return (
    <div
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className={`border-2 border-dashed rounded-lg p-8 text-center ${isDisabled ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-blue-500 cursor-pointer'}`}
    >
      <input
        type="file"
        onChange={e => e.target.files && onUpload(e.target.files)}
        accept=".txt"
        multiple
        className="hidden"
        id="fileInput"
        disabled={isDisabled}
      />
      <label htmlFor="fileInput" className={isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
        <div className="space-y-2">
          <p className="text-lg">{isDisabled ? 'Maximum files reached' : 'Drop .txt files here'}</p>
          <p className="text-sm text-gray-500">{isDisabled ? `${maxFiles} files maximum` : `or click to select files (${fileCount}/${maxFiles})`}</p>
        </div>
      </label>
    </div>
  );
}
