import { FilterFilled, PlusCircleFilled, TagFilled } from "@ant-design/icons";
import { Button, Flex, Input, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Datatype {
  title: string;
  addItemsButton: string;
  titleDescription: string;
  link: string;
}

export const GlobalIndexHeader = (props: Datatype) => {
  const { Title, Paragraph } = Typography;
  const { t } = useTranslation();
  return (
    <>
      <Flex justify={"space-between"} align={"middle"}>
        <Title level={3} style={{ margin: "0" }}>
          {props.title}
        </Title>
        <Link to={props.link}>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "large",
              color: "#fff",
            }}
            size="large"
            icon={<PlusCircleFilled />}
          >
            {props.addItemsButton}
          </Button>
        </Link>
      </Flex>
      <Paragraph style={{ fontSize: "16px" }}>
        <TagFilled style={{ fontSize: "20px", color: "#d36719" }} />{" "}
        {props.titleDescription}
      </Paragraph>
      <Space>
        <Button
          icon={<FilterFilled style={{ fontSize: "30px" }} />}
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        />
        <Input style={{ width: "16vw" }} size="large" placeholder="ค้นหา...." />
        <Button
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {t("search")}
        </Button>
      </Space>
    </>
  );
};
