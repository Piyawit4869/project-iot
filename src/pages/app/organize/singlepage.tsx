import { DynamicForm } from "@src/forms";


import { Link, useLoaderData, useSubmit } from "react-router-dom";
import {  Form, Button, Col, Input, Row, Table } from "antd";
import {
  
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
  TagOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import React from "react";
import { renderForm } from "./form";


const columns = [
  {
    title: "ลำดับ",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "ชื่อองค์กร",
    dataIndex: "businessName",
    key: "businessName",
  },
  {
    title: "ประเภทธุรกิจ",
    dataIndex: "businessType",
    key: "businessType",
  },
  {
    title: "โมเดล",
    dataIndex: "businessModel",
    key: "businessModel",
  },
  {
    title: "ประเภทสาขา",
    dataIndex: "branchType",
    key: "branchType",
  },
  {
    title: "โทรศัพท์",
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: "อีเมลล์",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "เว็บไซต์",
    dataIndex: "websiteUrl",
    key: "websiteUrl",
  },
  {
    title: "รายละเอียด",
    key: "details",
    dataIndex: "id",
    render: (id: number) => {
      console.log(id);
      return (
        <Link to={`${id}`}>
          <Button
            style={{ fontSize: "16px", width: "180px" }}
            type="primary"
            icon={<EyeOutlined />}
          >
            ดูข้อมูล
          </Button>
        </Link>
      );
    },
  },
];
export const MyOrganize: React.FC = () => {
  const { organize } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();

  // const formatDate = (isoDateString: any) => {
  //   return dayjs(isoDateString);
  // };

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
   
    submit(
      { data: JSON.stringify(payload), action: "edit" },
      { method: "put" }
    );
  };


  React.useEffect(() => {
    let businessRegister = null;
    if (organize.businessRegister) {
      const combinedDateTime = organize.businessRegister;
      businessRegister = dayjs(combinedDateTime);
    }
    form.setFieldsValue({
      ...organize,
      businessRegister: businessRegister,
    });
  }, [form, organize]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <Col span={12} style={{ textAlign: "left", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>
          แก้ไขข้อมูลองค์กร
        </div>
      </Col>
      <Col span={12} style={{ textAlign: "right", marginBottom: 16 }}>
        <Row justify={"end"} gutter={15}>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Col>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 24, order: 2 }}
        lg={{ span: 12, order: 2 }}
        xl={{ span: 12, order: 1 }}
      >
        <Row gutter={20}>
          {renderForm.map((item: any) => {
            return (
              <DynamicForm
                key={item.value}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                col={item.col}
                option={item.option}
                icon={item.icon}
                value={item.value}
                ruleMessage={item.message}
                require={item.require}
                disabled={false}
                checked={false}
              />
            );
          })}
        </Row>
      </Col>
    </Form>

      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />

        <span style={{ marginBottom: -60 }}>ค้นหาองค์กร</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div></div>
        <Link to={"create"}>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            style={{
              fontSize: "18px",
              marginRight: "30",
              backgroundColor: "#1c2c5c",
              borderColor: "#1c2c5c",
              borderRadius: "10px",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            เพิ่มข้อมูลสาขา
          </Button>
        </Link>
      </div>

      {/* Search bar with button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Input
          addonBefore="ค้นหา"
          allowClear
          // value={searchValue}
          // onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 304 }}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          // onClick={() => onSearch(searchValue)}
        >
          ค้นหา
        </Button>
      </div>
      <Table
        columns={columns}
        // dataSource={dataSource}
        // columns={columns}
        // dataSource={products}
        dataSource={organize?.items ? organize?.items : []}
        pagination={false}
        bordered
      />
    </div>
  );
};
