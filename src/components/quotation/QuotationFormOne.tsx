import {
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { ThemeColors } from "@styles/theme";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Preview } from "@components//global/Preview";
import React from "react";

interface QuotationFormOneProps {
  previewData: any;
}

export const QuotationFormOne: React.FC<QuotationFormOneProps> = (
  props: QuotationFormOneProps
) => {
  const { previewData } = props;

  const priceType = [
    {
      value: "THB",
      label: "THB",
    },
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
  ];

  const priceIsCurrency = [
    {
      value: "THB",
      label: "THB",
    },
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
  ];

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    console.log(new Date());
  };

  return (
    <Row justify={"space-between"} wrap={false}>
      <div style={{ width: "55%" }}>
        <Row wrap={false}>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>อ้างอิง</Typography>
            <Form.Item name="refer">
              <Input
                placeholder="ระบุถ้ามี"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </Card>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "16px" }}>เลขที่เอกสาร</Typography>
            <Form.Item name="numberDoc">
              <Input
                placeholder="เช่น QU999999999"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </Card>
        </Row>
        <Row align="middle" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <CheckSquareOutlined
            style={{
              color: ThemeColors.brickOrangeColor,
              fontSize: "24px",
              marginRight: "5px",
            }}
          />
          <Typography style={{ fontSize: "18px" }}>ข้อมูลลูกค้า</Typography>
        </Row>
        <Row wrap={false}>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>ชื่อลูกค้า</Typography>
            <Form.Item
              name="cusName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
                },
              ]}
            >
              <Input
                required
                placeholder="ค้นหาผู้ติดต่อหรือสร้างผู้ติดต่อใหม่"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </Card>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "50%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>เบอร์โทร</Typography>
            <Form.Item
              name="tell"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเบอร์โทร",
                },
              ]}
            >
              <Input
                required
                placeholder="โปรดระบุ"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </Card>
        </Row>
        <Card
          bodyStyle={{ padding: "0px" }}
          style={{
            width: "100%",
            height: "70px",
            boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "1px",
            borderRadius: "10px",

            marginTop: "20px",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography style={{ fontSize: "16px" }}>ที่อยู่</Typography>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "กรุณากรอกที่อยู่",
              },
            ]}
          >
            <Input
              required
              placeholder="โปรดระบุที่อยู่ของลูกค้า"
              bordered={false}
              style={{
                padding: "0px",
                fontSize: "16px",
                color: ThemeColors.lightOrangeColor,
              }}
            />
          </Form.Item>
        </Card>
        <Row wrap={false}>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>วันที่ออก</Typography>
            <Form.Item
              name="issueDate"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
                },
              ]}
            >
              <DatePicker
                bordered={false}
                style={{
                  width: "90%",
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
                onChange={onChangeDate}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Card>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>
              วันที่ใช้ได้ถึง
            </Typography>
            <Form.Item
              name="validDate"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
                },
              ]}
            >
              <DatePicker
                bordered={false}
                style={{
                  width: "90%",
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
                onChange={onChangeDate}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Card>
        </Row>
        <Row align="middle" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <CheckSquareOutlined
            style={{
              color: ThemeColors.brickOrangeColor,
              fontSize: "24px",
              marginRight: "5px",
            }}
          />
          <Typography style={{ fontSize: "18px" }}>
            ข้อมูลราคาและภาษี
          </Typography>
        </Row>
        <Row wrap={false}>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>ประเภทราคา</Typography>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
                },
              ]}
            >
              <Select options={priceType} placeholder="-" bordered={false} />
            </Form.Item>
          </Card>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "100%",
              height: "70px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>
              ราคานี้เป็นค่าเงิน
            </Typography>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
                },
              ]}
            >
              <Select
                options={priceIsCurrency}
                placeholder="THB"
                bordered={false}
              />
            </Form.Item>
          </Card>
        </Row>
      </div>
      <Preview values={previewData} />
    </Row>
  );
};
