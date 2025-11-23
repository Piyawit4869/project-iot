// /chat/components/MessageAvatar.tsx
// import React from "react";
// import { Avatar, AvatarFallback } from "~/components/ui/avatar";

// export default function MessageAvatar({
//   avatarFallback,
//   sender,
// }: {
//   avatarFallback: string;
//   sender: string;
// }) {
//   return (
//     <div className="flex items-center gap-2 mb-1">
//       <Avatar className="w-6 h-6">
//         <img
//           src={avatarFallback || "/avatar.png"}
//           alt="avatar"
//           className="rounded-full object-cover"
//         />
//         <AvatarFallback>{sender[0]}</AvatarFallback>
//       </Avatar>
//       <span className="text-xs text-muted-foreground font-medium">
//         {sender}
//       </span>
//     </div>
//   );
// }

// /chat/components/MessageAvatar.tsx
import React from "react";
import { GlobalImage } from "~/components/shared/global-image";

type MessageAvatarProps = {
  imageUrl?: string | null;
  senderId?: string | null;
  size?: number;
};

export default function MessageAvatar({
  imageUrl,
  senderId,
  size = 38,
}: MessageAvatarProps) {
  const finalUrl =
    imageUrl ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${senderId ?? "user"}`;

  return (
    <GlobalImage
      src={finalUrl}
      alt={senderId || "avatar"}
      className="rounded-full border object-cover"
      notShowPreview
    />
  );
}
