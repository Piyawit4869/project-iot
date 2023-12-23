import { Title } from "../../components/global/Title";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { SearchBox } from "@src/components/global/SearchBox";
import * as API from "@src/apis";
import CustomerTable from "@src/components/customer/CustomerTable";
import FilterBar from "@src/components/customer/FilterBar";

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

	return (
		<div>
			<Title title={t("customer setting")} textButton={""} button={false} />
			<SearchBox placeHolder={"Search for customer"} />
			<FilterBar />
			<CustomerTable data={customer} />
		</div>
	);
};
