import { FilterFilled, PlusCircleFilled, TagFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Flex, Input, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const ProductsHeader = (props: any) => {
  const { Title, Paragraph } = Typography;
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb items={props.breadcrumbItem} />
      <Flex justify={"space-between"} align={"middle"}>
        <Title level={3} style={{ margin: "0" }}>
          {t("product and service name")}
        </Title>
        <Link to={"/product/new"}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "large",
              color: "#fff",
              padding: "18px 20px",
            }}
            icon={<PlusCircleFilled />}
          >
            เพิ่มสินค้า/บริการ
          </Button>
        </Link>
      </Flex>
      <Paragraph style={{ fontSize: "16px" }}>
        <TagFilled style={{ fontSize: "20px", color: "#d36719" }} />{" "}
        ค้นหาสินค้าและบริการ
      </Paragraph>
      <Space>
        <Button
          icon={<FilterFilled style={{ fontSize: "30px" }} />}
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            color: "#fff",
          }}
        />
        <Input style={{ width: "16vw" }} size="large" placeholder="ค้นหา...." />
        <Button
          size="large"
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          ค้นหา
        </Button>
      </Space>
    </>
  );
};
