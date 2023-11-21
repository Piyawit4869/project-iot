import { Typography, Row, Image, Col } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { Parallax } from "react-parallax";

import * as API from "../../apis";
import { useLoaderData } from "react-router-dom";

//this all text
const aboutTitle = "About UTOTECH COMPANY LIMITED";
const aboutSubtitle =
  "Utotech is a web design & coding studio based in Bangkok. We help you create and enhance your brand through smart, distinct and meaningful digital experience design.";
const infomation = "INFORMATION";
const infomationSubtitle = "Details of work performed at the internship";

//this all image
const officeImage =
  "https://i2.wp.com/catesthill.com/wp-content/uploads/2019/12/catesthill-shoreditch-loft-kasia-fiszer-32.jpg?fit=2400%2C1600&ssl=1";

export async function optionIndexLoader() {
  try {
    const { data } = await API.options.getAll();

    return { data: data };
  } catch (error) {
    return { data: null };
  }
}

export const AboutUs = () => {
  const { data } = useLoaderData() as any;

  console.log(data);

  return (
    <div>
      <div style={styles.titleBox}>
        <Row justify="center">
          <Title level={4} style={{ textAlign: "center" }}>
            {aboutTitle}
          </Title>
        </Row>
        <Row justify="center" style={styles.spaceTitleBox}>
          <Typography style={{ color: "grey" }}>{aboutSubtitle}</Typography>
        </Row>
      </div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={officeImage}
        strength={200}
        bgImageStyle={{ objectFit: "cover" }}
        style={{ width: "100%" }}
      >
        <div style={{ height: "80vh" }} />
      </Parallax>
      <div style={styles.outOfContentBox}>
        <div style={styles.contentsBox}>
          <Title level={3}>{infomation}</Title>
          <Typography style={{ color: "grey" }}>
            {infomationSubtitle}
          </Typography>
        </div>
        <Row gutter={16}>
          {data.map((item: any) => (
            <Col key={item.id} span={24}>
              <div>
                <Row justify="space-around" align="middle">
                  <div style={styles.optionBox}>
                    <Image src={item.imageUrl} width="200px" preview={false} />
                    <Title level={5}>{item.title}</Title>
                  </div>
                  <div style={{ width: "250px", marginBottom: "20px" }}>
                    <Typography
                      style={{
                        color: "grey",
                        textAlign: "center",
                      }}
                    >
                      {item.subTitle}
                    </Typography>
                  </div>
                  <div style={{ width: "300px" }}>
                    <Typography style={{ color: "grey" }}>
                      {item.description}
                    </Typography>
                  </div>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const styles = {
  titleBox: {
    paddingTop: 36,
    paddingLeft: "10%",
    paddingRight: "10%",
  } as React.CSSProperties,
  spaceTitleBox: {
    paddingTop: "30px",
    paddingBottom: "60px",
  } as React.CSSProperties,
  outOfContentBox: {
    marginTop: "120px",
    marginBottom: "120px",
    paddingLeft: "10%",
    paddingRight: "10%",
  } as React.CSSProperties,
  contentsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  } as React.CSSProperties,
  optionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "250px",
  } as React.CSSProperties,
};
