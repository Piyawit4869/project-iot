import { Outlet } from "react-router-dom";
import * as API from "../../apis";

export async function productLoader({ params }: any) {
	try {
		const { data } = await API.product.get(params.id);

		return { product: data.data };
	} catch (error) {
		return { product: null };
	}
}

export const ProductLayout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};
