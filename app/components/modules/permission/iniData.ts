export const permissions = [
  { name: "หน้าแรก" },
  { name: "แชท" },
  { name: "ออเดอร์" },
  { name: "ลูกค้า" },
  {
    name: "สินค้า และ บริการ",
    children: [
      "คลังสินค้า",
      "หมวดหมู่สินค้า",
      "สินค้า",
      "วัสดุสินค้า",
      "คุณสมบัติสินค้า",
      "ตัวเลือกเพิ่มเติม",
    ],
  },
  { name: "โครงการ" },
  { name: "เอกสาร", children: ["แม่แบบ"] },
  {
    name: "พนักงาน",
    children: [
      "ตำแหน่ง",
      "หน้าที่ของพนักงาน",
      "การเข้างาน",
      "การอนุมัติ",
      "รายชื่อที่อนุญาต",
      "ข้อมูลการทำงาน",
    ],
  },
  {
    name: "การตั้งค่า",
    children: [
      "องค์กร",
      "แผนก",
      "ที่อยู่ติดต่อ",
      "การตั้งค่าผู้ช่วย",
      "การตั้งค่าอื่นๆ",
      "จัดการบทบาท",
    ],
  },
];

export const actions = [
  "ดู",
  "สร้าง",
  "อัพเดท",
  "ยกเลิก",
  "ลบ",
  "ยอมรับ",
  "ปฎิเสธ",
  "นำออก",
  "จัดการ",
];

export enum PermissionAction {
  VIEW = "view",
  CREATE = "create",
  UPDATE = "update",
  CANCEL = "cancel",
  DELETE = "delete",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPORT = "export",
  MANAGE = "manage",
}

export const PermissionActionLabel: Record<PermissionAction, string> = {
  [PermissionAction.VIEW]: "ดู",
  [PermissionAction.CREATE]: "สร้าง",
  [PermissionAction.UPDATE]: "อัพเดท",
  [PermissionAction.CANCEL]: "ยกเลิก",
  [PermissionAction.DELETE]: "ลบ",
  [PermissionAction.APPROVED]: "อนุมัติ",
  [PermissionAction.REJECTED]: "ปฏิเสธ",
  [PermissionAction.EXPORT]: "นำออก",
  [PermissionAction.MANAGE]: "จัดการ",
};

export const dummyUsers = [
  {
    id: "u1",
    firstName: "Alice",
    lastName: "Wong",
    description: "Developer",
    photoUrl: "/img/default-avatar.png",
  },
  {
    id: "u2",
    firstName: "Bob",
    lastName: "Tan",
    description: "Senior Developer",
    photoUrl: "/img/default-avatar.png",
  },
  {
    id: "u3",
    firstName: "Charlie",
    lastName: "Ng",
    description: "Senior Developer",
    photoUrl: "/img/default-avatar.png",
  },
  {
    id: "u4",
    firstName: "Charlieไฟหกฟหก",
    lastName: "Ng",
    description: "Senior Developer",
    photoUrl: "/img/default-avatar.png",
  },
  {
    id: "u5",
    firstName: "Charlieฟห",
    lastName: "Ng",
    description: "Senior Developer",
    photoUrl: "/img/default-avatar.png",
  },
  {
    id: "u6",
    firstName: "Charliefsd",
    lastName: "Ng",
    description: "Senior Developer",
    photoUrl: "/img/default-avatar.png",
  },
];

export const dataPermission = {
  id: "u1",
  firstName: "Alice",
  lastName: "Wong",
  description: "Developer",
  photoUrl: "/img/default-avatar.png",
  status: true,
};
