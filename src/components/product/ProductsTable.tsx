import { Button, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@src/styles/theme";

interface Datatype {
	key: String;
	productname: String;
	description: String;
	type: String;
	count: number;
	price: String;

	// status: any;
}

export const ProductTable = () => {
	const { t } = useTranslation();
	const { product } = useLoaderData() as any;
	const columns: ColumnsType<Datatype> = [
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
	];
	return (
		<Row>
			<Table
				size="middle"
				pagination={false}
				columns={columns}
				dataSource={product}
				style={{ marginTop: "15px", textAlign: "center", width: "100%" }}
			/>
		</Row>
	);
};
