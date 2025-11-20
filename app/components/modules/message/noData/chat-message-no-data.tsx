import { Settings2 } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import NoChatDetail from "./no-chatdata";

export const ChatMessageNoData = ({
  handleShowChatList,
  handleShowCustomerInfoOpen,
}: {
  handleShowChatList: () => void;
  handleShowCustomerInfoOpen: () => void;
}) => {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
        <div className="flex items-center justify-between border-b px-4 py-2 dark:bg-background">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShowChatList}
              className="hidden md:flex"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Rome Chat AI</h2>
          </div>

          {/* <Button
            variant="ghost"
            size="icon"
            onClick={handleShowCustomerInfoOpen}
            className="hidden md:flex"
          >
            <Settings2 className="h-4 w-4" />
          </Button> */}
        </div>
        <NoChatDetail />
      </div>
    </React.Fragment>
  );
};
