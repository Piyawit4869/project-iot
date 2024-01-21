import { DownOutlined } from "@ant-design/icons";
import { Title } from "../../components/global/Title";
import { ThemeColors } from "../../styles/theme";
import { 
Button, 
Dropdown, 
Form, 
Input, 
MenuProps, 
Row, Space, 
Typography } from "antd";
import { Link } from "react-router-dom";
export const BranchCreate = () => {

    const items: MenuProps["items"] = [
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

	const onClickItemDropdown: MenuProps["onClick"] = ({ key }) => {
		console.log("key", key);
	};

    return (
           <div>
			<Title title="จัดการสาขาภายในกิจการ/องค์กร" textButton={""} button={false} />
			<div
				style={{
					marginBottom: "20px",
					width: "25%",
					height: "90px",
					backgroundColor: "white",
					paddingTop: "10px",
					paddingLeft: "10px",
					borderRadius: "10px",
					boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
					marginRight: "20px",
				}}
			>
				<Typography style={{ fontSize: "20px" }}>ชื่อสินค้า/บริการ</Typography>
				<Form.Item>
					<Input
						placeholder="การออกแบบ"
						bordered={false}
						style={{
							padding: "0px",
							fontSize: "16px",
							color: ThemeColors.orangeColor,
						}}
					/>
				</Form.Item>
			</div>
			<Row style={{ marginBottom: "20px" }}>
				<div
					style={{
						width: "70%",
						height: "100px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
						marginBottom: "20px",
					}}
				>
					<Typography style={{ fontSize: "20px" }}>คำอธิบาย</Typography>
					<Form.Item>
						<Input
							placeholder="การออกแบบ Flowchart และ User Journey ของระบบ"
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
					className="status"
					style={{
						width: "26%",
						height: "100px",
						backgroundColor: "white",
						padding: "10px 0 0 10px",
						marginRight: "20px",
						borderRadius: "10px",
						// boxShadow: "2px 2px 2px 3px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
					}}
				>
					<Typography style={{ fontSize: "1.3rem" }}>ประเภท</Typography>
					<Form.Item>
						<Dropdown menu={{ items: items, onClick: onClickItemDropdown }}>
							<a onClick={(e) => e.preventDefault()}>
								<Space
									style={{
										width: "80%",
										display: "flex",
										justifyContent: "space-between",
										color: ThemeColors.lightOrangeColor,
									}}
								>
									บริการ
									<DownOutlined style={{ fontSize: "22px", width: "10px" }} />
								</Space>
							</a>
						</Dropdown>
					</Form.Item>
				</div>
			</Row>
			<Row style={{ marginBottom: "20px" }}>
				<div
					style={{
						width: "33%",
						height: "100px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
						marginBottom: "20px",
					}}
				>
					<Typography style={{ fontSize: "20px" }}>จำนวน</Typography>
					<Form.Item>
						<Input
							placeholder="4"
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
						width: "32%",
						height: "100px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "20px" }}>ราคา/หน่วย</Typography>
					<Form.Item>
						<Input
							placeholder="10,000.00"
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
						width: "30%",
						height: "100px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
						marginRight: "20px",
					}}
				>
					<Typography style={{ fontSize: "20px" }}>ส่วนลด/หน่วย</Typography>
					<Form.Item>
						<Input
							placeholder="0.00"
							bordered={false}
							style={{
								padding: "0px",
								fontSize: "16px",
								color: ThemeColors.orangeColor,
							}}
						/>
					</Form.Item>
				</div>
			</Row>
			<Row>
				<div
					className="status"
					style={{
						width: "26%",
						height: "100px",
						backgroundColor: "white",
						padding: "10px 0 0 10px",
						marginRight: "20px",
						borderRadius: "10px",
						// boxShadow: "2px 2px 2px 3px",
						boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
					}}
				>
					<Typography style={{ fontSize: "1.3rem" }}>ภาษี</Typography>
					<Form.Item>
						<Dropdown menu={{ items: items, onClick: onClickItemDropdown }}>
							<a onClick={(e) => e.preventDefault()}>
								<Space
									style={{
										width: "80%",
										display: "flex",
										justifyContent: "space-between",
										color: ThemeColors.lightOrangeColor,
									}}
								>
									ไม่มี
									<DownOutlined style={{ fontSize: "22px", width: "10px" }} />
								</Space>
							</a>
						</Dropdown>
					</Form.Item>
				</div>
			</Row>
			<div
				style={{
					marginTop: "30px",
					background: ThemeColors.goldColor,
					height: "3px",
					marginBottom: "20px",
				}}
			/>
			<Row>
				<Space direction="horizontal" size={10}>
					<Button
						style={{
							border: "0",
							height: "50px",
							width: "180px",
							marginRight: "10px",
							fontSize: "18px",
							backgroundColor: ThemeColors.greenColor,
							color: ThemeColors.whiteColor,
						}}
						htmlType="submit"
					>
						บันทึกข้อมูล
					</Button>
					<Link to={"/branchs"}>
						<Button
							style={{
								border: "1px solid " + ThemeColors.blueColor,
								height: "50px",
								width: "180px",
								marginRight: "10px",
								fontSize: "18px",
								backgroundColor: ThemeColors.whiteColor,
								color: ThemeColors.blueColor,
							}}
						>
							ยกเลิก
						</Button>
					</Link>
				</Space>
			</Row>
		</div>
    )
};