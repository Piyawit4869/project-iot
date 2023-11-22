import { useLoaderData } from "react-router-dom";
import * as API from "../apis";
import { Button, Image, Row, Table, Typography } from "antd";

export async function featuresLoader() {
  try {
    const feature = await API.features.getAll();
    const option = await API.options.getAll();

    return { feature: feature.data, option: option.data };
  } catch (error) {
    return { data: null };
  }
}

export const SettingUtotech = () => {
  const { feature, option } = useLoaderData() as any;

  console.log(feature);

  const featureCol = [
    {
      title: "",
      dataIndex: "imageUrl",
      render: (img: any) => <Image src={img} width={30} preview={false} />,
    },
    {
      title: (
        <Typography style={{ textAlign: "center", color: "white" }}>
          Title
        </Typography>
      ),
      dataIndex: "title",
      render: (text: any, id: any) => (
        <Button type="link" href={`/admin/feature/${id.id}`}>
          {text}
        </Button>
      ),
      align: "left",
    },
    {
      title: (
        <Typography style={{ textAlign: "center", color: "white" }}>
          Subtitle
        </Typography>
      ),
      className: "subtitle",
      dataIndex: "subTitle",
      align: "left",
    },
  ] as any;

  const optionCol = [
    {
      title: "",
      dataIndex: "imageUrl",
      render: (img: any) => <Image src={img} width={30} preview={false} />,
    },
    {
      title: (
        <Typography style={{ textAlign: "center", color: "white" }}>
          Title
        </Typography>
      ),
      dataIndex: "title",
      render: (text: any, id: any) => (
        <Button type="link" href={`/admin/option/${id.id}`}>
          {text}
        </Button>
      ),
      align: "left",
    },
    {
      title: (
        <Typography style={{ textAlign: "center", color: "white" }}>
          Subtitle
        </Typography>
      ),
      className: "subtitle",
      dataIndex: "subTitle",
      align: "left",
    },
  ] as any;

  return (
    <div>
      <Row justify="end" style={{ marginBottom: "20px" }}>
        <Button href="/admin/create/feature">Create</Button>
      </Row>
      <Table columns={featureCol} dataSource={feature} bordered />

      <Row justify="end" style={{ marginBottom: "20px" }}>
        <Button href="/admin/create/option">Create</Button>
      </Row>
      <Table columns={optionCol} dataSource={option} bordered />
    </div>
  );
};
