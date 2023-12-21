import { Outlet } from "react-router-dom";
import * as API from "../../apis";

export async function customerLoader({ params }: any) {
	try {
		const { data } = await API.customer.get(params.id);

		return { product: data.data };
	} catch (error) {
		return { product: null };
	}
}

export const CustomerLayout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
