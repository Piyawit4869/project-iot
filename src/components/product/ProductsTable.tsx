import { Button, Flex, Pagination, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link /*useLoaderData*/ } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@src/styles/theme";
import { EyeOutlined } from "@ant-design/icons";

interface Datatype {
  key: String;
  productname: String;
  description: String;
  type: String;
  count: number;
  price: String;

  // status: any;
}

export const ProductTable = () => {
  const { t } = useTranslation();
  // const { product } = useLoaderData() as any;
  const columns: ColumnsType<Datatype> = [
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
            ดูข้อมูล
          </Button>
        </Link>
      ),
    },
  ];
  const dataSource: Array<any> = [
    {
      title: "Website",
      description: "This is Website",
      quantity: "1",
      price: "2000",
    },
  ];
  return (
    <Row>
      <Table
        size="middle"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        style={{ marginTop: "15px", textAlign: "center", width: "100%" }}
      />
      <Flex justify="end" style={{ width: "100%" }}>
        <Typography style={{ display: "flex", alignItems: "center" }}>
          ทั้งหมด 30 รายการ
        </Typography>
        <Pagination defaultCurrent={1} defaultPageSize={10} total={30} />
      </Flex>
    </Row>
  );
};
