import { Card, Image, Row, Typography } from "antd";
import { ThemeColors } from "../../styles/theme";
import Logo from "../../assets/images/Logo-StayOrganized.png";
import ThaiParNich from "../../assets/images/thaiparnich.png";
import CommentOutlined from "@ant-design/icons/lib/icons/CommentOutlined";
import { DollarOutlined } from "@ant-design/icons";

/**
 * this component is a box of title
 * @param title
 * @returns {Title("")} Box of title
 */
export const Preview = () => {
  return (
    <Card
      style={{
        width: "70%",
        height: "100%",
        borderRadius: "25px",
        marginLeft: "30px",
        backgroundColor: ThemeColors.lightOrangeColor,
      }}
    >
      <Card
        style={{
          height: "100%",
          borderRadius: "25px",
          backgroundColor: ThemeColors.whiteColor,
        }}
      >
        <Row justify="space-between">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              backgroundColor: ThemeColors.orangeColor,
            }}
          >
            <Image width={35} src={Logo} preview={false} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Typography>(ต้นฉบับ)</Typography>
            <Typography>ใบเสนอราคา</Typography>
          </div>
        </Row>
        <Row justify="space-between" wrap={false}>
          <div>
            <Typography>Company name</Typography>
            <Typography>
              ห้องเลขที่ 1454/127 ถนน เทพรัตน แขวงบางนาใต้ เขตบางนา
              กรุงเทพมหานคร 10260
            </Typography>
            <Typography>เลขที่ผู้เสียภาษี : 0105565119323</Typography>
            <Typography>เบอร์โทรศัพท์ : 080-423-7373</Typography>
            <Typography>E-mail : kiattiphoom@utotech.org</Typography>
          </div>
          <Card
            bodyStyle={{ padding: "10px" }}
            style={{ backgroundColor: ThemeColors.lightYellowColor }}
          >
            <Typography>เลขที่เอกสาร : QO-20230700001</Typography>
            <Typography>วันที่ออก : -</Typography>
            <Typography>ใช้ได้ถึง : -</Typography>
            <Typography>อ้างอิง : -</Typography>
          </Card>
        </Row>
        <div
          style={{
            background: ThemeColors.goldColor,
            margin: "10px 0px 10px 0px",
            height: "1px",
          }}
        />
        <Row justify="space-between">
          <div style={{ width: "33%" }}>
            <Typography>ออกให้กับ : -</Typography>
            <Typography>ที่อยู่ : -</Typography>
            <Typography>เลขที่เสียภาษี : -</Typography>
          </div>
          <div style={{ width: "33%" }}>
            <Typography>เบอร์โทรศัพท์ : -</Typography>
            <Typography>E-mail : -</Typography>
          </div>
        </Row>
        <Card
          bodyStyle={{ padding: "10px" }}
          style={{
            backgroundColor: ThemeColors.lightYellowColor,
            marginTop: "10px",
          }}
        >
          <Row justify="space-between">
            <Typography>คำอธิบาย</Typography>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>จำนวน</Typography>
              <Typography>ราคา/ต่อหน่วย</Typography>
              <Typography>รวม</Typography>
            </div>
          </Row>
        </Card>
        <div style={{ height: "300px" }}>
          <Card bodyStyle={{ padding: "10px" }}>
            <Row justify="space-between">
              <Typography>1.Topic</Typography>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>0</Typography>
                <Typography>0</Typography>
                <Typography>0</Typography>
              </div>
            </Row>
          </Card>
        </div>
        <div
          style={{
            background: ThemeColors.goldColor,
            margin: "10px 0px 10px 0px",
            height: "1px",
          }}
        />
        <Row justify="space-between">
          <Row>
            <CommentOutlined
              style={{
                marginRight: "5px",
                fontSize: "20px",
                color: ThemeColors.lightOrangeColor,
              }}
            />
            <Typography>หมายเหตุ : </Typography>
          </Row>

          <div style={{ width: "30%" }}>
            <div style={{ padding: "5px 5px 5px 5px" }}>
              <Row justify="space-between">
                <Typography>จำนวนเงินรวม</Typography>
                <Row justify="space-between">
                  <Typography style={{ marginRight: "5px" }}>0.00</Typography>
                  <Typography>บาท</Typography>
                </Row>
              </Row>
              <Row justify="space-between">
                <Typography>หัก ส่วนร่วม</Typography>
                <Row justify="space-between">
                  <Typography style={{ marginRight: "5px" }}>0.00</Typography>
                  <Typography>บาท</Typography>
                </Row>
              </Row>
              <Row justify="space-between">
                <Typography>หัก ภาษี ณ ที่จ่าย</Typography>
                <Row justify="space-between">
                  <Typography style={{ marginRight: "5px" }}>0.00</Typography>
                  <Typography>บาท</Typography>
                </Row>
              </Row>
              <Row justify="space-between">
                <Typography>จำนวนภาษีมูลค่าเพิ่ม</Typography>
                <Row>
                  <Typography style={{ marginRight: "5px" }}>0.00</Typography>
                  <Typography>บาท</Typography>
                </Row>
              </Row>
            </div>

            <Card
              bodyStyle={{
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: ThemeColors.lightYellowColor,
              }}
            >
              <Row justify="space-between">
                <Typography>จำนวนเงินที่ต้องชำระ</Typography>
                <Row>
                  <Typography style={{ marginRight: "5px" }}>0</Typography>
                  <Typography>บาท</Typography>
                </Row>
              </Row>
            </Card>
            <Row justify="end">
              <Typography>(ศูนย์บาทถ้วน)</Typography>
            </Row>
            <Card
              bodyStyle={{
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: ThemeColors.lightGreenColor,
              }}
            >
              <Row>
                <DollarOutlined
                  style={{
                    marginRight: "5px",
                    fontSize: "20px",
                    color: ThemeColors.lightOrangeColor,
                  }}
                />
                <Typography>ช่องทางการชำระเงิน</Typography>
              </Row>
              <Row wrap={false}>
                <Image width="150px" src={ThaiParNich}></Image>
                <Typography>
                  ธนาคาร ไทยพาณิชย์ ออมทรัพย์ 4301609608 ยูโทเทค
                </Typography>
              </Row>
            </Card>
          </div>
        </Row>
        <div
          style={{
            background: ThemeColors.goldColor,
            margin: "10px 0px 10px 0px",
            height: "1px",
          }}
        />
        <Row justify="space-around">
          <div>
            <Typography style={{ marginBottom: "100px" }}>
              Company name
            </Typography>
            <Typography>30/07/2566</Typography>
          </div>
          <div>
            <Typography style={{ marginBottom: "100px" }}>
              ผู้รับเอกสาร
            </Typography>
            <Typography>30/07/2566</Typography>
          </div>
        </Row>
      </Card>
    </Card>
  );
};
