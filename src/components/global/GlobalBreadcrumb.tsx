import { Breadcrumb } from "antd";

export type BreadcrumbData = {
  title: string;
  path?: string;
  href?: string;
};

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
