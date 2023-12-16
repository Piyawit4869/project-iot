import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";

import {
	DownOutlined,
	PlusOutlined,
	SearchOutlined,
	EditOutlined,
	ControlOutlined,
} from "@ant-design/icons";
import {
	Input,
	Button,
	Dropdown,
	Space,
	MenuProps,
	Typography,
	Form,
	Table,
	Row,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Datatype {
	key: String;
	productname: String;
	description: String;
	type: String;
	count: number;
	price: String;

	// status: any;
}

export const ProductPage = () => {
	const dataTable: Datatype[] = [
		{
			key: "1",
			productname: "การออกแบบ",
			description: "การออกแบบ Flow Chart และ User Journey ของระบบ",
			type: "บริการ",
			count: 4,
			price: "10,000",
		},
		{
			key: "2",
			productname: "ถางหญ้าหน้าบ้านพระอิน",
			description: "ถางหญ้าออก",
			type: "บริการ",
			count: 1,
			price: "600,000",
		},
		{
			key: "3",
			productname: "ให้อาหารช้าง",
			description: "ให้ช้างแดกข้าว",
			type: "บริการ",
			count: 1,
			price: "10,000,000",
		},
		{
			key: "4",
			productname: "ขี่ช้างไล่จับไดโนเสาร์",
			description: "พาช้างไปวิ่งเล่น",
			type: "บริการ",
			count: 6,
			price: "60,711,452",
		},
		{
			key: "5",
			productname: "ออกแบบแอปพลิเคชั่นสำรวจดาวอังคาร",
			description: "การออกแบบ Flow และ Agenda คร่าว ๆ ในการส่ง",
			type: "บริการ",
			count: 1,
			price: "970,003,654",
		},
	];

	const columns: ColumnsType<Datatype> = [
		{
			title: "",
			dataIndex: "key",
			render: (key: String) => (
				<p style={{ color: ThemeColors.orangeColor }}>{key}</p>
			),
		},
		{
			title: "ชื่อสินค้า/บริการ",
			dataIndex: "productname",
			key: "productname",
			render: (productname: String) => (
				<p style={{ color: ThemeColors.orangeColor }}>{productname}</p>
			),
		},
		{
			title: "คำอธิบาย",
			dataIndex: "description",
			key: "description",
			render: (description: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{description}</p>
			),
		},
		{
			title: "ประเภท",
			dataIndex: "type",
			key: "type",
			render: (type: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{type}</p>
			),
		},
		{
			title: "จำนวน",
			dataIndex: "count",
			key: "count",
			render: (count: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{count}</p>
			),
		},
		{
			title: "ราคา",
			dataIndex: "price",
			key: "price",
			render: (price: number) => (
				<p style={{ color: ThemeColors.blackColor }}>{price}</p>
			),
		},
		{
			render: (key: any) => (
				<Link to={`/admin/product/update`}>
					<Button
						onClick={() => console.log(key.key)}
						style={{
							backgroundColor: ThemeColors.orangeColor,
							color: ThemeColors.whiteColor,
							border: "0px",
							height: "40px",
							width: "100px",
						}}
						icon={<EditOutlined style={{ fontSize: "18px" }} />}
					>
						แก้ไข
					</Button>
				</Link>
			),
		},
	];

	const itemsCurrency: MenuProps["items"] | any = [
		{
			label: "สินค้า",
			key: "สินค้า",
		},
		{
			label: "บริการ",
			key: "บริการ",
		},
	];

	// const itemdropdown: MenuProps["items"] = [
	// 	{
	// 		label: "ทั้งหมด",
	// 		key: "1",
	// 	},
	// 	{
	// 		label: "ร่าง",
	// 		key: "2",
	// 	},
	// 	{
	// 		label: "รออนุมัติ",
	// 		key: "3",
	// 	},
	// 	{
	// 		label: "รอตอบรับ",
	// 		key: "4",
	// 	},
	// 	{
	// 		label: "ตอบรับแล้ว",
	// 		key: "5",
	// 	},
	// ];

	const [collapsed, setCollapsed] = useState(false);

	let [status, setStatus] = useState<string>(itemsCurrency[0].label);
	const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
		setStatus((status = key));
		message.info(`เลือกสถาณะ ${key}`);
	};

	return (
		<div>
			{Title("ส้นค้า/บริการ", false, "")}
			<Typography>
				ข้อมูลสินค้าและบริการขององค์กร และข้อมูลที่อยู่เพื่อใช้แสดงในหน้าเอกสาร
			</Typography>
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
						ประเภท
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
				<Link to="/admin/product/create" style={{ width: "12%" }}>
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
						เพิ่มสินค้า
					</Button>
				</Link>
			</Row>
			<Row>
				<Table
					size="middle"
					pagination={false}
					columns={columns}
					dataSource={dataTable}
					style={{ marginTop: "15px", textAlign: "center", width: "100%" }}
				/>
			</Row>
		</div>
	);
};
