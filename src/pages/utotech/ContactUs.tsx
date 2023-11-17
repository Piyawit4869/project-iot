import { Typography, Row, Button, Col } from "antd";

export const ContactUs = () => {
  const buttonStyle = {
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
          paddingTop: 36,
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "120px" }}
        >
          <div>
            <Typography style={{ fontSize: "36px" }}>
              Let's come to consult!
            </Typography>

            <Typography style={{ fontSize: "20px", color: "grey" }}>
              We're here to help you. Get in touch with us for expert advice and
              assistance.
            </Typography>
          </div>
          <Button style={{ ...buttonStyle, ...buttonHoverStyle }}>
            Let's chat
          </Button>
        </Row>
        <Row
          justify="space-around"
          align="top"
          style={{ marginBottom: "60px" }}
        >
          <Col>
            <div style={{ marginBottom: "60px" }}>
              <Typography
                style={{ fontSize: "18px", fontWeight: "bold", color: "grey" }}
              >
                Contact us
              </Typography>
              <br />
              <Typography style={{ fontSize: "18px" }}>
                +66 080-423-7373
              </Typography>
              <Typography style={{ fontSize: "18px" }}>
                kiattiphoom@utotech.org
              </Typography>
            </div>
          </Col>
          <Col>
            <div>
              <Typography
                style={{ fontSize: "18px", fontWeight: "bold", color: "grey" }}
              >
                Address
              </Typography>
              <br />
              <div style={{ width: "200px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  61/723 Nakhon Chai Si District, Nakhon Pathom 73120
                </Typography>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
