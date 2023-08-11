import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  DownOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export const CreateQuotationPage = () => {
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

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
      {Title("Create Quotation")}
      <Form>
        <Row>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>อ้างอิง</Typography>
            <Form.Item>
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
          </div>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "18px" }}>เลขที่เอกสาร</Typography>
            <Form.Item>
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
          </div>
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
        <Row justify={"space-between"}>
          <div
            style={{
              width: "68%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>ชื่อลูกค้า</Typography>
            <Form.Item
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
          </div>
          <div
            style={{
              width: "30%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "18px" }}>เบอร์โทร</Typography>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ",
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
          </div>
        </Row>
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "1px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginTop: "20px",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography style={{ fontSize: "18px" }}>ที่อยู่</Typography>
          <Form.Item
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
        </div>
        <Row>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>วันที่ออก</Typography>
            <Form.Item
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
              />
            </Form.Item>
          </div>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            }}
          >
            <Typography style={{ fontSize: "18px" }}>
              วันที่ใช้ได้ถึง
            </Typography>
            <Form.Item
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
              />
            </Form.Item>
          </div>
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
        <Row>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>ประเภทราคา</Typography>
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
                  <Space
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  >
                    -
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Form.Item>
          </div>
          <div
            style={{
              width: "25%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>
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
              <Dropdown
                menu={{ items: itemsCurrency, onClick: onClickCurrency }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  >
                    THB
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Form.Item>
          </div>
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
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "15px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginBottom: "20px",
          }}
        >
          <Row justify={"space-between"}>
            <div
              style={{
                width: "33%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "10px",

                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>
                สินค้า/บริการ
              </Typography>
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
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      -
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Form.Item>
            </div>
            <div
              style={{
                width: "33%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",

                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>บัญชี</Typography>
              <Form.Item>
                <Input
                  placeholder="-"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                width: "33%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>คำอธิบาย</Typography>
              <Form.Item>
                <Input
                  placeholder="พิมพ์คำอธิบาย"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
          </Row>
          <Row justify={"space-between"} align={"middle"}>
            <div
              style={{
                width: "16%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>จำนวน</Typography>
              <Form.Item>
                <Input
                  placeholder="1"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                width: "16%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>ราคา/หน่วย</Typography>
              <Form.Item>
                <Input
                  placeholder="0.00"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                width: "16%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>ส่วนลด/หน่วย</Typography>
              <Form.Item>
                <Input
                  placeholder="0.00"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                width: "16%",
                backgroundColor: ThemeColors.goldColor,
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "10px",

                marginBottom: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>ภาษี </Typography>
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
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      ไม่มี
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Form.Item>
            </div>
            <div
              style={{
                width: "16%",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "10px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>ลบรายการ </Typography>
            </div>
            <div
              style={{
                width: "16%",
                height: "80px",
                backgroundColor: ThemeColors.orangeColor,
                borderRadius: "10px",
                marginBottom: "20px",
                paddingTop: "25px",
              }}
            >
              <Row justify={"center"} align={"middle"}>
                <div
                  style={{
                    display: "flex",
                    width: "28px",
                    height: "28px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    marginRight: "5px",
                  }}
                >
                  <DeleteOutlined
                    style={{ color: ThemeColors.orangeColor, fontSize: "24px" }}
                  />
                </div>

                <Typography style={{ fontSize: "18px" }}>ลบ </Typography>
              </Row>
            </div>
          </Row>
        </div>
        <Typography
          style={{
            fontSize: "18px",
            color: ThemeColors.goldColor,
            marginBottom: "20px",
          }}
        >
          ปุ่มเพิ่มรายการ
        </Typography>
        <div
          style={{
            width: "16%",
            height: "80px",
            backgroundColor: ThemeColors.orangeColor,
            borderRadius: "10px",
            marginBottom: "20px",
            paddingTop: "25px",
          }}
        >
          <Row justify={"center"} align={"middle"}>
            <div
              style={{
                display: "flex",
                width: "28px",
                height: "28px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "4px",
                marginRight: "5px",
              }}
            >
              <PlusCircleOutlined
                style={{ color: ThemeColors.orangeColor, fontSize: "24px" }}
              />
            </div>

            <Typography style={{ fontSize: "18px" }}>เพิ่ม </Typography>
          </Row>
        </div>
        <div
          style={{
            backgroundColor: ThemeColors.goldColor,
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <Row
            align="middle"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <CheckSquareOutlined
              style={{
                color: ThemeColors.brickOrangeColor,
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
            <Typography style={{ fontSize: "18px" }}>สรุปข้อมูล</Typography>
          </Row>
          <Row justify={"space-between"} align={"middle"}>
            <div style={{ width: "73%", marginRight: "20px" }}>
              <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  มูลค่าส่วนลดรวม
                </Typography>
                <Row>
                  <div
                    style={{
                      width: "200px",
                      backgroundColor: ThemeColors.orangeColor,
                      borderRadius: "10px",
                      textAlign: "end",
                      paddingRight: "5px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography style={{ fontSize: "18px", color: "white" }}>
                      0
                    </Typography>
                  </div>
                  <Typography style={{ fontSize: "18px" }}>บาท</Typography>
                </Row>
              </Row>
              <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  มูลค่ารายการยกเว้นภาษี
                </Typography>
                <Row>
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      textAlign: "end",
                      paddingRight: "5px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography style={{ fontSize: "18px" }}>0</Typography>
                  </div>
                  <Typography style={{ fontSize: "18px" }}>บาท</Typography>
                </Row>
              </Row>
              <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  มูลค่ารายการภาษี 0%
                </Typography>
                <Row>
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      textAlign: "end",
                      paddingRight: "5px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography style={{ fontSize: "18px" }}>0</Typography>
                  </div>
                  <Typography style={{ fontSize: "18px" }}>บาท</Typography>
                </Row>
              </Row>
              <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  มูลค่ารายการภาษี 7%
                </Typography>
                <Row>
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      textAlign: "end",
                      paddingRight: "5px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography style={{ fontSize: "18px" }}>0</Typography>
                  </div>
                  <Typography style={{ fontSize: "18px" }}>บาท</Typography>
                </Row>
              </Row>
              <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  ภาษีมูลค่าเพิ่มรวม
                </Typography>
                <Row>
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      textAlign: "end",
                      paddingRight: "5px",
                      marginRight: "20px",
                    }}
                  >
                    <Typography style={{ fontSize: "18px" }}>0</Typography>
                  </div>
                  <Typography style={{ fontSize: "18px" }}>บาท</Typography>
                </Row>
              </Row>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "24%",
                height: "150px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: ThemeColors.darkColor,
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography style={{ fontSize: "18px", color: "white" }}>
                มูลค่าสุทธิรวม
              </Typography>
              <Typography style={{ fontSize: "18px", color: "white" }}>
                0.00 บาท
              </Typography>
            </div>
          </Row>
        </div>
        <Row align="middle" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <CheckSquareOutlined
            style={{
              color: ThemeColors.brickOrangeColor,
              fontSize: "24px",
              marginRight: "5px",
            }}
          />
          <Typography style={{ fontSize: "18px" }}>
            หมายเหตุสำหรับลูกค้า
          </Typography>
        </Row>
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "1px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginTop: "20px",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography style={{ fontSize: "18px" }}>หมายเหตุ</Typography>
          <Form.Item>
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
        </div>
        <Row style={{ marginBottom: "20px" }}>
          <Button
            style={{ height: "50px", backgroundColor: ThemeColors.greenColor }}
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
            }}
          >
            <Typography style={{ fontSize: "18px", color: "white" }}>
              บันทึกร่าง
            </Typography>
          </Button>
          <Button
            style={{ height: "50px", backgroundColor: ThemeColors.waringColor }}
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
