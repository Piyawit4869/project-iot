import {
  Button,
  Image,
  Layout,
  Menu,
  Row,
  Typography,
  Col,
  Space,
  Card,
  Avatar,
  Dropdown,
  MenuProps,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // ShoppingOutlined,
  // TeamOutlined,
  UserOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  SettingOutlined,
  RiseOutlined,
  ApartmentOutlined,
  IdcardFilled,
  ProjectFilled,
  ShoppingFilled,
  FileFilled,
  SmileFilled,
  PieChartFilled,
} from "@ant-design/icons";
import {
  Content,
  // Footer,
  Header,
} from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import Logo from "@assets/images/Logo-StayOrganized.png";
import {
  // JSXElementConstructor,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
// import UButton from "../components/admin/Button";
// import { styles } from "../pages/utotech";

export const AppLayout = (props: any) => {
  // const { user } = props;
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  // const [activekey, setActivekey] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // const onLogout = () => {
  // 	localStorage.removeItem("accessToken");
  // };

  console.log(location);

  const { Paragraph } = Typography;
  // React.useEffect(() => {
  //   const key = location.pathname.split("/") as any[];

  //   if (key.length) {
  //     if (Number(key[2]) > 0) {
  //       setActivekey(key[1] ? `${key[1]}` : "");
  //     } else {
  //       setActivekey(`${key[1]}${key[2] ? `/${key[2]}` : ""} `);
  //     }
  //   }
  // }, [location.pathname]);

  const siedMenu: Array<any> = [
    {
      label: "Analytics",
      key: "/",
      icon: <PieChartFilled />,
    },
    {
      label: "Branches",
      key: "/branches",
      icon: <ApartmentOutlined />,
    },
    {
      label: "Products/Services",
      key: "/products",
      icon: <ShoppingFilled />,
    },
    {
      label: "Incomes",
      key: "",
      icon: <RiseOutlined />,
      children: [
        {
          key: "/quotation",
          label: "Quotaion",
          icon: <FileFilled />,
        },
        {
          key: "#",
          label: "Receipt",
          icon: <FileFilled />,
        },
        {
          key: "#",
          label: "Invoice",
          icon: <FileFilled />,
        },
        {
          key: "#",
          label: "Tax Invoice",
          icon: <FileFilled />,
        },
        {
          key: "#",
          label: "Contract",
          icon: <FileFilled />,
        },
      ],
    },
    {
      label: "Projects",
      key: "/projects",
      icon: <ProjectFilled />,
    },
    {
      label: "Users",
      key: "/users",
      icon: <IdcardFilled />,
    },
    {
      label: "Customers",
      key: "#",
      icon: <SmileFilled />,
    },
  ];

  const headerMenuOptions: MenuProps["items"] | any = [
    {
      label: "โปรไฟล์",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "ตั้งค่า",
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: "ออกจากระบบ",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Layout style={{ display: "flex", height: "100vh" }}>
        <Card bodyStyle={{ padding: "0px" }}>
          <Sider
            style={{
              height: "100vh",
            }}
            width={230}
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <Image width={80} src={Logo} preview={false} />
              {collapsed ? (
                <div style={{ height: "100px" }}></div>
              ) : (
                <div style={{ height: "100px" }}>
                  <Typography style={{ fontSize: "24px" }}>
                    Stay-Organize
                  </Typography>
                </div>
              )}
            </div>
            <Menu
              selectedKeys={[location.pathname]}
              selectable={true}
              theme="light"
              mode="inline"
              style={{
                width: "100%",
                // height: "calc(100vh - 140px)",
                top: "170px",
              }}
              onClick={({ key }) => {
                navigate(key);
              }}
              items={siedMenu}
              className="stay-menu"
            ></Menu>
          </Sider>
        </Card>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              padding: "20px",
              display: "flex",
              top: 0,
              zIndex: 1,
              width: "100%",
              height: "60px",
              position: "sticky",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
            }}
          >
            <Button
              type="primary"
              size={"middle"}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            ></Button>
            <Row align="middle">
              <Space>
                <Col>
                  <Paragraph
                    style={{ margin: 0, padding: "-30px", textAlign: "end" }}
                  >
                    Cristiano Ronaldo
                  </Paragraph>
                  <Paragraph
                    style={{
                      margin: 0,
                      padding: "-30px",
                      textAlign: "end",
                      color: "#ffba3b",
                    }}
                  >
                    Admin
                  </Paragraph>
                </Col>
                <Col style={{ alignContent: "center" }}>
                  <Avatar
                    draggable="false"
                    size={"large"}
                    icon={<UserOutlined />}
                    style={{
                      alignContent: "center",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "#ffba3b",
                    }}
                  ></Avatar>
                </Col>
                <Col>
                  <Dropdown menu={{ items: headerMenuOptions }}>
                    <Button
                      icon={
                        <CaretDownOutlined
                          style={{
                            color: "#ffffff",
                          }}
                        />
                      }
                    />
                  </Dropdown>
                </Col>
              </Space>
            </Row>
          </Header>

          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* FIXME: create new footer */}
    </>
  );
};
//FIXME Test
