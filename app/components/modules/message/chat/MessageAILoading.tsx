import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import LoadingAnimation from "../loading-animation";

export const MessageAILoading = () => {
  return (
    <div className="w-full mt-4 flex justify-end flex-col gap-1 mr-auto items-end">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="w-6 h-6">
          <img
            src={"https://api.dicebear.com/9.x/glass/svg?seed=rome"}
            alt="avatar"
            className="rounded-full object-cover"
          />
          <AvatarFallback>{"U"[0]}</AvatarFallback>
        </Avatar>

        <span className="text-xs text-muted-foreground font-medium">
          ROME AI Assistant
        </span>
      </div>
      <div
        className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap bg-muted text-primary"`}
      >
        <LoadingAnimation />
      </div>
    </div>
  );
};
