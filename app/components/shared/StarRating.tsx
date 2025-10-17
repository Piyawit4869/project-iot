import { Star } from "lucide-react";
import { useState } from "react";

export const StarRating = ({
  rating,
  onRate,
  size = 24,
  interactive = true,
}: {
  rating?: number;
  onRate?: (val: number) => void;
  size?: number;
  interactive?: boolean;
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const safeRating = rating ?? 0;

  const halfWidth = size / 2;
  const style = { width: size, height: size };

  const activeRating = (interactive ? hover : null) ?? safeRating;

  return (
    <div className="flex gap-1" aria-disabled={!interactive} role="img">
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(activeRating);
        const half = !full && activeRating + 0.5 >= i && activeRating < i;

        const leftProps = interactive
          ? {
              onMouseEnter: () => setHover(i - 0.5),
              onMouseLeave: () => setHover(null),
              onClick: () => onRate?.(i - 0.5),
            }
          : { tabIndex: -1 as const };
        const rightProps = interactive
          ? {
              onMouseEnter: () => setHover(i),
              onMouseLeave: () => setHover(null),
              onClick: () => onRate?.(i),
            }
          : { tabIndex: -1 as const };

        const cursorClass = interactive ? "cursor-pointer" : "cursor-default";

        return (
          <div key={i} style={{ ...style }} className="relative">
            <Star
              className="absolute top-0 left-0 fill-gray-200 text-gray-200"
              style={style}
            />

            {half && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: halfWidth, height: size }}
              >
                <Star
                  className="text-yellow-400 fill-yellow-400"
                  style={style}
                />
              </div>
            )}

            {full && (
              <Star
                className="absolute top-0 left-0 text-yellow-400 fill-yellow-400"
                style={style}
              />
            )}

            <div
              className={`absolute top-0 left-0 h-full ${cursorClass}`}
              style={{ width: halfWidth }}
              {...leftProps}
            />
            <div
              className={`absolute top-0 right-0 h-full ${cursorClass}`}
              style={{ width: halfWidth }}
              {...rightProps}
            />
          </div>
        );
      })}
    </div>
  );
};
