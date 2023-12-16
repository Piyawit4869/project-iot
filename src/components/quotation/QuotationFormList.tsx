import {
	Button,
	Card,
	Form,
	Input,
	Row,
	Select,
	Space,
	Typography,
} from "antd";
import { ThemeColors } from "../../styles/theme";
import {
	AppstoreOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

interface QuotationFormListProps {}

export const QuotationFormList: React.FC<QuotationFormListProps> = () => {
	const itemsCurrency = [
		{
			value: "THB",
			label: "THB",
		},
		{
			value: "USD",
			label: "USD",
		},
		{
			value: "EUR",
			label: "EUR",
		},
	];

	return (
		<Form.Item>
			<Form.List name="forms">
				{(subFields: any, subOpt) => (
					<div key={subFields.key}>
						{subFields.map((subField: any, index: any) => (
							<div
								key={subField.key}
								style={{
									display: "flex",
									marginBottom: "25px",
									boxShadow: "1px 1px 2.5px 1px lightgrey",
									borderRadius: "10px",
								}}
							>
								<div
									style={{
										backgroundColor: "#E46F1B",
										width: "4%",
										borderRadius: "10px 0px 0px 10px",
										textAlign: "center",
										flexDirection: "column",
										alignItems: "center",
										display: "flex",
									}}
								>
									<div style={{ marginTop: "20px" }}>
										<Typography style={{ color: "white", fontSize: "16px" }}>
											{index + 1}
										</Typography>
									</div>
									<div>
										<AppstoreOutlined
											style={{
												fontSize: "30px",
												color: "white",
												marginTop: "25px",
											}}
										/>
									</div>
								</div>
								<div
									style={{
										width: "100%",
										backgroundColor: "white",
										paddingTop: "15px",
										paddingLeft: "10px",
										paddingRight: "10px",
										borderRadius: "0px 10px 10px 0px",
									}}
								>
									<Row justify={"space-between"} wrap={false}>
										<Card
											bodyStyle={{ padding: "0px" }}
											style={{
												width: "100%",
												height: "70px",
												backgroundColor: ThemeColors.goldColor,
												paddingTop: "10px",
												paddingLeft: "10px",
												paddingRight: "10px",
												borderRadius: "10px",
												marginBottom: "10px",
											}}
										>
											<Typography style={{ fontSize: "16px" }}>
												สินค้า/บริการ
											</Typography>
											<Form.Item
												name={[subField.name, "name"]}
												rules={[
													{
														required: true,
														message: "กรุณากรอกชื่อ",
													},
												]}
											>
												<Select
													options={itemsCurrency}
													placeholder="-"
													bordered={false}
												/>
											</Form.Item>
										</Card>
										<Card
											bodyStyle={{ padding: "0px" }}
											style={{
												width: "100%",
												height: "70px",
												backgroundColor: ThemeColors.goldColor,
												paddingTop: "10px",
												paddingLeft: "10px",
												borderRadius: "10px",
												marginBottom: "10px",
												marginLeft: "10px",
												marginRight: "10px",
											}}
										>
											<Typography style={{ fontSize: "16px" }}>
												บัญชี
											</Typography>
											<Form.Item name={[subField.name, "no"]}>
												<Input
													placeholder="-"
													bordered={false}
													style={{
														padding: "0px",
														fontSize: "16px",
														color: "white",
													}}
												/>
											</Form.Item>
										</Card>
										<Card
											bodyStyle={{ padding: "0px" }}
											style={{
												width: "100%",
												height: "70px",
												backgroundColor: ThemeColors.goldColor,
												paddingTop: "10px",
												paddingLeft: "10px",
												borderRadius: "10px",
												marginBottom: "10px",
											}}
										>
											<Typography style={{ fontSize: "16px" }}>
												คำอธิบาย
											</Typography>
											<Form.Item name={[subField.name, "descriptions"]}>
												<Input
													placeholder="พิมพ์คำอธิบาย"
													bordered={false}
													style={{
														padding: "0px",
														fontSize: "16px",
														color: "white",
													}}
												/>
											</Form.Item>
										</Card>
									</Row>
									<Row justify={"space-between"} align={"middle"} wrap={false}>
										<Row style={{ width: "100%" }} wrap={false}>
											<Card
												bodyStyle={{ padding: "0px" }}
												style={{
													width: "100%",
													height: "70px",
													backgroundColor: ThemeColors.goldColor,
													paddingTop: "10px",
													paddingLeft: "10px",
													borderRadius: "10px",
													marginBottom: "10px",
													marginRight: "10px",
												}}
											>
												<Typography style={{ fontSize: "16px" }}>
													จำนวน
												</Typography>
												<Form.Item name={[subField.name, "quantity"]}>
													<Input
														placeholder="1"
														bordered={false}
														style={{
															padding: "0px",
															fontSize: "16px",
															color: "white",
														}}
													/>
												</Form.Item>
											</Card>
											<Card
												bodyStyle={{ padding: "0px" }}
												style={{
													width: "100%",
													height: "70px",
													backgroundColor: ThemeColors.goldColor,
													paddingTop: "10px",
													paddingLeft: "10px",
													borderRadius: "10px",
													marginBottom: "10px",
												}}
											>
												<Typography style={{ fontSize: "16px" }}>
													ราคา/หน่วย
												</Typography>
												<Form.Item name={[subField.name, "pricePerUnits"]}>
													<Input
														placeholder="0.00"
														bordered={false}
														style={{
															padding: "0px",
															fontSize: "16px",
															color: "white",
														}}
													/>
												</Form.Item>
											</Card>
										</Row>
										<Row style={{ width: "100%" }} wrap={false}>
											<Card
												bodyStyle={{ padding: "0px" }}
												style={{
													width: "100%",
													height: "70px",
													backgroundColor: ThemeColors.goldColor,
													paddingTop: "10px",
													paddingLeft: "10px",
													borderRadius: "10px",
													marginBottom: "10px",
													marginLeft: "10px",
													marginRight: "10px",
												}}
											>
												<Typography style={{ fontSize: "16px" }}>
													ส่วนลด/หน่วย
												</Typography>
												<Form.Item name={[subField.name, "discountPerUnits"]}>
													<Input
														placeholder="0.00"
														bordered={false}
														style={{
															padding: "0px",
															fontSize: "16px",
															color: "white",
														}}
													/>
												</Form.Item>
											</Card>
											<Card
												bodyStyle={{ padding: "0px" }}
												style={{
													width: "100%",
													height: "70px",
													backgroundColor: ThemeColors.goldColor,
													paddingTop: "10px",
													paddingLeft: "10px",
													paddingRight: "10px",
													borderRadius: "10px",
													marginBottom: "10px",
												}}
											>
												<Typography style={{ fontSize: "16px" }}>
													ภาษี{" "}
												</Typography>
												<Form.Item
													name={[subField.name, "fee"]}
													rules={[
														{
															required: true,
															message: "กรุณากรอกชื่อ",
														},
													]}
												>
													<Select
														options={itemsCurrency}
														placeholder="ไม่มี"
														bordered={false}
													/>
												</Form.Item>
											</Card>
										</Row>
										<Row style={{ width: "100%" }} wrap={false}>
											<Card
												bodyStyle={{ padding: "0px" }}
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width: "100%",
													height: "70px",
													backgroundColor: "white",
													borderRadius: "10px",
													marginBottom: "10px",
													marginLeft: "10px",
													textAlign: "center",
												}}
											>
												<Typography style={{ fontSize: "16px" }}>
													ลบรายการ
												</Typography>
											</Card>
											<Button
												style={{
													width: "100%",
													height: "70px",
													backgroundColor: "#EA5959",
													borderRadius: "10px",
													marginBottom: "10px",
												}}
												onClick={() => {
													subOpt.remove(subField.name);
												}}
											>
												<Row justify={"center"}>
													<DeleteOutlined
														style={{
															color: "white",
															fontSize: "24px",
														}}
													/>
													<Typography
														style={{ fontSize: "16px", color: "white" }}
													>
														ลบ{" "}
													</Typography>
												</Row>
											</Button>
										</Row>
									</Row>
								</div>
							</div>
						))}
						<Space direction="vertical">
							<Typography
								style={{
									fontSize: "18px",
									color: ThemeColors.goldColor,
									marginBottom: "5px",
								}}
							>
								ปุ่มเพิ่มรายการ
							</Typography>
							<Button
								style={{
									width: "110px",
									height: "60px",
									backgroundColor: ThemeColors.orangeColor,
									borderRadius: "10px",
									marginBottom: "20px",
								}}
								onClick={() => subOpt.add()}
							>
								<Row>
									<PlusCircleOutlined
										style={{
											color: "white",
											fontSize: "24px",
											marginRight: "10px",
										}}
									/>
									<Typography style={{ fontSize: "16px", color: "white" }}>
										เพิ่ม{" "}
									</Typography>
								</Row>
							</Button>
						</Space>
					</div>
				)}
			</Form.List>
		</Form.Item>
	);
};
