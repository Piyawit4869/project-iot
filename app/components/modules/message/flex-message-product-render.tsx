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
      className="mx-auto shrink-0 min-w-[270px] h-[390px] overflow-hidden rounded-[28px] bg-white text-card-foreground border"
    >
      <div
        className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
        style={{
          backgroundColor: "#6F96AE",
          backgroundImage: `url(${(items && items.imageUrl) || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 200,
        }}
      >
        {items?.tagEnabled && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight"
            style={{ backgroundColor: (items && items.tagColor) || "" }}
          >
            {items?.tagText}
          </span>
        )}
      </div>
      <div className="space-y-3 px-5 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold">
              {(items && items.title) || ""}
            </p>
            <p className="text-muted-foreground text-sm">
              {items?.description}
            </p>
          </div>
        </div>

        {items && items.priceEnabled && (
          <p className="text-right text-lg font-semibold">
            {(items && items.currency) || ""}
            {Number((items && items.price) || "").toLocaleString()}
          </p>
        )}
        <div className="text-center">
          {((items && items.ctaPrimaryEnabled) ||
            items.ctaSecondaryEnabled) && (
            <div className="text-center">
              {items && items.ctaPrimaryEnabled && (
                <p className="px-0 text-blue-500">
                  {(items && items.ctaPrimaryText) || "ข้อความป้ายแอ็กชัน"}
                </p>
              )}
              {items && items.ctaSecondaryEnabled && (
                <p className="mt-2 text-sm text-blue-500">
                  {(items && items.ctaSecondaryText) || "ป้ายแอ็กชันรอง"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
