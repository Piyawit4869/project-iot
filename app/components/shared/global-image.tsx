import { useState } from "react";
import React from "react";

import PlaceholderImage from "public/assets/images/placeholder.webp";
import { cn } from "~/lib/utils";

interface GlobalImageProps {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  className?: string;
}

const GlobalImageComponent: React.FC<GlobalImageProps> = ({
  src,
  alt = "image",
  width = 100,
  height = 100,
  className,
}) => {
  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);

  const imageSrc = !src || hasError ? PlaceholderImage : src;

  const ImagePreview: React.FC<{
    src: string;
    alt?: string;
  }> = ({ src, alt }) => {
    if (!src || hasError) return null;

    return (
      <div className="mt-2">
        {/* Thumbnail */}

        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-5xl max-h-[85vh] w-full">
              <img
                src={src}
                alt={alt ?? "image full"}
                className="max-h-[85vh] w-full object-contain bg-white rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <img
        // loader={({ src }: { src: string }) => src}
        src={imageSrc || PlaceholderImage}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "cursor-pointer")}
        onError={() => setHasError(true)}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="mt-2 space-y-2">
          <ImagePreview src={imageSrc} alt={alt} />
        </div>
      )}
    </>
  );
};
// Memoized export
export const GlobalImage = React.memo(GlobalImageComponent);
// export const GlobalImage = GlobalImageComponent;
