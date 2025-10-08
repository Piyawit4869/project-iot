"use client";

import React from "react";
import { usePathname } from "next/navigation";
import translations from "../../../transtate/th-breadcamp.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useRoute } from "@/providers/RouteProvider";

export const HeaderBreadcrumb = () => {
  const pathname = usePathname() as string;
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const { crumbs } = useRoute();

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const displayName =
            translations[segment as keyof typeof translations] || segment;
          const showName = crumbs.segments.find((s) => s.uuid === displayName);
          const resultName =
            showName && showName.label ? showName.label : displayName;

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <BreadcrumbPage>{resultName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{resultName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export { Breadcrumb };
