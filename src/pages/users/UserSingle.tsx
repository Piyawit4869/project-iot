import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ThemeColors } from "@src/styles/theme";
import { Typography, Row, Select, Input, Space, Button, Form } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface UserAccessProps {
  canEdit?: Boolean;
}

export const SingleUser: React.FC<UserAccessProps> = (
  props: UserAccessProps
) => {
  // const submit = useSubmit();
  const { t } = useTranslation();

  // const itemsLastDropdown: MenuProps["items"] = [
  //   {
  //     label: "ทั้งหมด",
  //     key: "1",
  //   },
  //   {
  //     label: "ร่างเท่านั้น",
  //     key: "2",
  //   },
  //   {
  //     label: "อนุมัติเท่านั้น",
  //     key: "3",
  //   },
  // ];

  const priceIsCurrency = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "pendding",
      label: "Pendding",
    },
    {
      value: "inactive",
      label: "Inactive",
    },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // const onSubmit = async (values: any) => {
  //   const payload = Object.assign(values);
  //   if (payload.file && payload.file.length > 0) {
  //     payload.imageUrl = payload.file[0].response?.url;
  //     delete payload.file;
  //   } else {
  //     delete payload.file;
  //   }

  //   payload.role = "user";

  //   submit({ data: JSON.stringify(payload) }, { method: "post" });
  // };

  return (
    <div>
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "10px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography style={{ fontSize: "24px" }}>Username</Typography>
          </div>
          {!props.canEdit ? (
            <Link to={`/users/1/edit`}>
              <Button
                icon={<EditOutlined style={{ fontSize: "22px" }} />}
                style={{
                  border: "0",
                  height: "50px",
                  width: "180px",
                  marginRight: "10px",
                  fontSize: "18px",
                  backgroundColor: ThemeColors.lightOrangeColor,
                  color: ThemeColors.whiteColor,
                }}
              >
                edit
              </Button>
            </Link>
          ) : (
            <Button
              icon={<DeleteOutlined style={{ fontSize: "22px" }} />}
              style={{
                border: "0",
                height: "50px",
                width: "180px",
                marginRight: "10px",
                fontSize: "18px",
                backgroundColor: ThemeColors.waringColor,
                color: ThemeColors.whiteColor,
              }}
            >
              delete
            </Button>
          )}
        </Row>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "24px" }}>
            {t("create user")}
          </Typography>
        </div> */}
        <div
          style={{
            background: ThemeColors.goldColor,
            height: "3px",
          }}
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          disabled={!props.canEdit}
        >
          <Row style={{ marginBottom: "10px" }}>
            <div style={{ ...styles.inputBox, width: "300px" }}>
              <Typography style={{ fontSize: "18px" }}>
                {t("status")}
              </Typography>
              <Form.Item name="status">
                <Select
                  options={priceIsCurrency}
                  placeholder="active"
                  bordered={false}
                  defaultValue="active"
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <div style={{ ...styles.inputBox, width: "300px" }}>
              <Typography style={{ fontSize: "18px" }}>{t("email")}</Typography>
              <Form.Item name="email">
                <Input
                  type="email"
                  placeholder="please input email"
                  bordered={false}
                  autoComplete="off"
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ width: "20px" }} />
            <div style={{ ...styles.inputBox, width: "300px" }}>
              <Typography style={{ fontSize: "18px" }}>
                {t("password")}
              </Typography>
              <Form.Item name="password">
                <Space direction="horizontal">
                  <Input
                    type="password"
                    placeholder="please input password"
                    bordered={false}
                    autoComplete="off"
                    style={{
                      padding: "0px",
                      fontSize: "16px",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  />
                </Space>
              </Form.Item>
            </div>
            <div style={{ width: "20px" }} />
            <div style={{ ...styles.inputBox, width: "300px" }}>
              <Typography style={{ fontSize: "18px" }}>
                {t("phone number")}
              </Typography>
              <Form.Item name="tel">
                <Input
                  placeholder="please input phone number"
                  bordered={false}
                  autoComplete="off"
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.lightOrangeColor,
                  }}
                />
              </Form.Item>
            </div>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <div style={{ ...styles.inputBox, width: "460px" }}>
              <Typography style={{ fontSize: "18px" }}>
                {t("first name")}
              </Typography>
              <Form.Item name="firstName">
                <Input
                  placeholder="please input first name"
                  bordered={false}
                  autoComplete="off"
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.orangeColor,
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ width: "20px" }} />
            <div style={{ ...styles.inputBox, width: "460px" }}>
              <Typography style={{ fontSize: "18px" }}>
                {t("last name")}
              </Typography>
              <Form.Item name="lastName">
                <Input
                  placeholder="please input last name"
                  bordered={false}
                  autoComplete="off"
                  style={{
                    padding: "0px",
                    fontSize: "16px",
                    color: ThemeColors.lightOrangeColor,
                  }}
                />
              </Form.Item>
            </div>
          </Row>
          {!props.canEdit ? (
            <></>
          ) : (
            <div style={{ marginBottom: "10px" }}>
              <Link to={`/users/1`}>
                <Button
                  style={{
                    border: "0",
                    height: "50px",
                    width: "180px",
                    marginRight: "10px",
                    backgroundColor: ThemeColors.waringColor,
                  }}
                >
                  <Typography style={{ fontSize: "18px", color: "white" }}>
                    {t("cancel")}
                  </Typography>
                </Button>
              </Link>
              <Button
                htmlType="submit"
                style={{
                  border: "0",
                  height: "50px",
                  width: "180px",
                  marginRight: "10px",
                  fontSize: "18px",
                  backgroundColor: ThemeColors.greenColor,
                  color: ThemeColors.whiteColor,
                }}
              >
                ตกลง
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
const styles = {
  inputBox: {
    backgroundColor: "white",
    paddingTop: "10px",
    paddingLeft: "10px",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
    marginBottom: "10px",
  } as React.CSSProperties,
};
