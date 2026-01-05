import StatusToolbar from "../status-toolbar";

interface MessageHeaderProps {
  chatRoomDetail: any;
  total: number;
  onSearchClick: (messageId: string) => void;
}

export const MessageHeader = ({
  chatRoomDetail,
  total,
  onSearchClick,
}: MessageHeaderProps) => {
  return (
    <div className="items-center justify-between gap-4 p-2 border-b bg-white dark:bg-background">
      <div className="hidden xl:block">
        <StatusToolbar
          chatRoomDetail={chatRoomDetail}
          total={total}
          onSearchClick={onSearchClick}
        />
      </div>
    </div>
  );
};
