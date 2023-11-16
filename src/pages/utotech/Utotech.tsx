import { Card, Col, Grid, Image, Row, Typography } from "antd";
import React from "react";

// Mock data
const mockData = [
  { id: 1, title: "Item 1", description: "Description for Item 1" },
  { id: 2, title: "Item 2", description: "Description for Item 2" },
  { id: 3, title: "Item 3", description: "Description for Item 3" },
  { id: 4, title: "Item 4", description: "Description for Item 4" },
];

export const Utotech: React.FC = () => {
  return (
    <div>
      <div style={{ width: "60%" }}>
        <Typography style={{ fontSize: "36px" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
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
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </Typography>
      </Row>
      <Typography>Project</Typography>
      <Row gutter={16}>
        {mockData.map((item) => (
          <Col key={item.id} span={12} md={12} lg={12} xl={12}>
            <Card>
              <Image></Image>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
