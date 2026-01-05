import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    dataLayer?: any;
    gtag?: (...args: any[]) => void;
  }
}

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    const pagePath = location.pathname + location.search;

    window.gtag("config", "G-6H2NNQJ75M", {
      page_path: pagePath,
    });

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
    });
  }, [location]);
}

// export const useGoogleAnalytics = (id?: string | undefined) => {
//   const gaMeasurementId = id || "G-6H2NNQJ75M";
//   const [isInitialized, setIsInitialized] = React.useState(false);
//   useEffect(() => {
//     const loadScript = () => {
//       if (!window.gtag) return;

//       // gaMeasurementId is optional so not all devs need it to run the app
//       if (!window.gtag && gaMeasurementId) {
//         // Create the script element
//         const script = document.createElement("script");
//         script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
//         script.async = true;
//         // Append the script to the document
//         document.head.appendChild(script);
//         // Initialize gtag when the script is loaded - this could be done before
//         script.onload = () => {
//           window.dataLayer = window.dataLayer || [];
//           function gtag() {
//             window.dataLayer.push(arguments);
//           }
//           window.gtag = gtag;
//           window.gtag("js", new Date());
//           window.gtag("config", gaMeasurementId, {
//             debug_mode: false, // I keep this here to remember where to toggle debug
//           });
//           // Mark as initialized
//           setIsInitialized(true);
//         };
//       } else {
//         // gtag is already available, mark as initialized
//         setIsInitialized(true);
//       }
//     };
//     loadScript();
//   }, [gaMeasurementId]);
//   return isInitialized;
// };
