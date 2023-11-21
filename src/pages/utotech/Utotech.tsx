import { Button, Card, Col, Image, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { Parallax } from "react-parallax";
import { Link, useLoaderData } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

import * as API from "../../apis";

// This all text
const welcome = "Welcome to UTOTECH COMPANY LIMITED";
const weCanDo = "What we can do";
const subWeCanDo =
  " I'd be happy to help once I have a better understanding of your request.";
const largeText =
  "Contrary to popular belief, Lorem Ipsum is not simply random text.";
const contact = " Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const letChat = "Let's chat";

//this all image
const welcomImage =
  "https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png";
const officeImage =
  "https://i2.wp.com/catesthill.com/wp-content/uploads/2019/12/catesthill-shoreditch-loft-kasia-fiszer-32.jpg?fit=2400%2C1600&ssl=1";

const letChatImage =
  "https://picjumbo.com/wp-content/uploads/black-styled-minimal-office-things-room-for-text-free-photo.jpg";

const bannerTexts = [
  "We're ready for Develop Website",
  3000,
  "We're ready for Develop Web Application",
  3000,
  "We're ready for Develop Mobile Application",
  3000,
  "We're ready for Android and IOS",
  3000,
  "We're ready for Develop IOT",
  3000,
];
// // Mock data
// const mockData = [
//   {
//     id: 1,
//     title: "Website",
//     description: "Description for Item 1",
//     image: "https://cdn-icons-png.flaticon.com/512/6471/6471842.png",
//   },
//   {
//     id: 2,
//     title: "Web Application",
//     description: "Description for Item 2",
//     image: "https://cdn-icons-png.flaticon.com/512/5447/5447882.png",
//   },
//   {
//     id: 3,
//     title: "Mobile Application",
//     description: "Description for Item 3",
//     image: "https://cdn-icons-png.flaticon.com/512/6213/6213889.png",
//   },
//   {
//     id: 4,
//     title: "Android and IOS",
//     description: "Description for Item 4",
//     image:
//       "https://cdn0.iconfinder.com/data/icons/influencer-marketing-wildberry-volume-1/256/Cross_Platform-512.png",
//   },
//   {
//     id: 5,
//     title: "IOT",
//     description: "Description for Item 5",
//     image: "https://cdn-icons-png.flaticon.com/512/6091/6091352.png",
//   },
// ];

export async function featuresHomeIndexLoader() {
  try {
    const { data } = await API.features.gets();

    // console.log(data);

    return { data: data };
  } catch (error) {
    return { data: null };
  }
}

export const Utotech: React.FC = () => {
  const { data } = useLoaderData() as any;
  console.log(data);

  return (
    <div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={welcomImage}
        strength={200}
        bgImageStyle={{ objectFit: "cover" }}
        bgImageAlt="the dog"
        style={styles.welcome}
      >
        <div style={styles.welcomeFlexBox}>
          <Title level={2} style={{ color: "white" }}>
            {welcome}
          </Title>
          <TypeAnimation
            sequence={bannerTexts}
            speed={50}
            repeat={Infinity}
            style={styles.typeAnimation}
          />
        </div>
      </Parallax>

      <div style={styles.featuresBox}>
        <Title level={4}>{weCanDo}</Title>
        <Typography style={{ color: "grey" }}>{subWeCanDo}</Typography>
        <Row gutter={[16, 16]} style={styles.marginVertical}>
          {data.map((item: any) => (
            <Col key={item.id} span={24} md={12} lg={12} xl={12}>
              <Link to={`option/${item.id}`}>
                <Card
                  style={{
                    ...styles.card,
                    ...(item.isHovered ? styles.cardHovered : {}),
                  }}
                  hoverable
                >
                  <Row justify="center">
                    <div style={styles.featureImage}>
                      <Image preview={false} src={item.imageUrl} />
                    </div>
                  </Row>

                  <Title level={4} style={{ color: "white" }}>
                    {item.title}
                  </Title>
                  <div style={styles.featureDescription}>
                    <Typography style={{ color: "white" }}>
                      {item.description}
                    </Typography>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Row justify="center">
          <Button type="primary" href="/all-feature">
            See more
          </Button>
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

      <div style={styles.largeTextBox}>
        <Row justify="center">
          <Title level={1} style={{ textAlign: "center" }}>
            {largeText}
          </Title>
        </Row>
      </div>

      <Parallax
        bgImage={letChatImage}
        strength={300}
        blur={{ min: -15, max: 15 }}
        bgImageStyle={{ objectFit: "cover" }}
        style={styles.welcome}
      >
        <div style={styles.letChatBox}>
          <Typography
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            {contact}
          </Typography>
          <Button
            type="primary"
            style={{
              marginTop: "20px",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            {letChat}
          </Button>
        </div>
      </Parallax>
    </div>
  );
};

export const styles = {
  welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  } as React.CSSProperties,
  welcomeFlexBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  } as React.CSSProperties,
  typeAnimation: {
    fontSize: "20px",
    color: "white",
    textAlign: "center",
  } as React.CSSProperties,
  featuresBox: {
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "120px",
    marginBottom: "120px",
  } as React.CSSProperties,
  featureImage: { width: "50%", objectFit: "cover" } as React.CSSProperties,
  featureDescription: {
    color: "white",
    fontSize: "16px",
    marginBottom: "20px",
  } as React.CSSProperties,
  largeTextBox: {
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "250px",
    marginBottom: "250px",
  } as React.CSSProperties,
  letChatBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  } as React.CSSProperties,
  marginVertical: {
    marginTop: "20px",
    marginBottom: "20px",
  } as React.CSSProperties,

  card: {
    height: "100%",
    transition: "transform 0.3s",
  } as React.CSSProperties,
  cardHovered: {
    transform: "scale(1.1)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 1)",
  } as React.CSSProperties,
};
