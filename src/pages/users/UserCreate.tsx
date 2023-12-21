import { ThemeColors } from "../../styles/theme";

import {
	Button,
	Typography,
	Form,
	Row,
	Input,
	Space,
	Checkbox,
	MenuProps,
	Dropdown,
	Select,
} from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";

export const CreateUserPage = () => {
	const { t } = useTranslation();
	const itemsLastDropdown: MenuProps["items"] = [
		{
			label: "ทั้งหมด",
			key: "1",
		},
		{
			label: "ร่างเท่านั้น",
			key: "2",
		},
		{
			label: "อนุมัติเท่านั้น",
			key: "3",
		},
	];

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

	return (
		<div>
			<div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Typography style={{ fontSize: "24px" }}>
						{t("create user")}
					</Typography>
				</div>
				<div
					style={{
						background: ThemeColors.goldColor,
						height: "3px",
					}}
				/>
			</div>
			<div style={{ marginTop: "30px" }}>
				<Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
					<div style={{ marginBottom: "10px" }}>
						<Link to={"/users"}>
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
							icon={<PlusOutlined style={{ fontSize: "22px" }} />}
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
							{t("create user")}
						</Button>
					</div>
				</Form>
				{/* <div>
					<div
						style={{
							height: "45vh",
							backgroundColor: ThemeColors.whiteColor,
							borderRadius: "15px",
							width: "100%",
							margin: "20px 0px 20px 0px",
						}}
					>
						<div
							style={{
								height: "70px",
								borderRadius: "15px 15px 0 0",
								backgroundColor: ThemeColors.orangeColor,
							}}
						>
							<Row gutter={20}>
								<Col xs={24} sm={24} md={24} lg={16}>
									<Typography>assdwdasdwd</Typography>
								</Col>
								<Col xs={24} sm={24} md={24} lg={6}>
									<div
										style={{
											backgroundColor: "white",
											paddingTop: "10px",
											paddingLeft: "10px",
											borderRadius: "10px",
											boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
										}}
									>
										<Typography style={{ fontSize: "18px" }}>
											นามสกุล
										</Typography>
										<Form.Item>
											<Input
												placeholder="too too too"
												bordered={false}
												style={{
													padding: "0px",
													fontSize: "16px",
													color: ThemeColors.lightOrangeColor,
												}}
											/>
										</Form.Item>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</div> */}
				<div style={{ marginTop: "30px" }}>
					<Typography
						style={{
							fontSize: "24px",
						}}
					>
						{t("permission")}
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Space size={8} direction="vertical">
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								{`${t("manage user")} ${t(
									"create delete and manage permission"
								)}`}
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								{`${t("product and service name")} ${t(
									"create delete and manage permission"
								)}`}
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								พนักงาน (เพิ่ม/ลบ และทำรายการจ่ายเงินเดือนพนักงานได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								ดูรายงาน และเปรียบเทียบผลกำไรขาดทุนตามกลุ่มจัดประเภทได้
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								ทะเบียนสินทรัพย์ (เพิ่ม/ลบ และเข้าถึงทะเบียนสินทรัพย์ได้)
							</Checkbox>
						</Space>
					</div>
				</div>
				<div style={{ marginTop: "30px" }}>
					<Typography
						style={{
							fontSize: "24px",
						}}
					>
						สิทธิ์การใช้งานการเงินและบัญชี
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Space size={8} direction="vertical">
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								การเงิน (เพิ่ม/ลบ และแก้ไขช่องทางการรับเงินได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								ผังบัญชี บัญชีแยกประเภท ลบการเงิน
							</Checkbox>
							<Checkbox
								style={{
									paddingRight: "300px",
									fontSize: "18px",
									color: ThemeColors.blackColor,
								}}
							>
								บัญชีรายวัน
								<Dropdown menu={{ items: itemsLastDropdown }}>
									<Button
										style={{
											marginLeft: "50px",
											fontSize: "18px",
											paddingLeft: "25px",
											width: "150px",
											height: "35px",
											borderColor: ThemeColors.orangeColor,
											color: ThemeColors.orangeColor,
										}}
									>
										<Space>
											ทั้งหมด
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Checkbox>
						</Space>
					</div>
				</div>
				<div style={{ marginTop: "30px" }}>
					<Typography
						style={{
							fontSize: "24px",
						}}
					>
						กำจัดสิทธิ์การใช้งาน
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Checkbox
							style={{
								fontSize: "18px",
								color: ThemeColors.blackColor,
							}}
						>
							เห็นได้เฉพาะเอกสารที่ตัวเองสร้าง
						</Checkbox>
					</div>
				</div>
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
