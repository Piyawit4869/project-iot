import { ThemeColors } from "@src/styles/theme";
import { Title } from "@src/components/global/Title";
import * as API from "@src/apis";
// import ProductTable from "@src/components/product/ProductsTable";
import {
	DownOutlined,
	PlusOutlined,
	SearchOutlined,
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
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import { Link, useLoaderData } from "react-router-dom";
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

export async function productIndexLoader() {
	// const url = new URL(params.request.url);
	// const query = url.searchParams;
	// const param = Object.fromEntries(query);

	try {
		// const search = { ...param, role: "user" };
		const res = await API.product.paginate();

		return { product: res.data };
	} catch (error) {
		return { data: null };
	}
}

export const ProductPage = () => {
	const { t } = useTranslation();
	const { product } = useLoaderData() as any;
	console.log(product);

	const columns: ColumnsType<Datatype> = [
		// {
		// 	title: "",
		// 	dataIndex: "key",
		// 	render: (key: String) => (
		// 		<p style={{ color: ThemeColors.orangeColor }}>{key}</p>
		// 	),
		// },
		{
			title: t("product and service name"),
			dataIndex: "title",
			key: "title",
			render: (productname: String) => (
				<p style={{ color: ThemeColors.orangeColor }}>{productname}</p>
			),
		},
		{
			title: t("description"),
			dataIndex: "description",
			key: "description",
			render: (description: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{description}</p>
			),
		},
		{
			title: t("quantity"),
			dataIndex: "quantity",
			key: "quantity",
			render: (quantity: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{quantity}</p>
			),
		},
		{
			title: t("price"),
			dataIndex: "price",
			key: "price",
			render: (price: number) => (
				<p style={{ color: ThemeColors.blackColor }}>{price}</p>
			),
		},
		{
			title: "Action",
			dataIndex: "title",
			key: "action",
			render: (title: any) => (
				<Button>
					<Link to={`/products/${title}`}>View</Link>
				</Button>
			),
		},
		// {
		// 	render: (key: any) => (
		// 		<Link to={`/admin/product/update`}>
		// 			<Button
		// 				onClick={() => console.log(key.key)}
		// 				style={{
		// 					backgroundColor: ThemeColors.orangeColor,
		// 					color: ThemeColors.whiteColor,
		// 					border: "0px",
		// 					height: "40px",
		// 					width: "100px",
		// 				}}
		// 				icon={<EditOutlined style={{ fontSize: "18px" }} />}
		// 			>
		// 				แก้ไข
		// 			</Button>
		// 		</Link>
		// 	),
		// },
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
			<Title
				title={t("product and service name")}
				textButton={""}
				button={false}
			/>
			<Typography>{t("information about products and services")}</Typography>
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
						{t("type")}
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
						{t("add product")}
					</Button>
				</Link>
			</Row>
			<Row>
				<Table
					size="middle"
					pagination={false}
					columns={columns}
					dataSource={product}
					style={{ marginTop: "15px", textAlign: "center", width: "100%" }}
				/>
			</Row>
		</div>
	);
};
