import { z } from "zod";

export const askQuestionSchema = z.object({
  message: z.string(),
  imagesUrl: z.array(z.string()).optional(),
});

export type AskQuestionValues = z.infer<typeof askQuestionSchema>;

export const pushMessageSchema = z.object({
  chatRoomId: z.string(),
  lineSubId: z.string().optional(),
  message: z.string(),
  messageType: z.string(),
  isAiReply: z.boolean(),
  recipient: z.string().optional(),
  customerId: z.string().optional(),
  platform: z.string(),
  messageLabel: z.string(),
  thumbnailUrl: z.string().optional(),
});

export type PushMessageValues = z.infer<typeof pushMessageSchema>;

export const chatRoomSchema = z.object({
  id: z.string().uuid(),
  active: z.boolean(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  status: z.string(),
  customerId: z.string().uuid(),
  branchId: z.string().uuid(),
  customer: z.object({
    lineSubId: z.string().optional(),
    id: z.string().uuid(),
    imageUrl: z.string().nullable(),
    fullName: z.string(),
  }),

  users: z.array(
    z
      .object({
        id: z.string().uuid(),
        imageUrl: z.string(),
        fullName: z.string(),
        employeeRoleName: z.string(),
      })
      .optional()
  ),
  latestMessage: z.object({
    id: z.string().uuid(),
    message: z.string(),
    createdAt: z.string().datetime(),
  }),
});

export type ChatRoomSchemaType = z.infer<typeof chatRoomSchema>;

export const chatMessageSchema = z.object({
  chatRoomId: z.string(),
  message: z.string(),
  lineSubId: z.string().optional(),
  status: z.string().optional(), // only present in first item
  sender: z.string().optional(),
  recipient: z.string().optional(),
  isAiReply: z.boolean().optional(),
  platform: z.enum(["LINE", "DIRECT", "OTHER"]).optional(),
  customerId: z.string().optional(),
  imageUrl: z.string().optional(),
  userId: z.string().optional(),
  timestamp: z.string().datetime(),
});

export type ChatMessageSchemaType = z.infer<typeof chatMessageSchema>;

export interface UpdateStatusProgressTagPayLoad {
  isProcess: boolean;
  done: boolean;
}
