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
	Col,
} from "antd";
import {
	PlusOutlined,
	EyeOutlined,
	CopyOutlined,
	DownOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

export const CreateUserPage = () => {
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

	return (
		<div>
			<div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Typography style={{ fontSize: "24px", fontWeight: 600 }}>
						เพิ่มผู้ใช้งาน
					</Typography>
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
									ยกเลิก
								</Typography>
							</Button>
						</Link>
						<Button
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
							เพิ่มผู้ใช้งาน
						</Button>
					</div>
				</div>
				<div
					style={{
						background: ThemeColors.goldColor,
						height: "3px",
					}}
				/>
			</div>
			<div style={{ marginTop: "30px" }}>
				<Form>
					<Row style={{ marginBottom: "20px" }}>
						<div
							style={{
								width: "25%",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>อีเมลล์</Typography>
							<Form.Item>
								<Input
									placeholder="pitoo123@email.com"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								width: "25%",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
							}}
						>
							<Typography style={{ fontSize: "18px" }}>
								เบอร์โทรศัพท์
							</Typography>
							<Form.Item>
								<Input
									placeholder="099-0000000"
									bordered={false}
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
						<div
							style={{
								width: "45%",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
								marginRight: "20px",
							}}
						>
							<Typography style={{ fontSize: "18px" }}>ชื่อจริง</Typography>
							<Form.Item>
								<Input
									placeholder="Pitoo"
									bordered={false}
									style={{
										padding: "0px",
										fontSize: "16px",
										color: ThemeColors.orangeColor,
									}}
								/>
							</Form.Item>
						</div>
						<div
							style={{
								width: "45%",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
							}}
						>
							<Typography style={{ fontSize: "18px" }}>นามสกุล</Typography>
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
					</Row>
					<Row>
						<div
							style={{
								width: "100%",
								backgroundColor: "white",
								paddingTop: "10px",
								paddingLeft: "10px",
								borderRadius: "10px",
								boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
							}}
						>
							<Typography style={{ fontSize: "18px" }}>
								รหัสผ่าน (กรุณาคัดลอกไว้ เพื่อป้องกันการลืม)
							</Typography>

							<Form.Item>
								<Space direction="horizontal">
									<EyeOutlined
										style={{
											fontSize: "30px",
											marginRight: "20px",
											color: ThemeColors.grayColor,
										}}
									/>
									<Input
										type="password"
										placeholder="*******************"
										bordered={false}
										style={{
											padding: "0px",
											fontSize: "16px",
											color: ThemeColors.lightOrangeColor,
										}}
									/>

									<Button
										style={{
											color: ThemeColors.orangeColor,
											border: "0px",
											fontSize: "20px",
											marginLeft: "120px",
										}}
										icon={<CopyOutlined />}
									>
										Copy
									</Button>
								</Space>
							</Form.Item>
						</div>
					</Row>
				</Form>
				<div>
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
				</div>
				<div style={{ marginTop: "30px" }}>
					<Typography
						style={{
							fontWeight: "bold",
							fontSize: "30px",
						}}
					>
						สิทธิ์การใช้งาน
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Space size={8} direction="vertical">
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								จัดการผู้ใช้งาน (เพิ่ม/ลบ และกำหนดสิทธิ์ผู้ใช้งานอื่นได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								สินค้า/บริการ (เพิ่ม/ลบ และแก้ไขข้อมูลสินค้า/บริการได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								พนักงาน (เพิ่ม/ลบ และทำรายการจ่ายเงินเดือนพนักงานได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								ดูรายงาน และเปรียบเทียบผลกำไรขาดทุนตามกลุ่มจัดประเภทได้
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
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
							fontWeight: "bold",
							fontSize: "30px",
						}}
					>
						สิทธิ์การใช้งานการเงินและบัญชี
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Space size={8} direction="vertical">
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								การเงิน (เพิ่ม/ลบ และแก้ไขช่องทางการรับเงินได้)
							</Checkbox>
							<Checkbox
								style={{
									fontSize: "18px",
									fontWeight: "500",
									color: ThemeColors.blackColor,
								}}
							>
								ผังบัญชี บัญชีแยกประเภท ลบการเงิน
							</Checkbox>
							<Checkbox
								style={{
									paddingRight: "300px",
									fontSize: "18px",
									fontWeight: "500",
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
							fontWeight: "bold",
							fontSize: "30px",
						}}
					>
						กำจัดสิทธิ์การใช้งาน
					</Typography>

					<div style={{ marginLeft: "10px" }}>
						<Checkbox
							style={{
								fontSize: "18px",
								fontWeight: "500",
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
