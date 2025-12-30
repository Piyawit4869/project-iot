export const statusOptions = [
  { label: "ใช้งานอยู่", value: "active" },
  { label: "ทดลองงาน", value: "probation" },
  { label: "ลาหยุดชั่วคราว", value: "on_leave" },
  { label: "ลาออกแล้ว", value: "resigned" },
  { label: "เลิกจ้าง", value: "terminated" },
] as const;

export const religionMap: Record<string, string> = {
  Buddhism: "พุทธศาสนา",
  Christianity: "คริสต์ศาสนา",
  Islam: "อิสลาม",
  Hinduism: "ฮินดู",
  Sikhism: "ซิกข์",
  Judaism: "ยูดาย",
  Taoism: "เต๋า",
  Confucianism: "ขงจื๊อ",
  None: "ไม่มีศาสนา",
  Other: "อื่นๆ",
};

export const currencyMap: Record<string, string> = {
  THB: "บาท",
  USD: "ดอลลาร์",
  EUR: "ยูโร",
  GBP: "ปอนด์",
  JPY: "เยน",
  CNY: "หยวน",
  KRW: "วอน",
  SGD: "ดอลลาร์สิงคโปร์",
  AUD: "ดอลลาร์ออสเตรเลีย",
};

export const contactTypeMap: Record<string, string> = {
  "full-time": "พนักงานประจำ (Full-time)",
  contract: "พนักงานชั่วคราว (Contract)",
  "part-time": "พนักงานรายวัน (Part-time)",
};

export const fileTypeMap: Record<string, string> = {
  resume: "เรซูเม่",
  cv: "CV",
  not_specified: "ใบรับรอง",
  transcript: "ใบแสดงผลการศึกษา",
  id_card: "บัตรประชาชน",
  contract: "สัญญา",
  other: "อื่น ๆ",
};

export const nationalityMap: Record<string, string> = {
  Thai: "ไทย",
  Japanese: "ญี่ปุ่น",
  Chinese: "จีน",
  American: "อเมริกัน",
  British: "อังกฤษ",
  French: "ฝรั่งเศส",
  German: "เยอรมัน",
  Indian: "อินเดีย",
  Korean: "เกาหลี",
  Malaysian: "มาเลเซีย",
  Singaporean: "สิงคโปร์",
  Other: "อื่นๆ",
};
