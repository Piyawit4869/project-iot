import {
	Form,
	Input,
	Button,
	Row,
	Card,
	Typography,
	Image,
	notification,
} from "antd";
import { ThemeColors } from "./styles/theme";
import Logo from "./assets/images/Logo-StayOrganized.png";
import {
	useActionData,
	useNavigate,
	useNavigation,
	useSubmit,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as API from "./apis";
import React from "react";
// import axios from "axios";

export async function LoginAction({ request }: any) {
	const formData = await request.formData();
	const submitData = Object.fromEntries(formData);
	try {
		const { data } = await API.auth.login(submitData);

		localStorage.setItem("accessToken", data.accessToken);
		localStorage.setItem("refreshToken", data.refreshToken);
		return { message: "Welcome to Stay Organize", status: "success" };
	} catch (e: any) {
		return { message: "Invalid email or password", status: "error" };
	}
}

export const LoginPage = () => {
	const { t } = useTranslation();
	const submit = useSubmit();
	const action = useActionData() as any;
	const navigate = useNavigate();
	const navigation = useNavigation();

	const onSubmit = async (values: any) => {
		submit(values, { method: "post" });
	};

	React.useEffect(() => {
		if (action && action.status) {
			const type = action.status as "success" | "error";

			notification[type]({
				message: action.message,
				placement: "bottomLeft",
				duration: 5,
			});

			if (action.status === "success") {
				navigate("/");
			}
		}
	}, [action]);

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div
			style={{ backgroundColor: "#FFF5ED", width: "100vw", height: "100vh" }}
		>
			<Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
				<Card
					style={{
						width: "35%",
						minWidth: "365px",
						justifyItems: "center",
						borderRadius: "2rem",
						boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
					}}
				>
					<Row>
						<div
							style={{
								backgroundColor: "#E46F1B",
								width: "120px",
								height: "135px",
								borderRadius: "0px 0px 50px 0px",
								marginTop: "-35px",
							}}
						>
							<Image
								width={100}
								height={100}
								src={Logo}
								preview={false}
								style={{
									margin: "auto",
									display: "flex",
									marginTop: "15px",
									marginLeft: "8px",
								}}
							/>
						</div>
						<div style={{ marginLeft: "15px" }}>
							<Typography style={{ fontSize: "32px" }}>
								Stay Organize
							</Typography>
							<Typography style={{ fontSize: "27px" }}>เข้าสู่ระบบ</Typography>
						</div>
					</Row>
					<div
						style={{
							borderBottom: "2px solid #EFAB3A",
							margin: "auto",
							marginTop: "20px",
							marginBottom: "20px",
						}}
					></div>
					<Form
						name="Login"
						layout="vertical"
						initialValues={{ remember: true }}
						onFinish={onSubmit}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						style={{ marginTop: "10px" }}
					>
						<div
							style={{
								height: "69px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								border: "1px solid #EE9437",
								margin: "auto",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>{t("email")}</Typography>
							<Form.Item
								name="email"
								rules={[
									{ required: true, message: "Please input your username!" },
								]}
							>
								<Input
									type="email"
									placeholder={t("please fill your email address")}
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.lightOrangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								height: "69px",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								border: "1px solid #EE9437",
								margin: "auto",
								marginTop: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>
								{t("password")}
							</Typography>
							<Form.Item
								name="password"
								rules={[
									{ required: true, message: "Please input your username!" },
								]}
							>
								<Input
									type="password"
									placeholder={t("please fill your password")}
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.lightOrangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<Form.Item
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Button
								type="primary"
								htmlType="submit"
								style={{
									backgroundColor: "#F0BA3D",
									width: "180px",
									height: "50px",
									marginTop: "30px",
								}}
								loading={
									navigation.state === "loading" ||
									navigation.state === "submitting"
								}
								disabled={
									navigation.state === "loading" ||
									navigation.state === "submitting"
								}
							>
								{t("login")}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Row>
		</div>
	);
};
