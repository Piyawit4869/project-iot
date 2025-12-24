import { GlobalImage } from "~/components/shared/global-image";

interface FlexMessageImageRenderProps {
  items: any;
}

export const FlexMessageImageRender: React.FC<FlexMessageImageRenderProps> = (
  props
) => {
  const { items } = props;

  return (
    <div
      data-card="image"
      className="mx-auto w-[300px] shrink-0  overflow-hidden rounded-[28px] bg-white text-card-foreground  "
    >
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        {items?.imageUrl ? (
          <GlobalImage
            src={items?.imageUrl}
            alt="ภาพตัวอย่างการ์ด"
            className="h-full w-full object-cover "
            notShowPreview
          />
        ) : (
          <div className="flex h-44 items-center justify-center text-muted-foreground">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              role="img"
              aria-label="placeholder"
              className="h-12 w-12"
            >
              <path
                d="M8 12a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0 8 8 6-4 8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {items?.tagEnabled && (
          <span
            className="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-white"
            style={{ backgroundColor: items?.tagColor || "#4B5D73" }}
          >
            {items?.tagText}
          </span>
        )}

        {items?.actionEnabled && (
          <div className="absolute bottom-3 left-1/2 w-[85%] -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-center text-[12px] text-white">
            {items?.actionText}
          </div>
        )}
      </div>
    </div>
  );
};
