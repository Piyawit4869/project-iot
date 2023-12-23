import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ThemeColors } from "@src/styles/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Datatype {
	key: String;
	customerName: String;
	ioNumber: String;
	tell: String;
}

interface CustomerTableProps {
	data: any[];
	// pagination: any;
}

export default function CustomerTable(props: CustomerTableProps) {
	const data = props.data;
	const { t } = useTranslation();
	const columns: ColumnsType<Datatype> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{id}</p>
			),
		},
		{
			title: t("company name"),
			dataIndex: "companyName",
			key: "companyName",
			render: (companyName: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{companyName}</p>
			),
		},
		{
			title: t("first name"),
			dataIndex: "firstName",
			key: "firstName",
			render: (firstName: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{firstName}</p>
			),
		},
		{
			title: t("last name"),
			dataIndex: "lastName",
			key: "lastName",
			render: (lastName: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{lastName}</p>
			),
		},
		{
			title: t("email"),
			dataIndex: "email",
			key: "email",
			render: (email: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{email}</p>
			),
		},
		{
			title: t("phone number"),
			dataIndex: "tel",
			key: "tel",
			render: (tel: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{tel}</p>
			),
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id: String) => (
				<Button>
					<Link to={`/customers/${id}`}>View</Link>
				</Button>
			),
		},
	];
	return (
		<>
			<Table
				size="middle"
				columns={columns}
				dataSource={data}
				style={{
					marginTop: "10px",
					textAlign: "center",
					wordWrap: "normal",
				}}
			/>
		</>
	);
}
