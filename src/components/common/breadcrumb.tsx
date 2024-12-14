'use client';

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icon from '@ant-design/icons';

export const Breadcrumb = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <Breadcrumbs
      separator={<Icon.RightOutlined className="text-headFont text-xs" />}
    >
      <BreadcrumbItem>
        <Link href="/">
          <span className="text-headFont">Home</span>
        </Link>
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        return (
          <BreadcrumbItem key={href} isCurrent={isLast}>
            {isLast ? (
              <span className="text-headFont">{segment}</span>
            ) : (
              <Link href={href}>
                <span className="text-headFont">{segment}</span>
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
