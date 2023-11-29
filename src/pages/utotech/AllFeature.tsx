import { Card, Col, Image, Row, Typography } from "antd";

import * as API from "../../apis";
import { Link, useLoaderData } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Parallax } from "react-parallax";
import { styles } from ".";
import { useEffect } from "react";

const weCanDo = "What we can do";
const subWeCanDo =
  "I'd be happy to help once I have a better understanding of your request.";
const contact =
  "Thank you for considering us. We look forward to connecting with you!";
// const letChat = "Let's chat";

const letChatImage =
  "https://picjumbo.com/wp-content/uploads/black-styled-minimal-office-things-room-for-text-free-photo.jpg";

export async function featuresIndexLoader() {
  try {
    const { data } = await API.features.getAll();

    return { data: data };
  } catch (error) {
    return { data: null };
  }
}

export const AllFeature = () => {
  const { data } = useLoaderData() as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div style={styles.featuresBox}>
        <Title level={4}>{weCanDo}</Title>
        <Typography style={{ color: "grey" }}>{subWeCanDo}</Typography>
        <Row gutter={[16, 16]} style={styles.marginVertical}>
          {data.map((item: any) => (
            <Col key={item.id} span={24} md={12} lg={12} xl={12}>
              <Link to={`/feature/${item.id}`}>
                <Card style={{ height: "100%" }}>
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
          {/* <Button
            type="primary"
            style={{
              marginTop: "20px",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            {letChat}
          </Button> */}
        </div>
      </Parallax>
    </div>
  );
};
