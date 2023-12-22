import * as API from "@src/apis";

import { ControlOutlined } from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Title } from "@components/global/Title";
import { UserTable } from "@src/components/user/UserTable";
import { SearchBox } from "@src/components/global/SearchBox";
import { FilterBar } from "@src/components/user/FilterBar";

export async function userIndexLoader() {
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
	const { t } = useTranslation();

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
			<Title title={t("user setting")} textButton={""} button={false} />
			<SearchBox placeHolder={"Search for User"} />
			<FilterBar
				onFilterClick={() => setCollapsed(!collapsed)}
				filterIcon={
					collapsed ? (
						<ControlOutlined style={{ fontSize: "30px" }} />
					) : (
						<ControlOutlined style={{ color: "#EE9437", fontSize: "30px" }} />
					)
				}
				filterCollapsed={collapsed}
				role={status}
				roleMenu={{ items: itemsCurrency, onClick: setQuoStatus }}
			/>
			<UserTable data={user} />
		</div>
	);
};
