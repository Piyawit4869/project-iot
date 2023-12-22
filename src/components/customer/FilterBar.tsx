import {
	Button,
	Dropdown,
	Form,
	MenuProps,
	Row,
	Space,
	Typography,
	message,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@src/styles/theme";
import { ControlOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";

export default function FilterBar() {
	const [collapsed, setCollapsed] = useState(false);
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

	let [status, setStatus] = useState<string>(itemsCurrency[0].label);
	const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
		setStatus((status = key));
		message.info(`เลือกสถาณะ ${key}`);
	};
	const { t } = useTranslation();

	return (
		<Row style={{ marginTop: "10px", marginBottom: "10px" }} wrap={false}>
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
					{t("status")}
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
			<Link to="/customers/new" style={{ width: "12%" }}>
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
					{t("create customer")}
				</Button>
			</Link>
		</Row>
	);
}
