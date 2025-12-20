import { X } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { Participant } from "~/types/customers/participant";

interface ParticipantAvatarProps {
  participant: Participant;
  isEdit: boolean;
  onDelete?: (id: string) => void;
  navigate: (path: string) => void;
}

export const ParticipantAvatar: React.FC<ParticipantAvatarProps> = (props) => {
  const { participant, isEdit, onDelete, navigate } = props;

  return (
    <div className="relative inline-block">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => navigate(`/users/${participant.id}`)}>
              <GlobalImage
                src={
                  (participant && participant.imageUrl) ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${(participant && participant.displayName) || ""}`
                }
                className="w-[35px] h-[35px] rounded-full object-cover"
                notShowPreview
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {(participant && participant.displayName) || "-"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isEdit && (
        <button
          type="button"
          onClick={() =>
            onDelete &&
            onDelete(
              (participant && participant.user && participant.user.id) || ""
            )
          }
          className="absolute -top-1 -right-1 bg-white border rounded-full p-1 shadow"
        >
          <X className="w-2 h-2 text-gray-600" />
        </button>
      )}
    </div>
  );
};
