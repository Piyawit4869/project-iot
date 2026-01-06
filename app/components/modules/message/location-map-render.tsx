import React from "react";

export const LocationMap = React.memo(
  ({ latitude, longitude }: { latitude?: number; longitude?: number }) => {
    const mapUrl = React.useMemo(
      () =>
        `https://www.google.com/maps?q=${latitude ?? ""},${longitude ?? ""}&z=17`,
      [latitude, longitude]
    );

    React.useEffect(() => {
      const t = setTimeout(() => {
        window.dispatchEvent(new Event("chat-media-loaded"));
      }, 0);

      return () => clearTimeout(t);
    }, []);

    return (
      <div className="h-[150px] w-full rounded-xl overflow-hidden border">
        <iframe
          src={`${mapUrl}&output=embed`}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ pointerEvents: "none" }}
        />
      </div>
    );
  }
);
