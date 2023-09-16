import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Radio,
  RadioChangeEvent,
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
import { Preview } from "../components/global/Preview";
import { useEffect, useState } from "react";

export const CreateQuotationPage = () => {
    // const dataValues= (
    //   refer:number, 
    //   number:number, 
    //   cusName:string, 
    //   tell:number, 
    //   address:string) => {
    //   const obj= {
    //     refer: refer,
    //     number: number,
    //     cusName: cusName,
    //     tell: tell,
    //     address: address,
    //   };
    //   localStorage.setItem('data',JSON.stringify({...obj}));
    // };

  const [data, setData] = useState (() => {
    const savedData = localStorage.getItem("data") as string;
    const parsedData = JSON.parse(savedData);
    return parsedData || "";
  })

  const handleChange = (event:any) => {
    setData(event.target.value);
  }

  useEffect (() => {
    localStorage.setItem('data',JSON.stringify(data));
  }, [data]);

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [listOfProductCard, setListOfProductCard] = useState([{}]);

  console.log(listOfProductCard);
  const onClickAddCard = () => {
    setListOfProductCard((array) => [...array, {}]);
  };

  const onClickDeleteCard = () => {
    setListOfProductCard((array) => array.splice(1));
  };

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
      {Title("Create Quotation", false, "")}

      <Form style={{ marginTop: "40px" }}>
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
                <Form.Item>
                  <Input
                  value={data}
                  onChange={handleChange}
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
                <Typography style={{ fontSize: "16px" }}>
                  เลขที่เอกสาร
                </Typography>
                <Form.Item>
                  <Input
                  value={data}
                  onChange={handleChange}
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
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อ",
                    },
                  ]}
                >
                  <Input
                  value={data}
                  onChange={handleChange}
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
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อ",
                    },
                  ]}
                >
                  <Input
                  value={data}
                  onChange={handleChange}
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
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่",
                  },
                ]}
              >
                <Input
                value={data}
                onChange={handleChange}
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
              </Card>
            </Row>
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
              </Card>
            </Row>
          </div>
          <Preview 
            refer={data}
            number={data}
            cusName={data}
            tell={data}
            address={data}
          ></Preview>
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
        {...listOfProductCard.map(() => {
          return (
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
              <Row justify={"space-between"} wrap={false}>
                <Card
                  bodyStyle={{ padding: "0px" }}
                  style={{
                    width: "100%",
                    height: "70px",
                    backgroundColor: ThemeColors.goldColor,
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "10px",

                    marginBottom: "10px",
                  }}
                >
                  <Typography style={{ fontSize: "16px" }}>
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
                </Card>
                <Card
                  bodyStyle={{ padding: "0px" }}
                  style={{
                    width: "100%",
                    height: "70px",
                    backgroundColor: ThemeColors.goldColor,
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Typography style={{ fontSize: "16px" }}>บัญชี</Typography>
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
                </Card>
                <Card
                  bodyStyle={{ padding: "0px" }}
                  style={{
                    width: "100%",
                    height: "70px",
                    backgroundColor: ThemeColors.goldColor,
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography style={{ fontSize: "16px" }}>คำอธิบาย</Typography>
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
                </Card>
              </Row>
              <Row justify={"space-between"} align={"middle"} wrap={false}>
                <Row style={{ width: "100%" }} wrap={false}>
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: ThemeColors.goldColor,
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "16px" }}>จำนวน</Typography>
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
                  </Card>
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: ThemeColors.goldColor,
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "16px" }}>
                      ราคา/หน่วย
                    </Typography>
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
                  </Card>
                </Row>
                <Row style={{ width: "100%" }} wrap={false}>
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: ThemeColors.goldColor,
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "16px" }}>
                      ส่วนลด/หน่วย
                    </Typography>
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
                  </Card>
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: ThemeColors.goldColor,
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "16px" }}>ภาษี </Typography>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกชื่อ",
                        },
                      ]}
                    >
                      <Dropdown
                        menu={{
                          items: itemsCurrency,
                          onClick: onClickCurrency,
                        }}
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
                  </Card>
                </Row>
                <Row style={{ width: "100%" }} wrap={false}>
                  <Card
                    bodyStyle={{ padding: "0px" }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "70px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      marginLeft: "10px",
                      textAlign: "center",
                    }}
                  >
                    <Typography style={{ fontSize: "16px" }}>
                      ลบรายการ
                    </Typography>
                  </Card>
                  <Button
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: ThemeColors.orangeColor,
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                    onClick={onClickDeleteCard}
                  >
                    <Row justify={"center"} align={"middle"}>
                      <Card
                        bodyStyle={{ padding: "0px" }}
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
                          style={{
                            color: ThemeColors.orangeColor,
                            fontSize: "24px",
                          }}
                        />
                      </Card>

                      <Typography style={{ fontSize: "16px" }}>ลบ </Typography>
                    </Row>
                  </Button>
                </Row>
              </Row>
            </div>
          );
        })}

        <Typography
          style={{
            fontSize: "18px",
            color: ThemeColors.goldColor,
            marginBottom: "20px",
          }}
        >
          ปุ่มเพิ่มรายการ
        </Typography>
        <Button
          style={{
            width: "120px",
            height: "70px",
            backgroundColor: ThemeColors.orangeColor,
            borderRadius: "10px",
            marginBottom: "20px",
          }}
          onClick={onClickAddCard}
        >
          <Row justify={"center"} align={"middle"}>
            <Card
              bodyStyle={{ padding: "0px" }}
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
            </Card>

            <Typography style={{ fontSize: "16px" }}>เพิ่ม </Typography>
          </Row>
        </Button>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <Radio.Group size="large" onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>in vat 7% </Radio>
              <Radio value={2}>out vat 7%</Radio>
            </Space>
          </Radio.Group>
        </div>

        <Card
          bodyStyle={{ padding: "0px" }}
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
            <Card
              bodyStyle={{ padding: "0px" }}
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
            </Card>
          </Row>
        </Card>
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
          <Typography style={{ fontSize: "16px" }}>หมายเหตุ</Typography>
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
        </Card>
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
