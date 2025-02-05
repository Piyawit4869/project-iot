import axios from 'axios';

// ฟังก์ชันสำหรับดึงข้อมูล
export const getEmployeeSummary = async () => {
  const response = await axios.get('/api/employee-summary');
  return response.data;
};

// ตัวอย่างข้อมูลที่ API ส่งกลับมา
export interface EmployeeSummary {
  totalEmployees: number;
  checkedIn: number;
  notCheckedIn: number;
  lateCheckIn: number;
  onLeave: number;
  checkedOut: number;
}
