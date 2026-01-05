import type { Participant } from "~/types/customers/participant";
import { ParticipantAvatar } from "./participant-avatar";
import { AddParticipantPopover } from "./add-participan-popover";

interface ParticipantsSectionProps {
  title: string;
  participants: Participant[];
  isEdit: boolean;
  isMain?: boolean;
  mainParticipant?: Participant;
  onDelete?: (id: string) => void;
  onAdd?: (userId: string, isMain: boolean) => void;
  navigate: (path: string) => void;
  isPopoverOpen?: boolean;
  setIsPopoverOpen?: (v: boolean) => void;
  search?: string;
  setSearch?: (v: string) => void;
  users?: any[];
  filteredUser?: any[];
  supportedUserIds?: Set<string>;
  isLoading?: boolean;
  isFetching?: boolean;
  isCreatingSupport?: boolean;
}

export const ParticipantsSection: React.FC<ParticipantsSectionProps> = (
  props
) => {
  const {
    title,
    participants,
    isEdit,
    isMain,
    mainParticipant,
    onDelete,
    onAdd,
    navigate,
    isPopoverOpen,
    setIsPopoverOpen,
    search,
    setSearch,
    filteredUser,
    supportedUserIds,
    isLoading,
    isFetching,
    isCreatingSupport,
  } = props;

  const list = isMain
    ? mainParticipant
      ? [mainParticipant]
      : []
    : participants;

  return (
    <div className="flex flex-col w-full">
      <span className="text-sm">{title ?? ""}</span>

      <div className="flex flex-wrap gap-2 mt-2">
        {list && list.length > 0
          ? list.map((p) => (
              <ParticipantAvatar
                key={p.id}
                participant={p}
                isEdit={isEdit}
                onDelete={onDelete}
                navigate={navigate}
              />
            ))
          : !isEdit && (
              <span className="text-sm text-gray-400">ยังไม่ได้เลือก</span>
            )}

        {isEdit && (!isMain || !mainParticipant) && (
          <AddParticipantPopover
            open={isPopoverOpen}
            setOpen={setIsPopoverOpen}
            search={search}
            setSearch={setSearch}
            filteredUser={filteredUser}
            supportedUserIds={supportedUserIds}
            isLoading={isLoading}
            isFetching={isFetching}
            disabled={isCreatingSupport}
            onSelect={(id: string) => onAdd && onAdd(id, !!isMain)}
          />
        )}
      </div>
    </div>
  );
};
