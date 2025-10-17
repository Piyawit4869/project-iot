import { useState, useEffect } from "react";
import { SkeletonLoading } from "./skeleton-loading"; // your own skeleton
import { useLocation } from "react-router";

export default function RouteLoader() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // start loading when pathname changes

    const timeout = setTimeout(() => {
      setIsLoading(false); // stop loading after short delay
    }, 500); // adjust this to match your page speed

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[9999]">
      <SkeletonLoading
        width="w-[800px]"
        height="h-[800px]"
        className="bg-amber-900"
      />
    </div>
  );
}
