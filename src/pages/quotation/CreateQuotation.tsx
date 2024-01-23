import { ThemeColors } from "../../styles/theme";
import { Button, Form, Row, Typography } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { QuotationFormOne } from "../../components/quotation/QuotationFormOne";
import { QuotationFormList } from "../../components/quotation/QuotationFormList";
import { QuotationSumAndNote } from "../../components/quotation/QuotationSumAndNote";
import { Title } from "../../components/global/Title";

export const CreateQuotationPage = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data") as string;
    const parsedData = JSON.parse(savedData);
    return parsedData || "";
  });

  const handleChange = (_value: any, allValues: any) => {
    setData(allValues);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const logFrom = (values: any) => {
    console.log("success", values);
  };

  return (
    <div>
      <Title title="สร้างใบเสนอราคา" textButton={""} button={false} />
      <Form
        form={form}
        onValuesChange={handleChange}
        style={{ marginTop: "40px" }}
        initialValues={data}
        onFinish={logFrom}
      >
        <QuotationFormOne previewData={data} />
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
        <QuotationFormList />
        <QuotationSumAndNote />
        <Row style={{ marginBottom: "20px", marginTop: "20px" }} wrap={false}>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              height: "50px",
              backgroundColor: ThemeColors.greenColor,
              width: "25%",
            }}
          >
            <Typography style={{ fontSize: "18px", color: "white" }}>
              อนุมัติในเสนอราคา
            </Typography>
          </Button>
          <Button
            style={{
              height: "50px",
              backgroundColor: ThemeColors.saveDraftColor,
              marginLeft: "10px",
              marginRight: "10px",
              width: "13%",
            }}
          >
            <Typography style={{ fontSize: "18px", color: "white" }}>
              บันทึกร่าง
            </Typography>
          </Button>
          <Button
            style={{
              height: "50px",
              backgroundColor: ThemeColors.waringColor,
              width: "10%",
            }}
          >
            <Typography style={{ fontSize: "18px", color: "white" }}>
              ยกเลิก
            </Typography>
          </Button>
        </Row>
      </Form>
    </div>
  );
};
