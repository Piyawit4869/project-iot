import { Button, Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

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
// Mock data
const mockData = [
  {
    id: 1,
    title: "Website",
    description: "Description for Item 1",
    image: "https://cdn-icons-png.flaticon.com/512/6471/6471842.png",
  },
  {
    id: 2,
    title: "Web Application",
    description: "Description for Item 2",
    image: "https://cdn-icons-png.flaticon.com/512/5447/5447882.png",
  },
  {
    id: 3,
    title: "Mobile Application",
    description: "Description for Item 3",
    image: "https://cdn-icons-png.flaticon.com/512/6213/6213889.png",
  },
  {
    id: 4,
    title: "Android and IOS",
    description: "Description for Item 4",
    image:
      "https://cdn0.iconfinder.com/data/icons/influencer-marketing-wildberry-volume-1/256/Cross_Platform-512.png",
  },
  {
    id: 5,
    title: "IOT",
    description: "Description for Item 5",
    image: "https://cdn-icons-png.flaticon.com/512/6091/6091352.png",
  },
];

export const Utotech: React.FC = () => {
  const buttonStyle = {
    width: "200px",
    borderRadius: "0px",
    color: "white",
    transition: "background-color 0.3s ease-in-out", // Optional: Add a smooth transition effect
  };

  const buttonHoverStyle = {
    backgroundColor: "#1890ff",
    // Change to the desired color on hover
  };

  return (
    <div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={
          "https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-6016x3384-8324.png"
        }
        strength={200}
        bgImageStyle={{ objectFit: "cover" }}
        bgImageAlt="the dog"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          marginBottom: "120px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Typography
            style={{
              fontSize: "36px",
              marginBottom: "20px",
              textAlign: "center",
              color: "white",
            }}
          >
            Welcome to UTOTECH COMPANY LIMITED
          </Typography>
          <TypeAnimation
            sequence={bannerTexts}
            speed={50}
            repeat={Infinity}
            style={{ fontSize: "28px", color: "white", textAlign: "center" }}
          />
        </div>
      </Parallax>

      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginBottom: "120px",
        }}
      >
        <Typography style={{ fontSize: "28px", marginBottom: "10px" }}>
          What we can do
        </Typography>
        <Typography
          style={{ fontSize: "18px", color: "grey", marginBottom: "20px" }}
        >
          I'd be happy to help once I have a better understanding of your
          request.
        </Typography>
        <Row gutter={[16, 16]}>
          {mockData.map((item, id) => (
            <Col key={item.id} span={24} md={12} lg={12} xl={12}>
              <Link to={`option/${id}`}>
                <Card style={{ backgroundColor: "#aaf0d1" }}>
                  <Row justify="center">
                    <div style={{ width: "50%", objectFit: "cover" }}>
                      <Image preview={false} src={item.image} />
                    </div>
                  </Row>

                  <h2>{item.title}</h2>
                  <div style={{ height: "100px" }}>
                    <p>{item.description}</p>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={
          "https://i2.wp.com/catesthill.com/wp-content/uploads/2019/12/catesthill-shoreditch-loft-kasia-fiszer-32.jpg?fit=2400%2C1600&ssl=1"
        }
        strength={200}
        bgImageStyle={{ objectFit: "cover" }}
        style={{ width: "100%" }}
      >
        <div style={{ height: "80vh" }} />
      </Parallax>

      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginTop: "250px",
          marginBottom: "250px",
        }}
      >
        <Row justify="center">
          <Typography
            style={{
              fontSize: "38px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </Typography>
        </Row>
      </div>

      <Parallax
        bgImage="https://picjumbo.com/wp-content/uploads/black-styled-minimal-office-things-room-for-text-free-photo.jpg"
        strength={300}
        blur={{ min: -15, max: 15 }}
        bgImageStyle={{ objectFit: "cover" }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <Typography
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              textAlign: "center",
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Button style={{ ...buttonStyle, ...buttonHoverStyle }}>
            Let's chat
          </Button>
        </div>
      </Parallax>
    </div>
  );
};
