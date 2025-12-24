import { Clock, Info, MapPin, PhoneCall } from "lucide-react";

interface FlexMessagePlaceRenderProps {
  items: any;
}

export const FlexMessagePlaceRender: React.FC<FlexMessagePlaceRenderProps> = (
  props
) => {
  const { items } = props;

  const ExtraIcon =
    items?.extraInfoType === "time"
      ? Clock
      : items?.extraInfoType === "phone"
        ? PhoneCall
        : Info;

  return (
    <div
      data-card="place"
      className="mx-auto shrink-0  min-w-[270px] h-[430px] overflow-hidden rounded-[28px] bg-white text-card-foreground  "
    >
      <div
        className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
        style={{
          backgroundColor: "#6F96AE",
          backgroundImage: `url(${items?.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 200,
        }}
      >
        {items?.tagEnabled && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight"
            style={{ backgroundColor: items?.tagColor }}
          >
            {items?.tagText}
          </span>
        )}
      </div>
      <div className="space-y-3 px-5 py-6">
        <p className="text-base font-semibold">{items?.title}</p>
        {items?.addressEnabled && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4" />
            <div>
              <p>{items?.addressLabel}</p>
            </div>
          </div>
        )}
        {items?.extraInfoEnabled && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExtraIcon className="mt-0.5 size-4" />
            <p>{items?.extraInfoValue}</p>
          </div>
        )}
        <div className="pt-2 text-center">
          {items?.ctaPrimaryEnabled && (
            <p className="px-0 text-blue-500">
              {items?.ctaPrimaryText || "ใส่ข้อความสำหรับป้ายแอ็กชัน"}
            </p>
          )}
          {items?.ctaSecondaryEnabled && (
            <p className="mt-2 text-sm text-blue-500">
              {items?.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
