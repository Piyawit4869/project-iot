
interface SkeletonLoadingProps {
  width?: string;
  height?: string;
  shape?: "rounded" | "line";
  className?: string;
}

export const ChatbotSideBarSettingsSkeleton: React.FC<SkeletonLoadingProps> = () => {
  return (
    <div className="w-full">
      <div className="space-y-6 pr-6 pt-4 animate-pulse">
        {/* Switch: active */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-6 w-10 rounded-full bg-muted" />
        </div>

        {/* Input: name */}
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>

        {/* Textarea: systemInstructions */}
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-[200px] w-full rounded bg-muted" />
        </div>

        {/* Switch: useStock */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-6 w-10 rounded-full bg-muted" />
        </div>

        {/* Switch: consentPii */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-36 rounded bg-muted" />
          <div className="h-6 w-10 rounded-full bg-muted" />
        </div>

        {/* Slider: temperature */}
        <div className="space-y-3">
          <div className="h-4 w-64 rounded bg-muted" />
          <div className="h-2 w-full rounded bg-muted" />
        </div>

        {/* Slider: topP */}
        <div className="space-y-3">
          <div className="h-4 w-64 rounded bg-muted" />
          <div className="h-2 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};
