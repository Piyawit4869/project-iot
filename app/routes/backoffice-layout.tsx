import { Menu } from "~/components/shared/menu";
import { AppSidebar } from "~/components/shared/sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import data from "~/components/shared/sidebar/data/backoffice-data.json";
import { Outlet, redirect } from "react-router";
import {
  destroySession,
  getAccessToken,
  getUserSession,
  isTokenExpired,
} from "~/services/session.server";
import type { Route } from "./backoffice/settings/+types/setting-layout";
import { HeaderBreadcrumb } from "~/components/shared/header-breadcrumb";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getAccessToken(request);
  const session = await getUserSession(request);

  const isExpired = isTokenExpired(token);

  if (token && isExpired) {
    return redirect("/", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  if (!token) {
    return redirect("/login");
  }

  return null;
}
export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <aside>
          <AppSidebar data={data} />
        </aside>
        <div className="flex flex-1 flex-col w-full relative">
          <main className="flex-1 w-full ">
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-9 shadow p-2 flex items-center justify-between bg-white dark:bg-background">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <HeaderBreadcrumb />
                </div>
                <div className="flex items-center space-x-4">
                  <Menu />
                </div>
              </header>
              <div className="bg-muted/80 dark:bg-background min-h-[calc(100vh-54px)]">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
