import { ThemeColors } from "../../styles/theme";
import { Title } from "../../components/global/Title";
import * as API from "../../apis";

import {
	DownOutlined,
	PlusOutlined,
	SearchOutlined,
	EyeOutlined,
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
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

interface Datatype {
	key: String;
	fname: String;
	lname: String;
	role: String;
	phone: String;
	email: String;
	createDate: String;
	lastActive: String;
	status: String | any;
	// status: any;
}

export async function userIndexLoader(params: any) {
	// const url = new URL(params.request.url);
	// const query = url.searchParams;
	// const param = Object.fromEntries(query);

	try {
		// const search = { ...param, role: "user" };
		const res = await API.user.paginate();

		return { user: res.data.items };
	} catch (error) {
		return { data: null };
	}
}

export const UsersPage = () => {
	const { user } = useLoaderData() as any;
	console.log(user);

	const dataTable: Datatype[] = [
		{
			key: "1",
			fname: "pitoo",
			lname: "too too too too",
			role: "ผู้ดูแลระบบสูงสุด",
			phone: "099-0000000",
			email: "pitoo@email.com",
			createDate: "30/07/66",
			lastActive: "01/08/66 21:31",
			status: "Active",
		},
		{
			key: "2",
			fname: "เกียรติภูมิ",
			lname: "พูลเขตร์กิจ",
			role: "ผู้ดูแลระบบ",
			phone: "088-8666666",
			email: "kittiphoom@email.com",
			createDate: "01/08/66",
			lastActive: "01/08/66 21:31",
			status: "Inactive",
		},
		{
			key: "3",
			fname: "ภัทรดา",
			lname: "พร้อมกิจจานนท์",
			role: "ผู้ดูแลระบบ",
			phone: "088-8669966",
			email: "padrada.ttpp@email.com",
			createDate: "11/08/66",
			lastActive: "01/08/66 21:31",
			status: "Pending",
		},
		{
			key: "4",
			fname: "Taksin",
			lname: "Shinnawat",
			role: "ผู้ดูแลระบบสูงสุด",
			phone: "088-0112365",
			email: "Takky@email.com",
			createDate: "04/06/66",
			lastActive: "19/08/66 12:31",
			status: "Inactive",
		},
		{
			key: "5",
			fname: "Tootoo",
			lname: "Toomaleaw",
			role: "ผู้ดูแลระบบสูงสุด",
			phone: "088-4444444",
			email: "M44ORM16?@email.com",
			createDate: "30/07/66",
			lastActive: "01/08/66 21:31",
			status: "Active",
		},
	];

	const columns: ColumnsType<Datatype> = [
		{
			title: "",
			dataIndex: "key",
			render: () => (
				<EyeOutlined
					style={{ fontSize: "26px", color: ThemeColors.grayColor }}
				/>
			),
		},
		{
			title: "ชื่อจริง",
			dataIndex: "fname",
			key: "fname",
			render: (fname: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{fname}</p>
			),
			responsive: ["md"],
		},
		{
			title: "นามสกุล",
			dataIndex: "lname",
			key: "lname",
			render: (lname: String) => (
				<p style={{ color: ThemeColors.goldColor }}>{lname}</p>
			),
		},
		{
			title: "บทบาท",
			dataIndex: "role",
			key: "role",
			render: (role: String) => (
				<p style={{ color: ThemeColors.blackColor }}>{role}</p>
			),
		},
		{
			title: "เบอร์โทรศัพท์",
			dataIndex: "phone",
			key: "phone",
			render: (role: String) => (
				<p style={{ color: ThemeColors.grayColor }}>{role}</p>
			),
		},
		{
			title: "อีเมล",
			dataIndex: "email",
			key: "email",
			responsive: ["md", "lg"],
			render: (email: String) => (
				<p
					style={{
						color: ThemeColors.grayColor,
					}}
				>
					{email}
				</p>
			),
		},
		{
			title: "สร้างเมื่อ",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createDate: String) => (
				<p style={{ color: ThemeColors.grayColor }}>{createDate}</p>
			),
		},
		{
			title: "การใช้งานล่าสุด",
			dataIndex: "lastActive",
			key: "lastActive",
			render: (lastActive: String) => (
				<p style={{ color: ThemeColors.grayColor }}>{lastActive}</p>
			),
		},
		{
			title: "สถานะ",
			dataIndex: "status",
			key: "status",
			render: (status: String) =>
				status === "Active" ? (
					<p style={{ color: "#22BE7D" }}>{status}</p>
				) : status === "Inactive" ? (
					<p style={{ color: "#EA5959" }}>{status}</p>
				) : (
					<p style={{ color: "#F0BA3D" }}>{status}</p>
				),
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "id",
			render: (id: any) => (
				<Button>
					<Link to={`/admin/user/create/${id}`}>View</Link>
				</Button>
			),
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

	const itemsCurrency: MenuProps["items"] | any = [
		{
			label: "ผู้ดูแลระบบสูงสุด",
			key: "ผู้ดูแลระบบสูงสุด",
		},
		{
			label: "ผู้ดูแลระบบ",
			key: "ผู้ดูแลระบบ",
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
			{Title("ตั้งค่าผู้ใช้งาน", false, "")}
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
						บทบาท
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
						เพิ่มผู้ใช้
					</Button>
				</Link>
			</Row>

			<Row>
				<Table
					size="middle"
					columns={columns}
					dataSource={user}
					style={{
						marginTop: "15px",
						textAlign: "center",
						wordWrap: "normal",
						width: "100%",
					}}
				/>
			</Row>
			{/* <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          float: "right",
        }}
      >
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          แสดง
        </Typography>
        <Dropdown menu={menuProps}>
          <Button
            style={{
              marginRight: "10px",
              border: "0px",
              fontSize: "18px",
            }}
          >
            <Space
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                color: ThemeColors.orangeColor,
              }}
            >
              10
              <DownOutlined style={{ fontSize: "18px" }} />
            </Space>
          </Button>
        </Dropdown>
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          รายการ
        </Typography>
        <Button
          style={{
            marginRight: "10px",
            border: "0px",
            fontSize: "18px",
            color: ThemeColors.orangeColor,
          }}
          icon={<LeftOutlined />}
        />
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          หน้า
        </Typography>
        <Button
          style={{
            marginRight: "10px",
            border: "0px",
            fontSize: "18px",
            textAlign: "right",
          }}
        >
          <Space
            style={{
              textAlign: "right",
              width: "80px",
              display: "flex",
              justifyContent: "space-between",
              color: ThemeColors.orangeColor,
            }}
          >
            1
          </Space>
        </Button>
        <Button
          style={{
            border: "0px",
            fontSize: "18px",
            color: ThemeColors.orangeColor,
          }}
          icon={<RightOutlined />}
        />
      </div> */}
		</div>
	);
};
