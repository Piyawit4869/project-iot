// /chat/components/MessageList.tsx
import React from "react";
import MessageItem from "./MessageItem";
import MessageGroupDate from "./MessageGroupDate";

export default function MessageList({
  messages,
  messageRefs,
  isBackoffice,
  audio,
}: any) {
  let lastDate: string | null = null;

  return (
    <>
      {messages.map((msg: any, index: number) => {
        const currentDate = msg.createdAt.split("T")[0];

        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <React.Fragment key={msg.id}>
            {showDate && <MessageGroupDate date={msg.createdAt} />}

            <div ref={(el: any) => (messageRefs.current[msg.id] = el)}>
              <MessageItem
                msg={msg}
                isBackoffice={isBackoffice}
                audio={audio}
              />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}
