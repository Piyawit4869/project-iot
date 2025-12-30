import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import { Toaster } from "sonner";

import "./app.css";
import { getAccessToken, getUser } from "./services/session.server";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalModalStatic } from "./components/shared/modal/global-modal-static";
import type { Route } from "./routes/backoffice/customer/+types";
import { RouteProvider } from "./providers/RouteProvider";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ROME Platform</title>

        {/* Google Tag Manager */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T724KX5N');
            `,
          }}
        /> */}
        {/* End Google Tag Manager */}

        <Meta />
        <Links />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T724KX5N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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

  useGoogleAnalytics();

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
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
