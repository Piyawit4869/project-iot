import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import { Toaster } from "sonner";
import React from "react";

import "./app.css";
import { getAccessToken, getUser } from "./services/session.server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalModalStatic } from "./components/shared/modal/global-modal-static";
import type { Route } from "./routes/backoffice/customer/+types";
import { RouteProvider } from "./providers/RouteProvider";
// import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import ReactGA from "react-ga4";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-T724KX5N", // Replace this with your actual GTM ID
};

const TRACKING_ID = "G-D1Q4M27285"; //ogga

// const TRACKING_ID = "G-6H2NNQJ75M"; //rome-dev
// const TRACKING_ID = "G-455DMN03CD"; //rome-local
export async function loader({ request }: Route.LoaderArgs) {
  //TODO:FIX TO NOT PASS ACCESS TOKEN
  const token = await getAccessToken(request);
  const user = await getUser(request);

  const permission = user?.permissions;

  if (user?.id) {
    return { user, token, me: user, permission };
  } else {
    return { user: null, token: null, permission: null };
  }
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/assets/images/rome.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const TrackPageView = () => {
  const location = useLocation();

  React.useEffect(() => {
    const tagManagerArgs = {
      dataLayer: {
        event: "pageview",
        page: location.pathname,
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }, [location]);

  return null;
};

const PageTracking = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Send a pageview hit to Google Analytics whenever the location changes
    // ReactGA.send({
    //   hitType: "add_line",
    //   page: location.pathname + location.search,
    //   title: document.title, // Optionally send the current page title
    // });
    //ZEV_TRACKING
    // ReactGA.event({
    //   category: "line",
    //   label: "add_friend",
    //   action: "add_friend",
    // });
  }, [location]);

  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ROME Platform</title>

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  const { token, user } = useRouteLoaderData("root");

  // useGoogleAnalytics();

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);

    TagManager.initialize(tagManagerArgs);
    ReactGA.initialize(TRACKING_ID);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalModalStatic />
      <Toaster
        position="bottom-right"
        richColors
        expand={false}
        toastOptions={{ className: "font-[IBMPlexSansThai]" }}
      />
      <RouteProvider>
        {/* <TrackPageView />
        <PageTracking /> */}

        <Outlet />
      </RouteProvider>
    </QueryClientProvider>
  );
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
