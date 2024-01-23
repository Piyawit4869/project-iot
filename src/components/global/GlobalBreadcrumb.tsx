import { Breadcrumb } from "antd";

/**
 * this component is a box of title
 * @param title
 * @param path optional
 * @param href optional
 */

export interface BreadcrumbData {
  title: string;
  path?: string;
  href?: string;
}

interface DataType {
  breadcrumbItems: BreadcrumbData[];
}

export const GlobalBreadcrumb = (props: DataType) => {
  return (
    <>
      <Breadcrumb items={props.breadcrumbItems} />
    </>
  );
};
