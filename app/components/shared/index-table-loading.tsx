import { SkeletonLoading } from "./skeleton-loading";

export const IndexLayoutTableLoading = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 p-8 md:flex mt-3">
      <SkeletonLoading
        width="w-full"
        height="h-[70px]"
        shape="line"
        className=""
      />
      <SkeletonLoading className="h-8 w-[150px] lg:w-[250px] mt-8 mb-5" />

      <div className="flex flex-col w-full justify-center gap-2">
        <SkeletonLoading width="w-full" height="h-10" shape="line" />
        <SkeletonLoading width="w-full" height="h-10" shape="line" />
        <SkeletonLoading width="w-full" height="h-10" shape="line" />
        <SkeletonLoading width="w-full" height="h-10" shape="line" />
        <SkeletonLoading width="w-full" height="h-10" shape="line" />
      </div>

      <SkeletonLoading
        width="w-full"
        height="h-10"
        shape="line"
        className="mt-3"
      />
    </div>
  );
};
