import { Button, Card, Col, Grid, Image, Row, Typography } from "antd";
import React from "react";

// Mock data
const mockData = [
  { id: 1, title: "Item 1", description: "Description for Item 1" },
  { id: 2, title: "Item 2", description: "Description for Item 2" },
  { id: 3, title: "Item 3", description: "Description for Item 3" },
  { id: 4, title: "Item 4", description: "Description for Item 4" },
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
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginBottom: "120px",
        }}
      >
        <div style={{ width: "60%" }}>
          <Typography style={{ fontSize: "36px" }}>
            Welcome to UTOTECH COMPANY LIMITED
          </Typography>
        </div>

        <Row
          justify="center"
          style={{
            paddingTop: "30px",
            paddingLeft: "25%",
            paddingRight: "25%",
            paddingBottom: "60px",
          }}
        >
          <Typography style={{ fontSize: "20px", color: "grey" }}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Typography>
        </Row>
        <Typography style={{ fontSize: "28px", marginBottom: "10px" }}>
          What we can do
        </Typography>
        <Typography style={{ fontSize: "18px", color: "grey" }}>
          I'd be happy to help once I have a better understanding of your
          request.
        </Typography>
        <Row gutter={16}>
          {mockData.map((item) => (
            <Col key={item.id} span={12} md={12} lg={12} xl={12}>
              <Card>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"></Image>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&usqp=CAU"
        width="100%"
        preview={false}
      />
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginTop: "250px",
          marginBottom: "250px",
        }}
      >
        <Row justify="center">
          <Typography style={{ fontSize: "38px", marginBottom: "10px" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </Typography>
        </Row>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#cccccc",
          width: "100%",
          height: "50vh",
        }}
      >
        <Typography style={{ fontSize: "20px", marginBottom: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button style={{ ...buttonStyle, ...buttonHoverStyle }}>
          Let's go
        </Button>
      </div>
    </div>
  );
};
