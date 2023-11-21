import { Button, Col, Image, Layout, Menu, Row, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Logo from "../assets/images/utotech-logo.png";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Title from "antd/es/typography/Title";

// this all text
const menu = "Menu";
const companyName = "Utotech co., ltd";
const copyright = " © Copyright Utotech Co., Ltd.. All Rights Reserved";

export const UtotechLayout = (props: any) => {
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
    <Row align="middle" justify="space-between" wrap={false}>
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

  return (
    <>
      <Layout style={styles.layout}>
        <Header style={styles.header}>
          <div style={styles.image}>
            <Image src={Logo} width={60} height={60} preview={false} />
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
                {menu}
              </Button>
              {mobileMenu}
            </Col>
          </div>
        </Header>

        <Content style={styles.content}>
          <div
            style={{
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={styles.footer}>
          <Row justify="start" align="middle">
            <Col>
              <Title
                level={4}
                style={{
                  color: "white",
                }}
              >
                {companyName}
              </Title>
              <Row
                justify="start"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Col span={3}>
                  <MailOutlined style={styles.icon} />
                </Col>
                <Col span={3}>
                  <FacebookOutlined style={styles.icon} />
                </Col>
                <Col span={3}>
                  <InstagramOutlined style={styles.icon} />
                </Col>
              </Row>
              <Typography style={{ color: "white" }}>{copyright}</Typography>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </>
  );
};

const styles = {
  layout: { minHeight: "100vh" } as React.CSSProperties,
  header: {
    paddingLeft: "10%",
    paddingRight: "10%",
    display: "flex",
    top: 0,
    zIndex: 1,
    width: "100%",
    height: "100px",
    position: "sticky",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
  } as React.CSSProperties,
  content: { overflow: "auto" } as React.CSSProperties,
  footer: {
    background: "#106965",
  } as React.CSSProperties,
  image: {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "start",
  } as React.CSSProperties,
  icon: {
    fontSize: "24px",
    color: "white",
    fontWeight: "bold",
  } as React.CSSProperties,
};
