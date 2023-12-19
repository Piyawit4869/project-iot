import { Card, Form, Input, Row, Typography } from "antd";
import { ThemeColors } from "../../styles/theme";
import { CheckSquareOutlined } from "@ant-design/icons";

interface QuotationSumAndNoteProps {}

export const QuotationSumAndNote: React.FC<QuotationSumAndNoteProps> = () => {
	return (
		<Row justify={"space-between"} wrap={false}>
			<Card
				bodyStyle={{ padding: "0px" }}
				style={{
					backgroundColor: ThemeColors.goldColor,
					borderRadius: "10px",
					padding: "10px",
					width: "50%",
				}}
			>
				<Row
					align="middle"
					style={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
				>
					<CheckSquareOutlined
						style={{
							color: ThemeColors.brickOrangeColor,
							fontSize: "24px",
							marginRight: "5px",
						}}
					/>
					<Typography style={{ fontSize: "18px" }}>สรุปข้อมูล</Typography>
				</Row>
				<Row justify={"space-between"} align={"middle"}>
					<div style={{ width: "73%", marginRight: "20px" }}>
						<Row
							justify={"space-between"}
							style={{ marginBottom: "10px" }}
							wrap={false}
						>
							<Typography style={{ fontSize: "18px" }}>
								มูลค่าส่วนลดรวม
							</Typography>
							<Row>
								<div
									style={{
										width: "200px",
										backgroundColor: ThemeColors.orangeColor,
										borderRadius: "10px",
										textAlign: "end",
										paddingRight: "5px",
										marginRight: "20px",
									}}
								>
									<Typography style={{ fontSize: "18px", color: "white" }}>
										0
									</Typography>
								</div>
								<Typography style={{ fontSize: "18px" }}>บาท</Typography>
							</Row>
						</Row>
						<Row justify={"space-between"} style={{ marginBottom: "10px" }}>
							<Typography style={{ fontSize: "18px" }}>
								มูลค่ารายการยกเว้นภาษี
							</Typography>
							<Row>
								<div
									style={{
										width: "200px",
										borderRadius: "10px",
										textAlign: "end",
										paddingRight: "5px",
										marginRight: "20px",
									}}
								>
									<Typography style={{ fontSize: "18px" }}>0</Typography>
								</div>
								<Typography style={{ fontSize: "18px" }}>บาท</Typography>
							</Row>
						</Row>
						<Row justify={"space-between"} style={{ marginBottom: "10px" }}>
							<Typography style={{ fontSize: "18px" }}>
								มูลค่ารายการภาษี 0%
							</Typography>
							<Row>
								<div
									style={{
										width: "200px",
										borderRadius: "10px",
										textAlign: "end",
										paddingRight: "5px",
										marginRight: "20px",
									}}
								>
									<Typography style={{ fontSize: "18px" }}>0</Typography>
								</div>
								<Typography style={{ fontSize: "18px" }}>บาท</Typography>
							</Row>
						</Row>
						<Row justify={"space-between"} style={{ marginBottom: "10px" }}>
							<Typography style={{ fontSize: "18px" }}>
								มูลค่ารายการภาษี 7%
							</Typography>
							<Row>
								<div
									style={{
										width: "200px",
										borderRadius: "10px",
										textAlign: "end",
										paddingRight: "5px",
										marginRight: "20px",
									}}
								>
									<Typography style={{ fontSize: "18px" }}>0</Typography>
								</div>
								<Typography style={{ fontSize: "18px" }}>บาท</Typography>
							</Row>
						</Row>
						<Row justify={"space-between"} style={{ marginBottom: "10px" }}>
							<Typography style={{ fontSize: "18px" }}>
								ภาษีมูลค่าเพิ่มรวม
							</Typography>
							<Row>
								<div
									style={{
										width: "200px",
										borderRadius: "10px",
										textAlign: "end",
										paddingRight: "5px",
										marginRight: "20px",
									}}
								>
									<Typography style={{ fontSize: "18px" }}>0</Typography>
								</div>
								<Typography style={{ fontSize: "18px" }}>บาท</Typography>
							</Row>
						</Row>
					</div>
					<Card
						bodyStyle={{ padding: "0px" }}
						style={{
							display: "flex",
							flexDirection: "column",
							width: "24%",
							height: "150px",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: ThemeColors.darkColor,
							borderRadius: "10px",
							textAlign: "center",
						}}
					>
						<Typography style={{ fontSize: "18px", color: "white" }}>
							มูลค่าสุทธิรวม
						</Typography>
						<Typography style={{ fontSize: "18px", color: "white" }}>
							0.00 บาท
						</Typography>
					</Card>
				</Row>
			</Card>
			<Card style={{ width: "50%", backgroundColor: "transparent" }}>
				<Typography style={{ fontSize: "18px" }}>
					<CheckSquareOutlined
						style={{
							color: ThemeColors.brickOrangeColor,
							fontSize: "24px",
							marginRight: "5px",
						}}
					/>
					หมายเหตุสำหรับลูกค้า
				</Typography>
				<Card
					bodyStyle={{ padding: "0px" }}
					style={{
						width: "100%",
						height: "70px",
						boxShadow: "1px 1px 2.5px 1px" + ThemeColors.goldColor,
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						paddingBottom: "1px",
						borderRadius: "10px",
						marginTop: "20px",
						marginRight: "20px",
						marginBottom: "20px",
					}}
				>
					<Typography style={{ fontSize: "16px" }}>หมายเหตุ</Typography>
					<Form.Item name="noteForCus">
						<Input
							placeholder="ระบุถ้ามี"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.lightOrangeColor,
							}}
						/>
					</Form.Item>
				</Card>
			</Card>
		</Row>
	);
};
