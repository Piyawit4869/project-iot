import {
  DollarOutlined,
  CheckSquareOutlined,
  UserOutlined,
  PlusCircleOutlined,
  DownOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Button,
  Slider,
  Card,
  Dropdown,
  Form,
  MenuProps,
  message,
} from "antd";

import { ThemeColors } from "@styles/theme";
import { useState } from "react";

export const Employee = () => {
  const [slider, setSlider] = useState(0);
  const incomePerPerson = 192375.0;
  const bonusTeam = 34200.0;
  const bonusOrganize = 51300.0;
  const bonusPerUSer = (bonusTeam * slider) / 100;
  const percentageRest = 100 - slider;
  const summaryPerPerson = incomePerPerson + bonusPerUSer;

  interface Employee {
    name: string;
    role: string;
  }
  const employees: Employee[] = [
    {
      name: "เกียรติภูมิ พูลเขตร์กิจ",
      role: "Programer",
    },
    {
      name: "ภูวิศ วัฒนะ",
      role: "Programer",
    },
    {
      name: "น็อตโตะคุง วาตานาเบ้",
      role: "Programer",
    },
    {
      name: "เพชรชี่ สายบิด",
      role: "Programer",
    },
    {
      name: "ลูกพี่โอ้น สุดเจ๋ง",
      role: "Programer",
    },
    {
      name: "พี่โก้ คนจริง",
      role: "Programer",
    },
  ];

  const itemsMonth: MenuProps["items"] = [
    {
      label: "January",
      key: "1",
    },
    {
      label: "February",
      key: "2",
    },
    {
      label: "March",
      key: "3",
    },
    {
      label: "April",
      key: "4",
    },
    {
      label: "May",
      key: "5",
    },
    {
      label: "June",
      key: "6",
    },
    {
      label: "July",
      key: "7",
    },
    {
      label: "August",
      key: "8",
    },
    {
      label: "September",
      key: "9",
    },
    {
      label: "October",
      key: "10",
    },
    {
      label: "November",
      key: "11",
    },
    {
      label: "December",
      key: "12",
    },
  ];

  const onChange = (value: number) => {
    setSlider(value);
    console.log("onChange: ", value);
  };

  const onAfterChange = (value: number) => {
    setSlider(value);
    console.log("onAfterChange: ", value);
  };

  const onClickMonth: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  return (
    <div>
      <Typography style={{ fontSize: "18px" }}>
        เลือกช่วงเวลาที่ต้องการแสดงข้อมูล
      </Typography>
      <Row justify="space-between" wrap={false}>
        <Card
          bodyStyle={{ paddingTop: "20px" }}
          style={{
            width: "100%",
            height: "70px",
            backgroundColor: ThemeColors.orangeColor,
            borderRadius: "10px",
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ",
              },
            ]}
          >
            <Dropdown menu={{ items: itemsMonth, onClick: onClickMonth }}>
              <a onClick={(e) => e.preventDefault()}>
                <Row
                  justify="space-between"
                  style={{
                    width: "100%",
                    color: "white",
                  }}
                >
                  <FormOutlined style={{ fontSize: "24px" }} />
                  <Typography style={{ fontSize: "16px", color: "white" }}>
                    กรุณาเลือกเดือน
                  </Typography>

                  <DownOutlined style={{ fontSize: "18px" }} />
                </Row>
              </a>
            </Dropdown>
          </Form.Item>
        </Card>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "100%",
            backgroundColor: ThemeColors.lightOrangeColor,
          }}
        >
          <Row justify="start" align="middle">
            <DollarOutlined
              style={{
                color: ThemeColors.whiteColor,
                fontSize: "28px",
                marginRight: "10px",
              }}
            />
            <Col>
              <Typography style={{ fontSize: "16px" }}>
                ผลลัพธ์รายได้ต่อคน
              </Typography>
              <Typography style={{ fontSize: "16px", color: "white" }}>
                {incomePerPerson} บาท
              </Typography>
            </Col>
          </Row>
        </Card>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "100%",
            backgroundColor: ThemeColors.lightOrangeColor,
          }}
        >
          <Row justify="start" align="middle">
            <DollarOutlined
              style={{
                color: ThemeColors.whiteColor,
                fontSize: "28px",
                marginRight: "10px",
              }}
            />
            <Col>
              <Typography style={{ fontSize: "16px" }}>
                โบนัสทีมโครงการ
              </Typography>
              <Typography style={{ fontSize: "16px", color: "white" }}>
                {bonusTeam} บาท
              </Typography>
            </Col>
          </Row>
        </Card>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "100%",
            backgroundColor: ThemeColors.lightOrangeColor,
          }}
        >
          <Row justify="start" align="middle">
            <DollarOutlined
              style={{
                color: ThemeColors.whiteColor,
                fontSize: "28px",
                marginRight: "10px",
              }}
            />
            <Col>
              <Typography style={{ fontSize: "16px" }}>
                โบนัสองค์กร/กิจการ
              </Typography>
              <Typography style={{ fontSize: "16px", color: "white" }}>
                {bonusOrganize} บาท
              </Typography>
            </Col>
          </Row>
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
          ผู้รับผิดชอบในโครงการ
        </Typography>
      </Row>
      <Row justify="space-between" wrap={false} style={{ marginTop: "20px" }}>
        <div style={{ width: "100%" }}>
          {...employees.map((employee) => {
            return (
              <Row align="middle" wrap={false} style={{ marginBottom: "10px" }}>
                <div style={{ width: "100%" }}>
                  <Row>
                    <Typography
                      style={{ fontSize: "16px", marginRight: "5px" }}
                    >
                      {employee.name}
                    </Typography>
                    <Typography style={{ color: ThemeColors.orangeColor }}>
                      (รายได้ต่อคน {incomePerPerson} บาท)
                    </Typography>
                  </Row>
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
                      {slider}% ของโบนัสทีมโครงการ
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
                  <Typography>{bonusPerUSer} บาท</Typography>
                </Card>
              </Row>
            );
          })}
        </div>

        <Card style={{ width: "80%" }}>
          <Row align="middle">
            <UserOutlined
              style={{
                fontSize: "60px",
                marginRight: "20px",
              }}
            />
            <Col>
              <Typography style={{ fontSize: "18px" }}>
                เกียรติภูมิ พูลเขตร์กิจ
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                บทบาท : Programer
              </Typography>
              <Typography
                style={{ fontSize: "16px", color: ThemeColors.orangeColor }}
              >
                {summaryPerPerson} บาท
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
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography style={{ fontSize: "16px", marginRight: "5px" }}>
              - โบนัสที่ได้รับ
            </Typography>
            <Typography
              style={{ fontSize: "16px", color: ThemeColors.orangeColor }}
            >
              {slider}% | {bonusPerUSer} บาท
            </Typography>
          </Row>
          <Typography>เพิ่มหัวข้อ</Typography>
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
                เพิ่ม
              </Typography>
            </Row>
          </Button>
        </Card>
      </Row>
      <div
        style={{
          background: ThemeColors.lightOrangeColor,
          marginTop: "30px",
          marginBottom: "30px",
          height: "1px",
        }}
      />
      <Row style={{ marginBottom: "20px" }}>
        <Button
          style={{
            width: "200px",
            height: "70px",
            backgroundColor: ThemeColors.greenColor,
            marginRight: "10px",
          }}
        >
          <Typography style={{ fontSize: "18px", color: "white" }}>
            บันทึกข้อมูล
          </Typography>
        </Button>

        <Button
          style={{
            width: "200px",
            height: "70px",
            backgroundColor: ThemeColors.waringColor,
          }}
        >
          <Typography style={{ fontSize: "18px", color: "white" }}>
            ยกเลิก
          </Typography>
        </Button>
      </Row>
    </div>
  );
};
