// import Table from "@src/components/global/Table";
// import { ThemeColors } from "@src/styles/theme";
// import { ColumnsType } from "antd/es/table";

// export default function ProductTable() {
// 	const columns: ColumnsType<Datatype> = [
// 		{
// 			title: "",
// 			dataIndex: "key",
// 			render: () => (
// 				<EyeOutlined
// 					style={{ fontSize: "26px", color: ThemeColors.grayColor }}
// 				/>
// 			),
// 		},
// 		{
// 			title: t("first name"),
// 			dataIndex: "fname",
// 			key: "fname",
// 			render: (fname: String) => (
// 				<p style={{ color: ThemeColors.goldColor }}>{fname}</p>
// 			),
// 			responsive: ["md"],
// 		},
// 		{
// 			title: t("last name"),
// 			dataIndex: "lname",
// 			key: "lname",
// 			render: (lname: String) => (
// 				<p style={{ color: ThemeColors.goldColor }}>{lname}</p>
// 			),
// 		},
// 		{
// 			title: t("role"),
// 			dataIndex: "role",
// 			key: "role",
// 			render: (role: String) => (
// 				<p style={{ color: ThemeColors.blackColor }}>{role}</p>
// 			),
// 		},
// 		{
// 			title: t("phone number"),
// 			dataIndex: "phone",
// 			key: "phone",
// 			render: (role: String) => (
// 				<p style={{ color: ThemeColors.grayColor }}>{role}</p>
// 			),
// 		},
// 		{
// 			title: t("email"),
// 			dataIndex: "email",
// 			key: "email",
// 			responsive: ["md", "lg"],
// 			render: (email: String) => (
// 				<p
// 					style={{
// 						color: ThemeColors.grayColor,
// 					}}
// 				>
// 					{email}
// 				</p>
// 			),
// 		},
// 		{
// 			title: t("created at"),
// 			dataIndex: "createdAt",
// 			key: "createdAt",
// 			render: (createDate: String) => (
// 				<p style={{ color: ThemeColors.grayColor }}>{createDate}</p>
// 			),
// 		},
// 		{
// 			title: t("last used"),
// 			dataIndex: "lastActive",
// 			key: "lastActive",
// 			render: (lastActive: String) => (
// 				<p style={{ color: ThemeColors.grayColor }}>{lastActive}</p>
// 			),
// 		},
// 		{
// 			title: t("status"),
// 			dataIndex: "status",
// 			key: "status",
// 			render: (status: String) =>
// 				status === "Active" ? (
// 					<p style={{ color: "#22BE7D" }}>{status}</p>
// 				) : status === "Inactive" ? (
// 					<p style={{ color: "#EA5959" }}>{status}</p>
// 				) : (
// 					<p style={{ color: "#F0BA3D" }}>{status}</p>
// 				),
// 		},
// 		{
// 			title: "Action",
// 			dataIndex: "id",
// 			key: "id",
// 			render: (id: any) => (
// 				<Button>
// 					<Link to={`/users/${id}`}>View</Link>
// 				</Button>
// 			),
// 		},
// 	];

// 	return (
// 		<Table
// 			size="middle"
// 			columns={columns}
// 			dataSource={props.data}
// 			scroll={{ x: "max-content" }}
// 		/>
// 	);
// }
