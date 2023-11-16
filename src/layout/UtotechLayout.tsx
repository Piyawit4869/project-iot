import { Button, Col, Image, Layout, Row, Typography } from "antd";

import { Content, Footer, Header } from "antd/es/layout/layout";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/utotech-logo.png";
import { useLocation } from "react-router-dom";

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
            <Button type="link">
              <Image src={Logo} width={60} height={60} preview={false}></Image>
            </Button>
          </div>
          <Row align={"middle"}>
            <Button
              size={"middle"}
              type="link"
              style={{ color: "black" }}
              href="/"
            >
              Project
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
        <Content
          style={{ backgroundColor: ThemeColors.bgColor, overflow: "auto" }}
        >
          <div
            style={{
              paddingTop: 36,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ background: "#61C2A2" }}>
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
        </Footer>
      </Layout>
    </>
  );
};
