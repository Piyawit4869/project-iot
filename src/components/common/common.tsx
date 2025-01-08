import { Chip } from '@nextui-org/react';

export enum Status {
  Draft = 'draft',
  Pending = 'pending',
  WaitingForReview = 'waiting_for_review',
  Active = 'active',
  Done = 'done',
  Canceled = 'canceled',
  None = '',
  Delete = 'delete',
}

export enum DocumentStatus {
  Draft = 'draft',
  Pending = 'pending',
  WaitingForReview = 'waiting_for_review',
  Active = 'active',
  Approved = 'approved',
  Rejected = 'rejected',
  Canceled = 'canceled',
  Delete = 'delete',
  None = '',
}

export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export const handleTypeTag = (type: string) => {
  const typeTags: Record<string, { text: string; bg: string }> = {
    invoice: { text: 'ใบแจ้งหนี้', bg: 'bg-yellow-100' },
    quotation: { text: 'ใบเสนอราคา', bg: 'bg-green-100' },
    delivery_order: { text: 'ใบการจัดส่งคำสั่งซื้อ', bg: 'bg-blue-100' },
    purchase_order: { text: 'ใบสั่งซื้อ', bg: 'bg-purple-100' },
    receipt: { text: 'ใบเสร็จรับเงิน', bg: 'bg-red-100' },
  };

  if (!typeTags[type]) return null;

  return (
    <Chip
      style={{ width: 'auto', minWidth: '80px' }}
      className={`px-3 py-1 rounded-full text-sm font-medium ${typeTags[type].bg} text-yellow-700 border border-gray`}
    >
      {typeTags[type].text}
    </Chip>
  );
};

export const handleStatusTag = (status: string) => {
  const statusTags: Record<Status, { text: string; bg: string }> = {
    [Status.Draft]: { text: 'แบบร่าง', bg: 'bg-gray-100' },
    [Status.Pending]: { text: 'รอดำเนินการ', bg: 'bg-yellow-100' },
    [Status.WaitingForReview]: { text: 'รอการตรวจสอบ', bg: 'bg-blue-100' },
    [Status.Active]: { text: 'ใช้งานอยู่', bg: 'bg-green-100' },
    [Status.Done]: { text: 'เสร็จสิ้น', bg: 'bg-purple-100' },
    [Status.Canceled]: { text: 'ยกเลิก', bg: 'bg-red-100' },
    [Status.None]: { text: '-', bg: 'bg-gray-100' },
    [Status.Delete]: { text: 'ลบแล้ว', bg: 'bg-red-300' },
  };

  if (!statusTags[status as Status]) return null;

  return (
    <Chip
      style={{ width: 'auto', minWidth: '80px' }}
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        statusTags[status as Status].bg
      } text-yellow-700 border border-gray`}
    >
      {statusTags[status as Status].text}
    </Chip>
  );
};

export const handleDocumentStatusTag = (status: string) => {
  const documentStatusTags: Record<
    DocumentStatus,
    { text: string; bg: string }
  > = {
    [DocumentStatus.Draft]: { text: 'แบบร่าง', bg: 'bg-gray-100' },
    [DocumentStatus.Pending]: { text: 'รอดำเนินการ', bg: 'bg-yellow-100' },
    [DocumentStatus.WaitingForReview]: {
      text: 'รอการตรวจสอบ',
      bg: 'bg-blue-100',
    },
    [DocumentStatus.Active]: { text: 'ใช้งานอยู่', bg: 'bg-green-100' },
    [DocumentStatus.Approved]: { text: 'อนุมัติ', bg: 'bg-green-200' },
    [DocumentStatus.Rejected]: { text: 'ปฏิเสธ', bg: 'bg-red-100' },
    [DocumentStatus.Canceled]: { text: 'ยกเลิก', bg: 'bg-red-100' },
    [DocumentStatus.None]: { text: '-', bg: 'bg-gray-100' },
    [DocumentStatus.Delete]: { text: 'ลบแล้ว', bg: 'bg-red-300' },
  };

  if (!documentStatusTags[status as DocumentStatus]) return null;

  return (
    <Chip
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        documentStatusTags[status as DocumentStatus].bg
      } text-yellow-700 border border-gray`}
    >
      {documentStatusTags[status as DocumentStatus].text}
    </Chip>
  );
};

export const handlePriority = (priority: string) => {
  const priorityTags: Record<Priority, { text: string; bg: string }> = {
    high: { text: 'High', bg: 'bg-gray-100' },
    medium: { text: 'Medium', bg: 'bg-yellow-100' },
    low: { text: 'Low', bg: 'bg-blue-100' },
  };

  if (!priorityTags[priority as Priority]) return null;

  return (
    <Chip
      style={{ width: 'auto', minWidth: '80px' }}
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        priorityTags[priority as Priority].bg
      } text-yellow-700 border border-gray`}
    >
      {priorityTags[priority as Priority].text}
    </Chip>
  );
};
