"use client";

import React from "react";
import translations from "~/translations/th-breadcamp.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useLocation } from "react-router";
import { useRoute } from "~/providers/RouteProvider";
import { isUUIDv4 } from "~/lib/utils";

export const HeaderBreadcrumb = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const { crumbs } = useRoute();

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const prev = index === pathSegments.length - 2;
          const displayName =
            translations[segment as keyof typeof translations] || segment;
          const showName = crumbs.segments.find((s) => s.uuid === displayName);
          const resultName =
            showName && showName.label ? showName.label : displayName;

          const isUUid = isUUIDv4(resultName as string);

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <BreadcrumbPage>{isUUid ? "" : resultName}</BreadcrumbPage>
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
