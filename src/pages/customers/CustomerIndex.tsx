import { ThemeColors } from "../../styles/theme";
import { Title } from "../../components/global/Title";
import {
	Button,
	Dropdown,
	Form,
	Input,
	MenuProps,
	Space,
	Table,
	Typography,
	Row,
	message,
} from "antd";
import {
	DownOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	ControlOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import * as API from "../../apis";

interface Datatype {
	key: String;
	customerName: String;
	ioNumber: String;
	tell: String;
}

export async function customerIndexLoader() {
	// const url = new URL(params.request.url);
	// const query = url.searchParams;
	// const param = Object.fromEntries(query);

	try {
		// const search = { ...param, role: "user" };
		const res = await API.customer.paginate();

		return { customer: res.data };
	} catch (error) {
		return { data: null };
	}
}

export const CustomersPage = () => {
	const { t } = useTranslation();
	const { customer } = useLoaderData() as any;
	console.log(customer);

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

	// const onClickItemDropdown: MenuProps["onClick"] = ({ key }) => {
	// 	console.log("key", key);
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
			<Title title={t("customer setting")} textButton={""} button={false} />
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
				<Link to="/admin/customers/create" style={{ width: "12%" }}>
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

			<div>
				<Table
					size="middle"
					columns={columns}
					dataSource={customer}
					style={{
						marginTop: "40px",
						textAlign: "center",
						wordWrap: "normal",
					}}
				/>
			</div>
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
