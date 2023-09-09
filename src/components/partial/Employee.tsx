import {
  DollarOutlined,
  CheckSquareOutlined,
  SearchOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  DatePicker,
  Button,
  Input,
  Slider,
  Card,
  DatePickerProps,
} from "antd";

import { ThemeColors } from "../../styles/theme";
import { useState } from "react";

export const Employee = () => {
  const [slider, setSlider] = useState(0);
  const employee = "เกียรติภูมิ พูลเขตร์กิจ";
  const income = 1000000.0;
  const pricePerUser = (income * slider) / 100;
  const percentageRest = 100 - slider;

  const onChange = (value: number) => {
    setSlider(value);
    console.log("onChange: ", value);
  };

  const onAfterChange = (value: number) => {
    setSlider(value);
    console.log("onAfterChange: ", value);
  };

  const onMonthChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
        <Col className="gutter-row" span={6}>
          <Typography>เลือกช่วงเวลาที่ต้องการแสดงข้อมูล</Typography>
          <DatePicker
            style={{
              width: "100%",
              backgroundColor: ThemeColors.orangeColor,
            }}
            onChange={onMonthChange}
            picker="month"
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Typography>รายได้</Typography>
          <Button
            style={{ width: "100%", borderColor: ThemeColors.orangeColor }}
          >
            <Row wrap={false} align="middle" justify="center">
              <DollarOutlined
                style={{
                  marginRight: "10px",
                  color: ThemeColors.brickOrangeColor,
                }}
              />
              <Typography>{income} บาท</Typography>
            </Row>
          </Button>
        </Col>
        <Col className="gutter-row" span={6}>
          <Typography>ค่าใช้จ่าย</Typography>
          <Button
            style={{ width: "100%", borderColor: ThemeColors.orangeColor }}
          >
            <Row wrap={false} align="middle" justify="center">
              <DollarOutlined
                style={{
                  marginRight: "10px",
                  color: ThemeColors.brickOrangeColor,
                }}
              />
              <Typography>390,000.00 บาท</Typography>
            </Row>
          </Button>
        </Col>
        <Col className="gutter-row" span={6}>
          <Typography>เงินคงเหลือ</Typography>
          <Button
            style={{ width: "100%", borderColor: ThemeColors.orangeColor }}
          >
            <Row wrap={false} align="middle" justify="center">
              <DollarOutlined
                style={{
                  marginRight: "10px",
                  color: ThemeColors.brickOrangeColor,
                }}
              />
              <Typography>610,000.00 บาท</Typography>
            </Row>
          </Button>
        </Col>
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
          ผู้ใช้ในกิจการ/องค์กร
        </Typography>
      </Row>
      <Row justify="space-between" wrap={false}>
        <Input
          width="100%"
          style={{
            borderColor: ThemeColors.goldColor,
            marginRight: "10px",
            color: ThemeColors.goldColor,
          }}
          placeholder="ค้นหาชื่อผู้ใช้"
        ></Input>
        <Button
          style={{
            backgroundColor: ThemeColors.goldColor,
            color: ThemeColors.fontColor1,
          }}
        >
          <Row style={{ width: "100%" }} align="middle" wrap={false}>
            <SearchOutlined />
            <Typography style={{ color: ThemeColors.fontColor1 }}>
              ค้นหา
            </Typography>
          </Row>
        </Button>
      </Row>
      <Row justify="space-between" wrap={false} style={{ marginTop: "20px" }}>
        <div style={{ width: "100%" }}>
          <Row align="middle" wrap={false}>
            <div style={{ width: "100%" }}>
              <Typography style={{ fontWeight: 600 }}>{employee}</Typography>
              <Slider
                trackStyle={{
                  backgroundColor: ThemeColors.orangeColor,
                }}
                style={{
                  width: "100%",
                }}
                defaultValue={0}
                onChange={onChange}
                onAfterChange={onAfterChange}
              />
              <Row justify="space-between">
                <Typography style={{ color: ThemeColors.orangeColor }}>
                  {slider}%
                </Typography>
                <Typography>{percentageRest} %</Typography>
              </Row>
            </div>

            <Card
              bodyStyle={{ padding: "4px" }}
              style={{
                borderColor: ThemeColors.goldColor,
                marginLeft: "20px",
                marginRight: "20px",
                width: "40%",
                height: "30px",
                textAlign: "center",
              }}
            >
              <Typography>{pricePerUser} บาท</Typography>
            </Card>
          </Row>
        </div>

        <Card style={{ width: "80%" }}>
          <Row align="middle">
            <UserOutlined
              style={{
                fontSize: "50px",
                marginRight: "5px",
              }}
            />
            <Col>
              <Typography style={{ fontWeight: 600 }}>{employee}</Typography>
              <Typography style={{ color: ThemeColors.orangeColor }}>
                {slider}% | {pricePerUser} บาท
              </Typography>
            </Col>
          </Row>
          <div
            style={{
              background: ThemeColors.goldColor,
              height: "3px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Typography style={{ fontWeight: 600 }}>
            หักค่าใช้จ่ายอื่น ๆ
          </Typography>
          <Card
            bodyStyle={{ padding: "4px" }}
            style={{
              borderColor: ThemeColors.orangeColor,
              marginBottom: "10px",
            }}
          >
            <Typography style={{ color: ThemeColors.orangeColor }}>
              10,000.00
            </Typography>
          </Card>
          <Typography>กรุณาใส่ชื่อรายการ</Typography>
          <Input placeholder="-" style={{ marginBottom: "10px" }}></Input>
          <Typography>เพิ่มรายการหักเงินคืนองค์กร</Typography>
          <Button
            style={{
              width: "20%",
              backgroundColor: ThemeColors.orangeColor,
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            onClick={() => {}}
          >
            <Row justify={"center"} align={"middle"}>
              <PlusCircleOutlined
                style={{ color: ThemeColors.whiteColor, fontSize: "20px" }}
              />

              <Typography style={{ color: "white", marginLeft: "5px" }}>
                text
              </Typography>
            </Row>
          </Button>
        </Card>
      </Row>
    </div>
  );
};
