import { ThemeColors } from "../styles/theme";

import { Button, Row, Space, Typography, Upload } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const IndexOrganizationPage = () => {
  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "34px", fontWeight: 500 }}>
            เพิ่มผู้ใช้งาน
          </Typography>
          <div style={{ marginBottom: "10px" }}>
            <Link to={"/admin/organozation/update"}>
              <Button
                style={{
                  border: "0",
                  height: "50px",
                  width: "180px",
                  marginRight: "10px",
                  backgroundColor: ThemeColors.lightOrangeColor,
                }}
              >
                <Typography style={{ fontSize: "18px", color: "white" }}>
                  แก้ไข
                </Typography>
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
      <div style={{ margin: "10px 0 10px 0" }}>
        <Typography style={{ fontSize: "16px", color: ThemeColors.grayColor }}>
          ตั้งค่าข้อมูลพื้นฐานของกิจการ และข้อมูลที่อยู่เพื่อใช้แสดงในหน้าเอกสาร
        </Typography>
        <div
          style={{
            marginTop: "20px",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "50%" }}>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",

                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                รูปแบบกิจการ
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                บริษัทจำกัด
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                เลข 13 หลัก
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                0-1055-65119-323
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                สาขา
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                สำนักงานใหญ่
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                ชื่อกิจการ
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                บริษัท ยูโทเทค จำกัด
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                คำอธิบายธุรกิจ
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                software house
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                วันที่จดทะเบียนกิจการ
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                25/07/2022
              </Typography>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  width: "35%",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: ThemeColors.blackColor,
                  marginRight: "10%",
                }}
              >
                จดทะเบียนภาษีมูลค่าเพิ่ม
              </Typography>

              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: ThemeColors.grayColor,
                }}
              >
                ไม่จดทะเบียนภาษีมูลค่าเพิ่ม
              </Typography>
            </Row>
          </div>
          <div style={{ margin: "auto" }}>
            <Space direction="vertical" align="center" size={50}>
              <Typography
                style={{ color: ThemeColors.blackColor, fontSize: "16px" }}
              >
                โลโก้กิจการ/องค์กร
              </Typography>
              <Upload listType="picture" accept=".png,.jpg.jpeg">
                <Button
                  icon={
                    <PlusCircleFilled
                      style={{
                        color: ThemeColors.orangeColor,
                        fontSize: "65px",
                      }}
                    />
                  }
                  style={{
                    border: "2px solid " + ThemeColors.orangeColor,
                    height: "150px",
                    width: "150px",
                    marginRight: "10px",
                    textAlign: "center",
                    backgroundColor: ThemeColors.bgColor,
                  }}
                ></Button>
              </Upload>
            </Space>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      <div style={{ marginTop: "20px" }}>
        <Row style={{ marginBottom: "20px" }}>
          <Typography
            style={{
              width: "12%",
              fontSize: "20px",
              fontWeight: "500",
              color: ThemeColors.blackColor,
              marginRight: "10%",
            }}
          >
            เบอร์โทร
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: ThemeColors.grayColor,
            }}
          >
            0804237373
          </Typography>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Typography
            style={{
              width: "12%",
              fontSize: "20px",
              fontWeight: "500",
              color: ThemeColors.blackColor,
              marginRight: "10%",
            }}
          >
            อีเมล์
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: ThemeColors.grayColor,
            }}
          >
            kittiphoom@utotech.org
          </Typography>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Typography
            style={{
              width: "12%",
              fontSize: "20px",
              fontWeight: "500",
              color: ThemeColors.blackColor,
              marginRight: "10%",
            }}
          >
            เว็บไซต์
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: ThemeColors.grayColor,
            }}
          >
            -
          </Typography>
        </Row>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "34px", fontWeight: 500 }}>
            ข้อมูลที่อยู่องค์กร
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
      <div style={{ marginTop: "20px" }}>
        <Typography
          style={{
            marginBottom: "10px",
            fontSize: "20px",
            fontWeight: "500",
            color: ThemeColors.blackColor,
            marginRight: "10%",
          }}
        >
          ที่อยู่ตามทะเบียน
        </Typography>

        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: ThemeColors.grayColor,
          }}
        >
          ห้องเลขที่ 1454/127 ถนน เทพรัตน
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: ThemeColors.grayColor,
          }}
        >
          แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260
        </Typography>
        <Typography
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "20px",
            fontWeight: "500",
            color: ThemeColors.blackColor,
            marginRight: "10%",
          }}
        >
          ที่อยู่ส่งเอกสาร
        </Typography>

        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: ThemeColors.grayColor,
          }}
        >
          ห้องเลขที่ 1454/127 ถนน เทพรัตน
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: ThemeColors.grayColor,
          }}
        >
          แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260
        </Typography>
      </div>
    </div>
  );
};
