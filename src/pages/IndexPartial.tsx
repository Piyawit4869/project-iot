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
	CalculatorOutlined,
	ControlOutlined,
	DownOutlined,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

export const IndexPartialPage = () => {
	interface DataType {
		key: React.Key;
		name: string;
		amout: number;
		cost: number;
		status: boolean;
	}

	const columns: ColumnsType<DataType> = [
		{
			title: "ชื่อโครงการ",
			dataIndex: "name",
			key: "name",
			render: (name) => (
				<Typography style={{ color: ThemeColors.orangeColor }}>
					{name}
				</Typography>
			),
		},
		{
			title: "จำนวนผู้รับผิดชอบ (คน)",
			dataIndex: "amout",
			key: "amout",
		},
		{
			title: "มูลค่าโครงการ (บาท)",
			dataIndex: "cost",
			key: "cost",
		},
		{
			title: "สถานะ",
			dataIndex: "status",
			key: "status",
			render: (status) => (status ? "ดำเนินการ" : "สำเร็จ"),
		},

		{
			title: "",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Link to="/admin/partial/create">
					<Button
						onClick={() => {}}
						style={{ backgroundColor: ThemeColors.orangeColor }}
					>
						<Row align="middle">
							<CalculatorOutlined
								style={{ color: "white", fontSize: "18px", marginRight: "5px" }}
							/>
							<Typography style={{ color: "white" }}>คำนวณ</Typography>
						</Row>
					</Button>
				</Link>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			name: "Stay-organize",
			amout: 8,
			cost: 4000000,
			status: true,
		},
		{
			key: "2",
			name: "Im-sud",
			amout: 4,
			cost: 100000,
			status: false,
		},
	];

	// const onClickCurrency: MenuProps["onClick"] = ({ key }) => {
	// 	message.info(`Click on item ${key}`);
	// };

	const itemsCurrency: MenuProps["items"] | any = [
		{
			label: "กำลังดำเนินการ",
			key: "กำลังดำเนินการ",
		},
		{
			label: "สำเร็จ",
			key: "สำเร็จ",
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
			<Title title="การชำระเงินโครงการ" textButton={""} button={false} />
			<Typography
				style={{
					fontSize: "16px",
					color: ThemeColors.grayColor,
					marginTop: "20px",
				}}
			>
				ข้อมูลโครงการที่จัดทำในองค์กร/กิจการ
				สามารถเพิ่มหรือจัดการคำนวณการชำระเงินในแต่ละโครงการได้
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
				<Link to="/admin/user/create" style={{ width: "12%" }}>
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
						เพิ่มโครงการ
					</Button>
				</Link>
			</Row>
			<Table
				columns={columns}
				dataSource={data}
				style={{ marginTop: "15px" }}
			/>
			;
		</div>
	);
};
