import { Title } from "@src/components/global/Title";

import { MenuProps, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";

import { SearchBox } from "@src/components/global/SearchBox";
import { FilterBar } from "@src/components/product/FilterBar";
import { ProductTable } from "@src/components/product/ProductsTable";
import * as API from "@src/apis";
import { ControlOutlined } from "@ant-design/icons";
import { useState } from "react";

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

	const [collapsed, setCollapsed] = useState(false);

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

	let [status, setStatus] = useState<string>(itemsCurrency[0].label);
	const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
		setStatus((status = key));
		message.info(`เลือกสถาณะ ${key}`);
	};

	return (
		<>
			<Title
				title={t("product and service name")}
				textButton={""}
				button={false}
			/>
			<Typography>{t("information about products and services")}</Typography>
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
			<ProductTable />
		</>
	);
};
