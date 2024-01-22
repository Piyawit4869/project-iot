// import { MenuProps, message } from "antd";
import { useLoaderData } from "react-router-dom";
import { ProductsHeader } from "@src/components/product/ProductsHeader";
import { ProductTable } from "@src/components/product/ProductsTable";
import * as API from "@src/apis";
// import { useState } from "react";

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
  const { product } = useLoaderData() as any;
  console.log(product);

  // const [collapsed, setCollapsed] = useState(false);

  // const itemsCurrency: MenuProps["items"] | any = [
  //   {
  //     label: "สินค้า",
  //     key: "สินค้า",
  //   },
  //   {
  //     label: "บริการ",
  //     key: "บริการ",
  //   },
  // ];

  // let [status, setStatus] = useState<string>(itemsCurrency[0].label);
  // const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
  //   setStatus((status = key));
  //   message.info(`เลือกสถาณะ ${key}`);
  // };

  const breadcrumbItem: Array<any> = [
    {
      title: "Product",
    },
  ];

  return (
    <>
      <ProductsHeader breadcrumbItem={breadcrumbItem} />
      <ProductTable />
    </>
  );
};
