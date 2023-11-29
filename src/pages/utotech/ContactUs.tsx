import {
  Typography,
  Row,
  Button,
  Col,
  Card,
  FormInstance,
  Form,
  Input,
  Space,
  notification,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";

//this all text
const consultTitle = "Let's come to consult!";
const consultSubTitle =
  "We're here to help you. Get in touch with us for expert advice and assistance.";
// const letChat = "Let's chat";
const phoneNumber = "+66 080-423-7373";
const email = "kiattiphoom@utotech.org";
const addressTitle = "Address";
const addressDescription =
  "61/723 Nakhon Chai Si District, Nakhon Pathom 73120";
const message = "Message Us";
const contact = "Contact Us";

const SubmitButton = ({
  form,
}: {
  form: FormInstance;
  style: React.CSSProperties;
}) => {
  const [submittable, setSubmittable] = React.useState(false);
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  const handleButtonClick = async () => {
    if (submittable) {
      console.log("Form Values:", values);

      await form.submit();

      form.resetFields();
      notification.info({
        onClose() {},
        message: "Updating soon",
        description: "Messages cannot be sent. Currently under development",
        duration: 3,
      });
    }
  };

  return (
    <Button type="primary" htmlType="submit" onClick={handleButtonClick}>
      {contact}
    </Button>
  );
};

export const ContactUs: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div style={styles.mainBox}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "120px" }}
        >
          <div>
            <Title level={4}>{consultTitle}</Title>
            <Typography style={{ color: "grey" }}>{consultSubTitle}</Typography>
          </div>
          {/* <Button
            type="primary"
            style={{
              marginTop: "20px",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            {letChat}
          </Button> */}
        </Row>
        <Row
          justify="space-around"
          align="top"
          style={{ marginBottom: "60px" }}
        >
          <Card style={styles.messageCard}>
            <Title level={5} style={{ color: "white" }}>
              {message}
            </Title>
            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              style={{ marginTop: "20px" }}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SubmitButton
                    form={form}
                    style={{
                      marginTop: "20px",
                      transition: "background-color 0.3s ease-in-out",
                    }}
                  />
                </Space>
              </Form.Item>
            </Form>
          </Card>
          <Col>
            <div style={styles.contactBox}>
              <Title level={5} style={{ color: "grey" }}>
                {contact}
              </Title>
              <br />
              <Typography>{phoneNumber}</Typography>
              <Typography>{email}</Typography>
            </div>
            <div style={styles.contactBox}>
              <Title level={5} style={{ color: "grey" }}>
                {addressTitle}
              </Title>
              <br />
              <div style={{ width: "200px" }}>
                <Typography>{addressDescription}</Typography>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles = {
  mainBox: {
    paddingTop: 36,
    paddingLeft: "10%",
    paddingRight: "10%",
  } as React.CSSProperties,
  messageCard: { width: "400px", marginBottom: "30px" } as React.CSSProperties,
  contactBox: { height: "200px" } as React.CSSProperties,
};
