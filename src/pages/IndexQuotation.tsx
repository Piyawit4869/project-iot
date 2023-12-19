import {
	Button,
	Dropdown,
	Form,
	Input,
	MenuProps,
	Row,
	Space,
	Table,
	Typography,
	message,
} from "antd";
import { Link } from "react-router-dom";
import {
	ControlOutlined,
	DownOutlined,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import { useState } from "react";

export const IndexQuotationPage = () => {
	const dataSource = [
		{
			key: "1",
			documentNumber: 1234,
			name: "John",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 2000,
			status: "ร่าง",
		},
		{
			key: "2",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "3",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "4",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "5",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "6",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "7",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "8",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "9",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "10",
			documentNumber: 1235,
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
	];

	const columns = [
		{
			title: "เลขที่เอกสาร",
			dataIndex: "documentNumber",
			key: "documentNumber",
		},
		{
			title: "ลูกค้า",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "วันที่ออก",
			dataIndex: "issueDate",
			key: "issueDate",
		},
		{
			title: "ใช้ได้ถึง",
			dataIndex: "validDate",
			key: "validDate",
		},
		{
			title: "มูลค่าสุทธิ์",
			dataIndex: "value",
			key: "value",
		},
		{
			title: "สถานะ",
			dataIndex: "status",
			key: "status",
		},
	];

	const itemsCurrency: MenuProps["items"] | any = [
		{
			label: "ทั้งหมด",
			key: "ทั้งหมด",
		},
		{
			label: "ร่าง",
			key: "ร่าง",
		},
		{
			label: "รออนุมัติ",
			key: "รออนุมัติ",
		},
		{
			label: "รอตอบรับ",
			key: "รอตอบรับ",
		},
		{
			label: "ตอบรับแล้ว",
			key: "ตอบรับแล้ว",
		},
	];

	const [collapsed, setCollapsed] = useState(false);

	let [status, setStatus] = useState<string>(itemsCurrency[0].label);
	const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
		setStatus((status = key));
		message.info(`เลือกสถาณะ ${key}`);
	};

	return (
		<div>
			<Title title="Quotation" textButton={""} button={false} />
			<Row style={{ marginTop: "10px" }} wrap={false}>
				<Input
					prefix={
						<SearchOutlined style={{ color: "black", fontSize: "25px" }} />
					}
					placeholder="Search Doccument Number"
					bordered={true}
					style={{
						paddingLeft: "10px",
						fontSize: "16px",
						color: ThemeColors.lightOrangeColor,
						border: "2px solid #EFAB3A",
						height: "50px",
						width: "87%",
					}}
				/>
				<Button
					icon={<SearchOutlined style={{ fontSize: "25px" }} />}
					style={{
						marginLeft: "10px",
						width: "10%",
						height: "50px",
						backgroundColor: "#EFAB3A",
						fontSize: "16px",
						textOverflow: "ellipsis",
						overflow: "hidden",
						color: "white",
					}}
				>
					Search
				</Button>
			</Row>
			<Row style={{ marginTop: "10px" }} wrap={false}>
				<Button
					onClick={() => setCollapsed(!collapsed)}
					icon={
						collapsed ? (
							<ControlOutlined style={{ fontSize: "30px" }} />
						) : (
							<ControlOutlined style={{ color: "#EE9437", fontSize: "30px" }} />
						)
					}
					style={{
						backgroundColor: collapsed ? "#E46F1B" : "#FFFFFF",
						width: "5%",
						height: "70px",
						border: "0px",
					}}
				/>
				<div
					style={{
						marginLeft: "15px",
						width: "15%",
						height: "70px",
						backgroundColor: "white",
						paddingTop: "10px",
						paddingLeft: "10px",
						borderRadius: "10px",
					}}
				>
					<Typography
						style={{
							fontSize: "16px",
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}
					>
						สถานะ
					</Typography>
					<Form.Item>
						<Dropdown menu={{ items: itemsCurrency, onClick: setQuoStatus }}>
							<a onClick={(e) => e.preventDefault()}>
								<Space
									style={{
										width: "90%",
										display: "flex",
										justifyContent: "space-between",
										color: ThemeColors.lightOrangeColor,
										textOverflow: "ellipsis",
										overflow: "hidden",
										marginTop: "-17px",
									}}
								>
									{status}
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</Form.Item>
				</div>
				<Link to="/admin/quotation/create" style={{ width: "12%" }}>
					<Button
						type="primary"
						icon={<PlusOutlined style={{ fontSize: "25px" }} />}
						style={{
							width: "100%",
							height: "70px",
							backgroundColor: "#E46F1B",
							fontSize: "16px",
							marginLeft: "10px",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						สร้างใบเสนอราคา
					</Button>
				</Link>
			</Row>
			{collapsed ? (
				<div></div>
			) : (
				<div style={{ height: "80px" }}>
					<Button
						style={{
							background: "white",
							border: "0px",
							height: "70px",
							marginTop: "10px",
							width: "10%",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						<Typography style={{ fontSize: "14px", textAlign: "center" }}>
							เลขที่เอกสาร
							<Typography
								style={{
									color: "#EE9437",
									fontSize: "14px",
									textAlign: "center",
								}}
							>
								QO-23200107000
							</Typography>
						</Typography>
					</Button>
					<Button
						style={{
							marginLeft: "10px",
							background: "white",
							border: "0px",
							height: "70px",
							width: "10%",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						<Typography style={{ fontSize: "14px", textAlign: "center" }}>
							ลูกค้า
							<Typography
								style={{
									color: "#EE9437",
									fontSize: "14px",
									textAlign: "center",
								}}
							>
								Sim
							</Typography>
						</Typography>
					</Button>
				</div>
			)}
			<Table
				columns={columns}
				dataSource={dataSource}
				style={{ marginTop: "10px", borderRadius: "12px" }}
			/>
		</div>
	);
};
