// import { useLoaderData } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import * as API from "@src/apis";
import {
  BreadcrumbData,
  GlobalBreadcrumb,
} from "@src/components/global/GlobalBreadcrumb";
import { GlobalIndexHeader } from "@src/components/global/GlobalIndexHeader";
import { GlobalTable } from "@src/components/global/GlobalTable";
import { ThemeColors } from "@src/styles/theme";
import { Button, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { useState } from "react";

interface Datatype {
  title: string;
  description: string;
  quantity: string;
  price: string;
}

export async function productIndexLoader() {
  // const url = new URL(params.request.url);
  // const query = url.searchParams;
  // const param = Object.fromEntries(query);

  try {
    // const search = { ...param, role: "user" };
    const res = await API.product.paginate();

    return { product: res.data };
  } catch (error) {
    return { data: null };
  }
}

export const ProductPage = () => {
  // const { product } = useLoaderData() as any;
  const { t } = useTranslation();
  const columns: TableProps<Datatype>["columns"] = [
    {
      title: t("product and service name"),
      dataIndex: "title",
      key: "title",
      render: (productname: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{productname}</p>
      ),
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
      render: (description: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{description}</p>
      ),
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{quantity}</p>
      ),
    },
    {
      title: t("price"),
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <p style={{ color: ThemeColors.blackColor }}>{price}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "title",
      key: "action",
      render: (title: any) => (
        <Link
          to={`/products/${title}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            icon={<EyeOutlined />}
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t("inspect")}
          </Button>
        </Link>
      ),
    },
  ];
  const dataSource: Datatype[] = [
    {
      title: "Website",
      description: "This is Website",
      quantity: "1",
      price: "2000",
    },
  ];
  const breadcrumbItem: BreadcrumbData[] = [
    {
      title: "Product",
    },
  ];
  return (
    <>
      <GlobalBreadcrumb breadcrumbItems={breadcrumbItem} />
      <GlobalIndexHeader
        title={t("productAndService")}
        titleDescription={t("searchForProductOrService")}
        addItemsButton={t("addProductOrService")}
        link="#"
      />
      <GlobalTable dataSource={dataSource} columns={columns} />
    </>
  );
};
