import {
  ArrowRightOutlined,
  CheckSquareOutlined,
  DownOutlined,
  FilterOutlined,
  FormOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Radio,
  Row,
  Typography,
  message,
} from "antd";
import { ThemeColors } from "../../styles/theme";

export const Organize = () => {
  const persons = [
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

  const itemsCurrency: MenuProps["items"] = [
    {
      label: "THB",
      key: "1",
    },
    {
      label: "USD",
      key: "2",
    },
    {
      label: "EUR",
      key: "3",
    },
  ];

  const onClickCurrency: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  return (
    <div>
      <Row wrap>
        {
          // this is organization calculation.
        }
        <Col style={{ width: "48%", marginRight: "25px" }}>
          <Row
            align="middle"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <CheckSquareOutlined
              style={{
                color: ThemeColors.brickOrangeColor,
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
            <Typography style={{ fontSize: "18px" }}>
              คำนวนการชำระเงินกิจการ
            </Typography>
          </Row>
          <Card
            bodyStyle={{ padding: "0px" }}
            style={{
              width: "50%",
              height: "70px",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "5px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "16px" }}>
              จำนวนเงินทั้งหมดในโครงการ
            </Typography>
            <Form.Item>
              <Input
                placeholder="กรุณาระบุจำนวนเงิน"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </Card>
          <Typography
            style={{
              fontSize: "18px",
              color: ThemeColors.orangeColor,
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            คำนวนการชำระเงินกิจการ
          </Typography>
          <Row justify="space-between" wrap={false}>
            <Col style={{ width: "100%", marginRight: "10px" }}>
              <Radio.Group size="large" name="radiogroup" defaultValue={1}>
                <Radio value={1}>
                  <Typography style={{ fontSize: "18px" }}>
                    เลขจำนวนเต็ม
                  </Typography>
                </Radio>
                <Radio value={2}>
                  <Typography style={{ fontSize: "18px" }}>
                    เปอร์เซ็น
                  </Typography>
                </Radio>
              </Radio.Group>
              <Card
                bodyStyle={{ padding: "0px" }}
                style={{
                  width: "100%",
                  height: "70px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "16px" }}>
                  ต้นทุนการผลิตต่าง ๆ
                </Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุณาระบุเปอร์เซ็น"
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
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "16px" }}>
                  ต้นทุนการทำงานต่าง ๆ
                </Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุณาระบุเปอร์เซ็น"
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
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "16px" }}>โบนัส</Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุณาระบุเปอร์เซ็น"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col>
              <Typography
                style={{
                  fontSize: "18px",
                  color: ThemeColors.orangeColor,
                }}
              >
                ยอดเงินคงเหลือ (บาท)
              </Typography>
              <Card
                bodyStyle={{ padding: "0px" }}
                style={{
                  width: "100%",
                  height: "70px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                  marginRight: "20px",
                }}
              >
                <Form.Item>
                  <Input
                    placeholder="0.00"
                    bordered={false}
                    style={{
                      padding: "12px",
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
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                  marginRight: "20px",
                }}
              >
                <Form.Item>
                  <Input
                    placeholder="0.00"
                    bordered={false}
                    style={{
                      padding: "12px",
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
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                  marginRight: "20px",
                }}
              >
                <Form.Item>
                  <Input
                    placeholder="0.00"
                    bordered={false}
                    style={{
                      padding: "12px",
                      fontSize: "16px",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <Typography
            style={{
              fontSize: "18px",
              marginTop: "10px",
              color: ThemeColors.grayColor,
            }}
          >
            เพิ่มรายการ
          </Typography>
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

              <Typography
                style={{ color: "white", fontSize: "16px", marginLeft: "5px" }}
              >
                เพิ่ม
              </Typography>
            </Row>
          </Button>
          <Row justify="space-between" wrap={false}>
            <Col style={{ width: "100%", marginRight: "10px" }}>
              <Card
                bodyStyle={{ padding: "0px" }}
                style={{
                  width: "100%",
                  height: "70px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "16px" }}>
                  จำนวนผู้รับผิดชอบโครงการ
                </Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุณาเลือกผู้รับผิดชอบโครงการ"
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
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "16px" }}>อัตราโบนัส</Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุณาระบุเปอร์เซ็น"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col style={{ width: "40%" }}>
              <Card
                bodyStyle={{ padding: "0px" }}
                style={{ marginTop: "10px" }}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "70px",
                    backgroundColor: ThemeColors.orangeColor,
                    borderRadius: "5px",
                  }}
                >
                  <Row justify={"center"} align={"middle"}>
                    <Typography
                      style={{
                        color: "white",
                        fontSize: "16px",
                        marginRight: "5px",
                      }}
                    >
                      เลือก
                    </Typography>
                    <ArrowRightOutlined
                      style={{
                        color: ThemeColors.whiteColor,
                        fontSize: "20px",
                      }}
                    />
                  </Row>
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
        {
          // this is type of calculation.
        }
        <Col style={{ width: "49%" }}>
          <Row
            align="middle"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <CheckSquareOutlined
              style={{
                color: ThemeColors.brickOrangeColor,
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
            <Typography style={{ fontSize: "18px" }}>รูปแบบการคำนวณ</Typography>
          </Row>
          <Row style={{ marginBottom: "66.5px" }}>
            <Card
              bodyStyle={{ paddingTop: "20px" }}
              style={{
                width: "30%",
                height: "70px",
                backgroundColor: ThemeColors.orangeColor,
                borderRadius: "10px",
                marginRight: "10px",
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
                <Dropdown
                  menu={{ items: itemsCurrency, onClick: onClickCurrency }}
                >
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
                        ค่าเริ่มต้น
                      </Typography>

                      <DownOutlined style={{ fontSize: "18px" }} />
                    </Row>
                  </a>
                </Dropdown>
              </Form.Item>
            </Card>
            <Card bodyStyle={{ padding: "0px" }}>
              <Button
                style={{
                  width: "100%",
                  height: "70px",
                  backgroundColor: ThemeColors.brickOrangeColor,
                  borderRadius: "10px",
                }}
              >
                <Row justify={"center"} align={"middle"}>
                  <PlusOutlined
                    style={{
                      color: ThemeColors.whiteColor,
                      fontSize: "20px",
                      marginRight: "5px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginRight: "5px",
                    }}
                  >
                    เพิ่มรูปแบบการคำนวณ
                  </Typography>
                </Row>
              </Button>
            </Card>
          </Row>
          <Typography
            style={{
              fontSize: "18px",
              color: ThemeColors.orangeColor,
              marginBottom: "10px",
            }}
          >
            โปรดเลือกผู้รับผิดชอบ
          </Typography>
          <Card style={{ width: "100%" }}>
            <Input
              style={{
                width: "100%",
                borderColor: ThemeColors.goldColor,
                marginBottom: "10px",
              }}
              size="large"
              placeholder="ค้นหาพนักงาน/บทบาทงาน"
              prefix={<SearchOutlined />}
            />
            <Row justify="space-between" wrap={false}>
              <div style={{ width: "25%" }}>
                <Row align="middle">
                  <Typography>เลือก</Typography>
                  <FilterOutlined style={{ color: ThemeColors.goldColor }} />
                </Row>
              </div>
              <div style={{ width: "50%" }}>
                <Typography>ชื่อ</Typography>
              </div>
              <div style={{ width: "25%" }}>
                <Typography>บทบาท</Typography>
              </div>
            </Row>
            <div
              style={{
                background: ThemeColors.goldColor,
                marginTop: "10px",
                marginBottom: "10px",
                height: "1px",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
