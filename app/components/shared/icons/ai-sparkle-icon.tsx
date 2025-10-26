import { Sparkles } from "lucide-react";

export function AiSparkleIcon() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="absolute w-6 h-6 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 blur-md opacity-50 animate-pulse"></div>

      <Sparkles className="w-5 h-5" />
    </div>
  );
}
