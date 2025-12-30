import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-6H2NNQJ75M", {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
