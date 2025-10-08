import { SkeletonLoading } from "~/components/shared/skeleton-loading";

export const HeadSidebarLoading = () => {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonLoading height="h-[32px]" width="w-[32px]" shape="rounded" />

      <div className="space-y-2">
        <SkeletonLoading height="h-4" width="w-[160px]" />
      </div>
    </div>
  );
};
