// types.ts

export interface ChatMessage {
  id: string;
  sender: string;
  platform: string;
  imageUrl?: string;
  createdAt?: string;
  timestamp?: string;
  messageLabel?: string;
  chatRoomId: string;
  text?: string;
}

export interface PaginatedPage {
  items: ChatMessage[];
  meta: {
    next?: boolean;
    prev?: boolean;
  };
}
