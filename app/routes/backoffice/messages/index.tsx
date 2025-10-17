import MessagesContainer from "~/components/modules/message/messages-container";
import { ChatRoomProvider } from "~/providers/chat/useChatRoom";
import { env } from "~/utils/common/env";
// import type { Route } from "../messages/+types";
// import { getAccessToken } from "~/services/session.server";
import { useLoaderData } from "react-router";
// import { getLineCardMessagePaginate } from "~/api/server/message/line";

// export async function loader({ request }: Route.LoaderArgs) {
//   const token = await getAccessToken(request);
//   try {
//     const { data } = await getLineCardMessagePaginate(token ?? "");

//     return { data };
//   } catch (e) {
//     return { data: null };
//   }
// }

export default function MessagePage() {
  const { data } = useLoaderData();

  const apiSocket = env.PUBLIC_API_URL;

  return (
    <ChatRoomProvider>
      <MessagesContainer api={apiSocket} />
    </ChatRoomProvider>
  );
}
