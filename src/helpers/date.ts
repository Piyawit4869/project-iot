import dayjs from 'dayjs';

// ฟังก์ชัน helper สำหรับการตรวจสอบและแปลงวันที่
export const formatDate = (
  date: string | null | undefined,
  dateFormat: string = 'DD/MM/YYYY',
  timeFormat: string = 'HH:mm'
): { date: string | null; time: string | null } => {
  if (!date || !dayjs(date).isValid()) {
    return { date: null, time: null };
  }

  const parsedDate = dayjs(date);
  return {
    date: parsedDate.format(dateFormat), // คืนค่าเฉพาะวัน
    time: parsedDate.format(timeFormat), // คืนค่าเฉพาะเวลา
  };
};
