import { Typography, Row, Button } from "antd";

export const ContactUs = () => {
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
        }}
      >
        <Row justify="space-between" align="middle">
          <div style={{ width: "60%" }}>
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
      </div>
    </div>
  );
};
