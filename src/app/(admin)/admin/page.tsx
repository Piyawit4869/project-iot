'use client';

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Link,
} from '@nextui-org/react';

export default function HomeAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          ยินดีต้อนรับสู่ ROME!
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
          จัดการการเข้างาน บันทึกข้อมูล
          และจัดการเวิร์กโฟลว์ของคุณได้อย่างง่ายดาย
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {/* Feature 1: Attendance Management */}
        <FeatureCard
          title="กิจกรรมการทำงาน"
          description="ตรวจสอบการเข้างานของพนักงานและทีมแบบเรียลไทม์ พร้อมบันทึกข้อมูลอย่างละเอียด 
          เพื่อให้แน่ใจว่ามีความโปร่งใสและความรับผิดชอบ"
          icon="📅"
          color="primary"
          link="/admin/attendance"
        />

        {/* Feature 2: Notation Management */}
        <FeatureCard
          title="เอกสาร"
          description="สร้าง จัดการ และทำงานร่วมกันในเอกสารได้อย่างง่ายดาย 
          จัดเก็บทุกอย่างให้เป็นระเบียบและเข้าถึงได้ในที่เดียว"
          icon="📝"
          color="success"
          link="/admin/notation"
        />

        {/* Feature 3: Reports & Analytics */}
        <FeatureCard
          title="การบัญชี"
          description="จัดการบันทึกทางการเงิน ตรวจสอบค่าใช้จ่าย 
          และสร้างรายงานเพื่อรักษาความถูกต้องของบัญชีของธุรกิจคุณ"
          icon="💰"
          color="warning"
          link="/admin/accounting"
        />
      </div>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({
  title,
  description,
  icon,
  color,
  link,
}: {
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
  link: string;
}) {
  return (
    <Link href={link}>
      <Card
        isPressable
        shadow="md"
        className="transition-transform transform hover:scale-105 duration-300"
      >
        <CardHeader className="flex flex-col items-center gap-2">
          <div
            className={`text-4xl p-4 rounded-full bg-${color}-200 text-${color}-700`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-gray-600 text-center">{description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
