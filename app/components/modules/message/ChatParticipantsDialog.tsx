import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { GlobalImage } from "~/components/shared/global-image";

export default function ChatParticipantsDialog({
  open,
  onOpenChange,
  participants,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>รายชื่อผู้เข้าร่วม</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto space-y-3 mt-4">
          {participants.map((par: any) => (
            <div key={par.participantId} className="flex items-center gap-3">
              <GlobalImage
                src={
                  par.imageUrl ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${par.participantId}`
                }
                alt={`p-${par.participantId}`}
                className="w-[45px] h-[45px] rounded-full object-cover border"
                notShowPreview
              />
              <div className="flex flex-col">
                <span className="font-medium">
                  {par?.displayName || "ไม่ทราบชื่อ"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
