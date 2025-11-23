import React from "react";
import { Button } from "~/components/ui/button";
import { Settings2 } from "lucide-react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalImage } from "~/components/shared/global-image";

const LIMIT = 5;

export default function ChatHeader({
  isLoading,
  isLineGroup,
  selectedRoom,
  customerSingle,
  participants,
  onShowSettings,
  onShowAllParticipants,
  onOpenDrawer,
}: any) {
  const firstSeven = participants.slice(0, LIMIT);
  const extraCount = participants.length - LIMIT;
  const displayName =
    customerSingle?.profile?.name ?? customerSingle?.profile?.lineName;

  return (
    <div className="flex items-center border-b px-4 py-2 dark:bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={onShowSettings}
        className="hidden md:flex"
      >
        <Settings2 className="h-4 w-4" />
      </Button>

      <div className="flex items-center w-full gap-2 h-[36px] justify-between">
        {isLoading ? (
          <SkeletonLoading className="w-[200px] h-[20px]" />
        ) : (
          <div className="flex items-center gap-4">
            {!isLineGroup && (
              <h2 className="text-lg font-semibold">{displayName}</h2>
            )}

            {isLineGroup && (
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">{selectedRoom.name}</h2>

                <div className="flex flex-wrap gap-2 items-center">
                  {firstSeven.map((par: any) => (
                    <button key={par.participantId}>
                      <GlobalImage
                        src={
                          par.imageUrl ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${par.participantId}`
                        }
                        alt={`p-${par.participantId}`}
                        className="w-[35px] h-[35px] rounded-full object-cover border-2"
                        notShowPreview
                      />
                    </button>
                  ))}

                  {participants.length > LIMIT && (
                    <button
                      onClick={onShowAllParticipants}
                      className="w-[35px] h-[35px] rounded-full bg-gray-200 text-gray-700 
                      flex items-center justify-center text-sm font-semibold"
                    >
                      +{extraCount}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenDrawer}
          className="flex md:hidden"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
