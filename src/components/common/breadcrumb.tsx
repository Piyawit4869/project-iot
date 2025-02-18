'use client';

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icon from '@ant-design/icons';

const translations: Record<string, string> = {
  admin: 'แอดมิน',
  dashboard: 'แดชบอร์ด',
  setting: 'ตั้งค่า',
  user: 'พนักงาน',
  profile: 'โปรไฟล์',
  organization: 'การตั้งค่าองค์กร',
  accounting: 'บัญชี',
  statement: 'ภาพรวม',
  revenue: 'รายได้',
  expenses: 'รายจ่าย',
  analysis: 'วิเคราะห์',
  attendance: 'กิจกรรมการทำงาน',
  overview: 'ภาพรวมการเข้าทำงาน',
  'work-infomation': 'ข้อมูลการทำงาน',
  whitelist: 'การเข้าใช้งาน',
  notation: 'เอกสาร',
  role: 'ตำแหน่ง',
  customer: 'ลูกค้า',
  create: 'สร้าง',
  item: 'สินค้าและรายการ',
  template: 'รูปแบบเอกสาร',
  new: 'สร้าง',
  employeeRole: 'ตำแหน่งพนักงาน',
  backoffice: 'หลังบ้าน',
  manageUsers: 'จัดการผู้ใช้งาน',
};

const translateSegment = (segment: string): string => {
  return translations[segment] || segment;
};

interface BreadcrumbProps {
  title?: string;
}

export const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const pathname = usePathname() as string;

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter((segment) => segment);
  return (
    <div className="flex justify-center items-center">
      <Breadcrumbs
        separator={<Icon.RightOutlined className="text-xs items-center" />}
      >
        <BreadcrumbItem>
          <Link href="/backoffice">
            <span className="text-headFont hover:text-accent1 text-xs">
              ภาพรวม
            </span>
          </Link>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const isUUID = /^[0-9a-fA-F-]{36}$/.test(segment);
          // const translatedSegment = translateSegment(segment);
          const translatedSegment = isUUID
            ? title || 'กำลังโหลด...'
            : translateSegment(segment);
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <Link href={href}>
                  <span className="text-accent1 text-headFont-accent1 text-xs  ">
                    {translatedSegment}
                  </span>
                </Link>
              ) : (
                <Link href={href}>
                  <span className="text-headFont hover:text-accent1 text-xs">
                    {translatedSegment}
                  </span>
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
