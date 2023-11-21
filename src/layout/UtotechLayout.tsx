import { Button, Col, Image, Layout, Menu, Row, Typography } from "antd";

import { Content, Footer, Header } from "antd/es/layout/layout";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/utotech-logo.png";
import { useLocation } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const UtotechLayout = (props: any) => {
  const location = useLocation();

  const [isMobileMenuVisible, setMobileMenuVisibility] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuVisibility(!isMobileMenuVisible);
  };

  const handleMenuItemClick = () => {
    setMobileMenuVisibility(false);
  };

  const menuItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About", href: "/about" },
    { key: "contact", label: "Contact", href: "/contact" },
  ];

  const desktopMenu = (
    <Row align="middle" justify="space-between" style={{ width: "220px" }}>
      {menuItems.map((item) => (
        <Button
          key={item.key}
          size="middle"
          type="link"
          style={{ color: "black" }}
          href={item.href}
        >
          {item.label}
        </Button>
      ))}
    </Row>
  );

  const mobileMenu = (
    <Menu
      theme="light"
      mode="vertical"
      onClick={handleMenuItemClick}
      style={{ display: isMobileMenuVisible ? "block" : "none" }}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <a href={item.href}>{item.label}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

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

          <div>
            <Col xs={{ span: 0 }} lg={{ span: 12 }}>
              {desktopMenu}
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 0 }}>
              <Button
                type="link"
                onClick={handleMenuClick}
                style={{ color: "black" }}
              >
                Menu
              </Button>
              {mobileMenu}
            </Col>
          </div>

          {/* <Row align={"middle"}>
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
          </Row> */}
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

        {/* this one side minimal footer */}

        <Footer style={{ background: "#106965" }}>
          <Row justify="start" align="middle">
            <Col>
              <Typography
                style={{ fontSize: "22px", color: "white", fontWeight: "bold" }}
              >
                Utotech co., ltd
              </Typography>
              <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                <MailOutlined
                  style={{
                    fontSize: "24px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <FacebookOutlined
                  style={{
                    fontSize: "24px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <InstagramOutlined
                  style={{
                    fontSize: "24px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Row>
              <Typography
                style={{ fontSize: "16px", color: "white", fontWeight: "" }}
              >
                © Copyright Utotech Co., Ltd.. All Rights Reserved
              </Typography>
            </Col>
          </Row>
        </Footer>

        {/* this minimal footer */}

        {/* <Footer style={{ background: "#25B0AB" }}>
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
        </Footer> */}

        {/* This full footer */}

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
