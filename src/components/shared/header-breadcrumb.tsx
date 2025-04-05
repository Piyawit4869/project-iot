/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "../ui/breadcrumb";

export const HeaderBreadcrumb = () => {
  const pathname = usePathname() as string;

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb
      separator={<Icons.ChevronRight className="text-headFont text-xs" />}
    >
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        return (
          <BreadcrumbItem key={href}>
            {isLast ? (
              <Link href={href}>
                <span className="text-headFont text-xs">{segment}</span>
              </Link>
            ) : (
              <Link href={href}>
                <span className="text-headFont text-xs">{segment}</span>
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
