import { fetchMe } from "@/actions/user/server/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function BackofficePage() {
  const me = await fetchMe();

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  animate-pulse" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-40 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded" />
              <Skeleton className="h-4 w-32 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded" />
            </div>
          </div>
        }
      >
        <div>{me.userName ?? "no name"}</div>
      </Suspense>
      Backoffice
    </>
  );
}
