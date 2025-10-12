interface CustomerChatSkeletonProps {
  chatLine?: number;
}

export const CustomerChatSkeleton: React.FC<CustomerChatSkeletonProps> = (
  props
) => {
  const { chatLine = 5 } = props;

  return (
    <div className="flex flex-col h-full items-center justify-center gap-4 px-4">
      {Array.from({ length: chatLine }).map((_, i) => (
        <div
          key={i}
          className={`flex max-w-[75%] flex-col gap-1 ${
            i % 2 === 0 ? "ml-auto items-end" : "mr-auto items-start"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="rounded-xl bg-gray-200 px-4 py-3 animate-pulse h-6 w-[200px]" />
        </div>
      ))}
    </div>
  );
};
