import { ThemeColors } from "../styles/theme";

import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

export const EditCustomerPage = () => {
  const [value, setValue] = useState(1);

  const items: MenuProps["items"] = [
    {
      label: "นิติบุลคล",
      key: "1",
    },
    {
      label: "บุลคลธรรมดา",
      key: "2",
    },
  ];

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onClickItemDropdown: MenuProps["onClick"] = ({ key }) => {
    console.log("key", key);
  };
  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "34px", fontWeight: 500 }}>
            แก้ไขข้อมูลลูกค้า
          </Typography>
          <div style={{ marginBottom: "10px" }}>
            <Button
              style={{
                border: "0",
                height: "50px",
                width: "180px",
                marginRight: "10px",
                backgroundColor: ThemeColors.greenColor,
              }}
            >
              <Typography style={{ fontSize: "18px", color: "white" }}>
                บันทึก
              </Typography>
            </Button>
            <Link to={"/admin/customers"}>
              <Button
                style={{
                  border: "0",
                  height: "50px",
                  width: "180px",
                  marginRight: "10px",
                  fontSize: "18px",
                  backgroundColor: ThemeColors.waringColor,
                  color: ThemeColors.whiteColor,
                }}
              >
                ยกเลิก
              </Button>
            </Link>
          </div>
        </div>
        <div
          style={{
            background: ThemeColors.goldColor,
            height: "3px",
          }}
        />
      </div>
      <div>
        <div
          style={{
            marginTop: "20px",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Row style={{ marginBottom: "20px" }}>
              <div
                style={{
                  height: "80px",
                  width: "40%",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "18px" }}>
                  เลขนิติบุคคล/เลขประจำตัวผู้เสียภาษี
                </Typography>
                <Form.Item>
                  <Input
                    type=""
                    placeholder="0733538001298"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>

              <div
                style={{
                  marginLeft: "20px",
                  height: "80px",
                  width: "40%",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "18px" }}>
                  เลขทะเบียน 13 หลัก
                </Typography>
                <Form.Item>
                  <Input
                    type=""
                    placeholder="หจก.รวยมาก ทำไมอะ"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <div
                style={{
                  height: "80px",
                  width: "40%",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "18px" }}>
                  คำอธิบายธุรกิจ
                </Typography>
                <Form.Item>
                  <Input
                    type=""
                    placeholder="-"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
            </Row>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Typography style={{ fontSize: "34px", fontWeight: 500 }}>
            ข้อมูลช่องทางการติดต่อ
          </Typography>
          <div style={{ marginBottom: "10px" }}></div>
        </div>
        <div
          style={{
            background: ThemeColors.goldColor,
            height: "3px",
          }}
        />
      </div>
      <div style={{ margin: "20px 0 0px 0", display: "flex" }}>
        <div
          style={{
            marginBottom: "10px",
            width: "33%",
            height: "80px",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginRight: "20px",
          }}
        >
          <Typography style={{ fontSize: "18px" }}>เบอร์โทร</Typography>
          <Form.Item>
            <Input
              placeholder="0804237373"
              bordered={false}
              style={{
                padding: "0px",
                fontSize: "16px",
                color: ThemeColors.orangeColor,
              }}
            />
          </Form.Item>
        </div>
        <div
          style={{
            marginBottom: "10px",
            width: "33%",
            height: "80px",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginRight: "20px",
          }}
        >
          <Typography style={{ fontSize: "18px" }}>อีเมล์</Typography>
          <Form.Item>
            <Input
              placeholder="kittiphoom@utotech.org"
              bordered={false}
              style={{
                padding: "0px",
                fontSize: "16px",
                color: ThemeColors.orangeColor,
              }}
            />
          </Form.Item>
        </div>
        <div
          style={{
            marginBottom: "10px",
            width: "33%",
            height: "80px",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
            marginRight: "20px",
          }}
        >
          <Typography style={{ fontSize: "18px" }}>เว็บไซต์</Typography>
          <Form.Item>
            <Input
              placeholder="www.website.com"
              bordered={false}
              style={{
                padding: "0px",
                fontSize: "16px",
                color: ThemeColors.orangeColor,
              }}
            />
          </Form.Item>
        </div>
      </div>
      <div>
        <div>
          <div>
            <Typography
              style={{ fontSize: "34px", fontWeight: 500, marginTop: "10px" }}
            >
              ข้อมูลที่อยู่กิจการ
            </Typography>
            <div style={{ marginBottom: "10px" }}></div>
          </div>
          <div
            style={{
              background: ThemeColors.goldColor,
              height: "3px",
              marginBottom: "20px",
            }}
          />

          <Typography>ที่อยู่ตามทะเบียน</Typography>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                height: "85px",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                marginRight: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>ที่อยู่</Typography>
              <Form.Item>
                <Input
                  placeholder="ห้องเลขที่ 1454/127 ถนน เทพรัตน"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div
              className="status"
              style={{
                width: "50%",
                height: "85px",
                backgroundColor: "white",
                padding: "10px 0 0 10px",
                marginRight: "20px",
                borderRadius: "10px",
                // boxShadow: "2px 2px 2px 3px",
                boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
              }}
            >
              <Typography style={{ fontSize: "1.3rem" }}>ประเทศ</Typography>
              <Form.Item>
                <Dropdown menu={{ items: items, onClick: onClickItemDropdown }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        color: ThemeColors.lightOrangeColor,
                      }}
                    >
                      ไทย
                      <DownOutlined
                        style={{ fontSize: "22px", width: "10px" }}
                      />
                    </Space>
                  </a>
                </Dropdown>
              </Form.Item>
            </div>
          </div>
          <div>
            <Row style={{ marginTop: "20px" }}>
              <div
                style={{
                  marginBottom: "10px",
                  width: "33%",
                  height: "85px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                  marginRight: "20px",
                }}
              >
                <Typography style={{ fontSize: "18px" }}>แขวง/ตำบล</Typography>
                <Form.Item>
                  <Input
                    placeholder="บางนาใต้"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  width: "32%",
                  height: "85px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                  marginRight: "20px",
                }}
              >
                <Typography style={{ fontSize: "18px" }}>เขต/อำเภอ</Typography>
                <Form.Item>
                  <Input
                    placeholder="บางนา"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  width: "31%",
                  height: "85px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                  marginRight: "20px",
                }}
              >
                <Typography style={{ fontSize: "18px" }}>จังหวัด</Typography>
                <Form.Item>
                  <Input
                    placeholder="กรุงเทพมหานคร"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "33%",
                  height: "80px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                  marginRight: "20px",
                }}
              >
                <Typography style={{ fontSize: "18px" }}>
                  รหัสไปรษณีย์
                </Typography>
                <Form.Item>
                  <Input
                    placeholder="10260"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
            </Row>
            <Row>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Space direction="horizontal" size={20}>
                  <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
                    ที่อยู่ส่งเอกสาร
                  </Typography>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>
                      ใช้ข้อมูลเดียวกันกับที่อยู่ตามทะเบียน
                    </Radio>
                    <Radio value={2}>ใช้ข้อมูลใหม่</Radio>
                  </Radio.Group>
                </Space>
              </div>
            </Row>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div
                style={{
                  marginBottom: "10px",
                  width: "70%",
                  height: "85px",
                  backgroundColor: "white",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 2px" + ThemeColors.goldColor,
                  marginRight: "20px",
                }}
              >
                <Typography style={{ fontSize: "18px" }}>ที่อยู่</Typography>
                <Form.Item>
                  <Input
                    placeholder="ห้องเลขที่ 1454/127 ถนน เทพรัตน"
                    bordered={false}
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.orangeColor,
                    }}
                  />
                </Form.Item>
              </div>
              <div
                className="status"
                style={{
                  width: "50%",
                  height: "85px",
                  backgroundColor: "white",
                  padding: "10px 0 0 10px",
                  marginRight: "20px",
                  borderRadius: "10px",
                  // boxShadow: "2px 2px 2px 3px",
                  boxShadow: "2px 2px 5px 2px" + ThemeColors.goldColor,
                }}
              >
                <Typography style={{ fontSize: "1.3rem" }}>ประเทศ</Typography>
                <Form.Item>
                  <Dropdown
                    menu={{ items: items, onClick: onClickItemDropdown }}
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
                        ไทย
                        <DownOutlined
                          style={{ fontSize: "22px", width: "10px" }}
                        />
                      </Space>
                    </a>
                  </Dropdown>
                </Form.Item>
              </div>
            </div>
          </div>
          <Row style={{ margin: "10px 0px 10px 0" }}>
            <div
              style={{
                marginBottom: "10px",
                width: "33%",
                height: "85px",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                marginRight: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>แขวง/ตำบล</Typography>
              <Form.Item>
                <Input
                  placeholder="บางนาใต้"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "32%",
                height: "85px",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                marginRight: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>เขต/อำเภอ</Typography>
              <Form.Item>
                <Input
                  placeholder="บางนา"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "31%",
                height: "85px",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                marginRight: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>จังหวัด</Typography>
              <Form.Item>
                <Input
                  placeholder="กรุงเทพมหานคร"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                marginTop: "10px",
                width: "33%",
                height: "85px",
                backgroundColor: "white",
                paddingTop: "10px",
                paddingLeft: "10px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
                marginRight: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>รหัสไปรษณีย์</Typography>
              <Form.Item>
                <Input
                  placeholder="10260"
                  bordered={false}
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
          </Row>
        </div>
      </div>
      <div
        style={{
          marginTop: "80px",
          background: ThemeColors.goldColor,
          height: "3px",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};
