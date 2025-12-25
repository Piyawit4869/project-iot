import { UserRound } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";

interface FlexMessagePersonRenderProps {
  items: any;
}

export const FlexMessagePersonRender: React.FC<FlexMessagePersonRenderProps> = (
  props
) => {
  const { items } = props;

  return (
    <div
      data-card="profile"
      className="
        snap-center
        shrink-0
        w-[330px]
        h-[480px]
        rounded-[24px]
        bg-white
        p-6
        text-center
      "
    >
      <div className="mx-auto mb-4  rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
        {items && items.imageUrl ? (
          <GlobalImage
            src={items.imageUrl}
            alt={items.name}
            className="h-[220px] w-full object-cover"
            width={330}
            notShowPreview
          />
        ) : (
          <UserRound className="size-10 text-muted-foreground" />
        )}
      </div>

      <p className="text-base font-semibold">{items.name}</p>

      {items && items.tags && items.tags.some((t: any) => t.enabled) && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {items.tags
            .filter((tag: any) => tag.enabled && tag.text?.trim())
            .map((tag: any, idx: number) => (
              <span
                key={`${tag.text}-${idx}`}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.text}
              </span>
            ))}
        </div>
      )}

      {items && items.descriptionEnabled && items.description && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {items.description}
        </p>
      )}

      {items &&
        items.actions &&
        items.actions.some((a: any) => a.enabled && a.text) && (
          <div className="mt-4 space-y-2">
            {items.actions
              .filter((a: any) => a.enabled && a.text)
              .map((action: any, idx: number) => (
                <button
                  key={idx}
                  className="w-full rounded-xl border border-blue-500 px-3 py-2 text-sm text-blue-500"
                >
                  {action.text || "ดูเพิ่มเติม"}
                </button>
              ))}
          </div>
        )}
    </div>
  );
};
