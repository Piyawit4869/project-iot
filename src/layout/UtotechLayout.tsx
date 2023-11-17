import { Button, Col, Image, Layout, Row, Typography } from "antd";

import { Content, Footer, Header } from "antd/es/layout/layout";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/utotech-logo.png";
import { useLocation } from "react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";

export const UtotechLayout = (props: any) => {
  const location = useLocation();

  console.log(location);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            display: "flex",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "100px",
            position: "sticky",
            backgroundColor: ThemeColors.whiteColor,
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Image src={Logo} width={60} height={60} preview={false}></Image>
          </div>
          <Row align={"middle"}>
            <Button
              size={"middle"}
              type="link"
              style={{ color: "black" }}
              href="/"
            >
              Home
            </Button>
            <Button
              size={"middle"}
              type="link"
              style={{ color: "black" }}
              href="about"
            >
              About
            </Button>
            <Button
              size={"middle"}
              type="link"
              style={{ color: "black" }}
              href="contact"
            >
              Contact
            </Button>
          </Row>
        </Header>
        <Content style={{ overflow: "auto" }}>
          <div
            style={{
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ background: "#aaf0d1" }}>
          <Row justify="space-around" align="middle">
            <Col>
              <Typography style={{ fontSize: "24px" }}>
                Utotech co., ltd
              </Typography>
            </Col>
            <Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Image src={Logo} width={120} preview={false}></Image>
                <Typography style={{ fontSize: "18px", textAlign: "center" }}>
                  © Copyright Utotech Co., Ltd.. All Rights Reserved
                </Typography>
              </div>
            </Col>
            <Row>
              <MailOutlined style={{ fontSize: "24px" }} />
              <FacebookOutlined
                style={{
                  fontSize: "24px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <InstagramOutlined style={{ fontSize: "24px" }} />
            </Row>
          </Row>
          {/* <Row justify="center" style={{ marginTop: "60px" }}>
            <Col>
              <Typography>
                © Copyright Utotech Co., Ltd.. All Rights Reserved
              </Typography>
            </Col>
          </Row> */}
        </Footer>
        {/* <Footer style={{ background: "#61C2A2" }}>
          <Row justify="space-around" align="middle">
            <Col>
              <Typography style={{ fontSize: "24px" }}>
                Utotech co., ltd
              </Typography>
            </Col>
            <Col>
              <div>
                <Typography>Contact us</Typography>
                <br />
                <Typography>+66 080-423-7373</Typography>
                <Typography>kiattiphoom@utotech.org</Typography>
              </div>
            </Col>
            <Col>
              <div>
                <Typography>Address</Typography>
                <br />
                <div style={{ width: "200px" }}>
                  <Typography>
                    61/723 Nakhon Chai Si District, Nakhon Pathom 73120
                  </Typography>
                </div>
              </div>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "60px" }}>
            <Col>
              <Typography>
                © Copyright Utotech Co., Ltd.. All Rights Reserved
              </Typography>
            </Col>
          </Row>
        </Footer> */}
      </Layout>
    </>
  );
};
