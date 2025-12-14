interface MessagePreviewImageProps {
  previewUrl: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const MessagePreviewImage = ({
  previewUrl,
  setPreviewUrl,
}: MessagePreviewImageProps) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={() => setPreviewUrl("")}
    >
      <div
        className="relative bg-transparent rounded-lg overflow-hidden max-w-5xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={previewUrl}
          alt="preview"
          className="w-auto h-[90vh] object-contain rounded-lg"
          width={1200}
          height={800}
        />
      </div>
    </div>
  );
};
