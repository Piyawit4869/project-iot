'use client';

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icon from '@ant-design/icons';

const translations: Record<string, string> = {
  admin: 'แอดมิน',
  dashboard: 'แดชบอร์ด',
  settings: 'การตั้งค่า',
  users: 'ผู้ใช้งาน',
  profile: 'โปรไฟล์',
};

const translateSegment = (segment: string): string => {
  return translations[segment] || segment;
};

export const Breadcrumb = () => {
  const pathname = usePathname() as string;

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <Breadcrumbs
      separator={<Icon.RightOutlined className="text-headFont text-xs" />}
    >
      <BreadcrumbItem>
        <Link href="/admin">
          <span className="text-headFont text-xs">หน้าแรก</span>
        </Link>
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const translatedSegment = translateSegment(segment);
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        return (
          <BreadcrumbItem key={href} isCurrent={isLast}>
            {isLast ? (
              <span className="text-headFont text-xs">{translatedSegment}</span>
            ) : (
              <Link href={href}>
                <span className="text-headFont text-xs">
                  {translatedSegment}
                </span>
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
