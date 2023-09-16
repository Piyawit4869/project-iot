import {
  ArrowRightOutlined,
  CheckSquareOutlined,
  DollarOutlined,
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
  Checkbox,
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
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const Organize = () => {
  interface Employee {
    name: string;
    role: string;
  }
  const employee: Employee[] = [
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

  const onCheckBoxChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
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
                style={{
                  width: "200px",
                  height: "70px",
                  backgroundColor: "white",
                  marginTop: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "16px", textAlign: "center" }}>
                  0.00
                </Typography>
              </Card>
              <Card
                style={{
                  width: "200px",
                  height: "70px",
                  backgroundColor: "white",
                  marginTop: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "16px", textAlign: "center" }}>
                  0.00
                </Typography>
              </Card>
              <Card
                style={{
                  width: "200px",
                  height: "70px",
                  backgroundColor: "white",
                  marginTop: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "16px", textAlign: "center" }}>
                  0.00
                </Typography>
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
                marginBottom: "20px",
                height: "1px",
              }}
            />
            {...employee.map((employee) => {
              return (
                <Row
                  justify="space-between"
                  wrap={false}
                  style={{ padding: "10px", marginBottom: "10px" }}
                >
                  <Checkbox
                    onChange={onCheckBoxChange}
                    style={{ transform: "scale(2)" }}
                  />
                  <div style={{ width: "50%" }}>
                    <Typography>{employee.name}</Typography>
                  </div>
                  <div style={{ width: "25%" }}>
                    <Typography>{employee.role}</Typography>
                  </div>
                </Row>
              );
            })}
          </Card>
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
        <Typography style={{ fontSize: "18px" }}>สรุปผลลัพธ์</Typography>
      </Row>
      <Row>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "200px",
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
              <Typography style={{ fontSize: "16px" }}>เงินคงเหลือ</Typography>
              <Typography style={{ fontSize: "16px", color: "white" }}>
                0.00 บาท
              </Typography>
            </Col>
          </Row>
        </Card>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "200px",
            backgroundColor: ThemeColors.lightOrangeColor,
            marginRight: "10px",
            marginLeft: "10px",
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
                0.00 บาท
              </Typography>
            </Col>
          </Row>
        </Card>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            width: "200px",
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
              <Typography style={{ fontSize: "16px" }}>โบนัสสุทธิ์</Typography>
              <Typography style={{ fontSize: "16px", color: "white" }}>
                0.00 บาท
              </Typography>
            </Col>
          </Row>
        </Card>
      </Row>
      <Typography
        style={{
          fontSize: "16px",
          color: ThemeColors.orangeColor,
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        *หมายเหตุ* ถ้าติ๊กถูกจะเป็นเลือกให้โบนัสนั้นเป็น 100%
      </Typography>
      <Card bodyStyle={{ paddingRight: "20px" }} style={{ width: "50%" }}>
        <Row justify="space-between">
          <div></div>
          <Typography style={{ width: "43%", fontSize: "16px" }}>
            เปอร์เซ็นโบนัส
          </Typography>
          <Typography style={{ width: "39%", fontSize: "16px" }}>
            จำนวนเงินโบนัส (บาท)
          </Typography>
        </Row>
        <Row style={{ marginTop: "10px", marginBottom: "10px" }} wrap={false}>
          <Checkbox
            onChange={onCheckBoxChange}
            style={{ transform: "scale(2)", marginRight: "20px" }}
          />
          <Card
            bodyStyle={{ padding: "10px" }}
            style={{
              backgroundColor: ThemeColors.lightOrangeColor,
              width: "300px",
              marginRight: "10px",
            }}
          >
            <Row justify="start" align="middle" wrap={false}>
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
                  0%
                </Typography>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              width: "200px",
              height: "70px",
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "16px", textAlign: "center" }}>
              0.00
            </Typography>
          </Card>
        </Row>
        <Row wrap={false}>
          <Checkbox
            onChange={onCheckBoxChange}
            style={{ transform: "scale(2)", marginRight: "20px" }}
          />
          <Card
            bodyStyle={{ padding: "10px" }}
            style={{
              backgroundColor: ThemeColors.lightOrangeColor,
              width: "300px",
              marginRight: "10px",
            }}
          >
            <Row justify="start" align="middle" wrap={false}>
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
                  100%
                </Typography>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              width: "200px",
              height: "70px",
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px",
              boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "16px", textAlign: "center" }}>
              0.00
            </Typography>

            {/* <Form.Item>
              <Input
                placeholder="0.00"
                bordered={false}
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item> */}
          </Card>
        </Row>
      </Card>
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
            backgroundColor: ThemeColors.saveDraftColor,
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Typography style={{ fontSize: "18px", color: "white" }}>
            บันทึกข้อมูลและคำนวณ
          </Typography>
          <Typography style={{ fontSize: "18px", color: "white" }}>
            การชำระเงินพนักงาน
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
