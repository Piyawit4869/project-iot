import {
	Button,
	Flex,
	Image,
	Layout,
	Menu,
	Row,
	Typography,
	Col,
	Space,
	Card,
} from "antd";
import {
	DollarOutlined,
	FileDoneOutlined,
	HomeOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
	ShoppingCartOutlined,
	// ShoppingOutlined,
	// TeamOutlined,
	UserAddOutlined,
	WalletOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Content,
	// Footer,
	Header,
} from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { ThemeColors } from "../styles/theme";
import Logo from "@assets/images/Logo-StayOrganized.png";
import {
	// JSXElementConstructor,
	useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
// import UButton from "../components/admin/Button";
// import { styles } from "../pages/utotech";

export const AppLayout = (props: any) => {
	// const { user } = props;
	const { Sider } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	// const [activekey, setActivekey] = useState("");

	const location = useLocation();
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem("accessToken");
	};

	console.log(location);

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
			style: { backgroundColor: ThemeColors.brickOrangeColor },
			label: "Analytics",
			key: "/",
			icon: <HomeOutlined />,
		},
		{
			style: { backgroundColor: ThemeColors.brickOrangeColor },
			label: "Users",
			key: "/users",
			icon: <HomeOutlined />,
		},
		{
			style: { backgroundColor: ThemeColors.brickOrangeColor },
			label: "Customers",
			key: "/customers",
			icon: <UserAddOutlined />,
		},
		{
			style: { backgroundColor: ThemeColors.brickOrangeColor },
			label: "Product",
			key: "/product",
			icon: <ShoppingCartOutlined />,
		},
		{
			style: {
				backgroundColor: ThemeColors.brickOrangeColor,
				margin: "4px",
			},
			label: "Income",
			key: "",
			icon: <DollarOutlined />,
			children: [
				{
					key: "/quotation",
					label: "Quotaion",
					icon: <FileDoneOutlined />,
				},
				{
					key: "#",
					label: "Receipt",
					icon: <FileDoneOutlined />,
				},
				{
					key: "#",
					label: "Invoice",
					icon: <FileDoneOutlined />,
				},
				{
					key: "#",
					label: "Tax Invoice",
					icon: <FileDoneOutlined />,
				},
				{
					key: "#",
					label: "Contract",
					icon: <FileDoneOutlined />,
				},
			],
		},
		{
			style: { backgroundColor: ThemeColors.brickOrangeColor },
			label: "Payroll",
			key: "/partial",
			icon: <WalletOutlined />,
		},
		// {
		// 	style: { backgroundColor: ThemeColors.brickOrangeColor },
		// 	label: "Organization",
		// 	key: "/admin/organization",
		// 	icon: <ShoppingOutlined />,
		// },
	];

	return (
		<>
			<Layout style={{ display: "flex", height: "100vh" }}>
				<Card bodyStyle={{ padding: "0px" }}>
					<Sider
						style={{
							backgroundColor: "transparent",
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
							<Image width={50} src={Logo} preview={false} />
							{collapsed ? (
								<div style={{ height: "100px" }}></div>
							) : (
								<div style={{ height: "100px" }}>
									<Typography style={{ fontSize: "24px", color: "white" }}>
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
								backgroundColor: ThemeColors.primaryColor,
								color: "white",
							}}
							onClick={({ key }) => {
								navigate(key);
							}}
							items={siedMenu}
						></Menu>
						<Row
							style={{
								alignSelf: "flex-end",
								position: "absolute",
								bottom: "0",
								width: "100%",
								padding: "8px 0 8px 0",
								backgroundColor: ThemeColors.brickOrangeColor,
							}}
						>
							<Col span={"18"} style={{ color: ThemeColors.fontColor1 }}>
								<Link to={"#"} style={{ color: ThemeColors.fontColor1 }}>
									<Flex style={{ marginLeft: "20px" }}>
										<Space>
											<p>
												<UserOutlined />
											</p>
											{collapsed ? <></> : <p>username</p>}
										</Space>
									</Flex>
								</Link>
							</Col>
							<Col
								span={"6"}
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{collapsed ? (
									<></>
								) : (
									<Button
										type="primary"
										icon={<SettingOutlined />}
										style={{
											backgroundColor: ThemeColors.orangeColor,
											color: ThemeColors.fontColor1,
										}}
									></Button>
								)}
							</Col>
						</Row>
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
							backgroundColor: ThemeColors.whiteColor,
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
							style={{
								backgroundColor: ThemeColors.orangeColor,
								color: ThemeColors.fontColor1,
							}}
						></Button>
						{/* <Row align={"middle"}>					
							<Typography style={{ fontSize: "24px", marginRight: "10px" }}>
								User name
							</Typography>
							<Button
								icon={<SettingOutlined />}
								size={"middle"}
								style={{
									backgroundColor: ThemeColors.orangeColor,
									color: "white",
								}}
							></Button>
						</Row> */}
						<Link to="/login" onClick={onLogout}>
							<Button
								type="primary"
								icon={<LogoutOutlined />}
								size="large"
								style={{
									backgroundColor: ThemeColors.orangeColor,
									color: ThemeColors.fontColor1,
								}}
							>
								Logout
							</Button>
						</Link>
					</Header>

					<Content
						style={{ backgroundColor: ThemeColors.bgColor, overflow: "auto" }}
					>
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
