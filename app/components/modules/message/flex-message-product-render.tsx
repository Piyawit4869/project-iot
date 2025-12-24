interface FlexMessageProductRenderProps {
  items: any;
}

export const FlexMessageProductRender: React.FC<
  FlexMessageProductRenderProps
> = (props) => {
  const { items } = props;

  return (
    <div
      data-card="product"
      className="mx-auto shrink-0 min-w-[270px] h-[370px] overflow-hidden rounded-[28px] bg-white text-card-foreground  "
    >
      <div
        className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
        style={{
          backgroundColor: "#6F96AE",
          backgroundImage: `url(${items?.imageUrl})`,
          backgroundSize: "cover", // ให้ภาพเต็ม div
          backgroundPosition: "center", // จัดตำแหน่งกลาง
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold">{items?.title}</p>
            <p className="text-muted-foreground text-sm">
              {items?.description}
            </p>
          </div>
        </div>
        {/* <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p> */}
        {items?.priceEnabled && (
          <p className="text-right text-lg font-semibold">
            {items?.currency}
            {items?.price}
          </p>
        )}
        <div className="pt-2 text-center">
          {(items?.ctaPrimaryEnabled || items?.ctaSecondaryEnabled) && (
            <div className="pt-2 text-center">
              {items?.ctaPrimaryEnabled && (
                <p className="px-0 text-blue-500">
                  {items?.ctaPrimaryText || "ข้อความป้ายแอ็กชัน"}
                </p>
              )}
              {items?.ctaSecondaryEnabled && (
                <p className="mt-2 text-sm text-blue-500">
                  {items?.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
