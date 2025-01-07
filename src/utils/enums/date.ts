import dayjs from 'dayjs';

// ฟังก์ชัน helper สำหรับการตรวจสอบและแปลงวันที่
export const formatDate = (date: string | null | undefined, format: string = 'DD/MM/YYYY HH:mm'): string | null => {
  if (!date || !dayjs(date).isValid()) {
    return null;
  }
  return dayjs(date).format(format);
};
