interface LoadingAnimationProps {
  text?: string;
}

function LoadingAnimation({ text = "AI กำลังตอบ" }: LoadingAnimationProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">{text}</span>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
}

export default LoadingAnimation;
