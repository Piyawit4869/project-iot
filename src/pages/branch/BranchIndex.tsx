import { EyeOutlined } from "@ant-design/icons";
import { BreadcrumbData, GlobalBreadcrumb } from "@src/components/global/GlobalBreadcrumb";
import { GlobalIndexHeader } from "@src/components/global/GlobalIndexHeader";
import { GlobalTable } from "@src/components/global/GlobalTable";
import { ThemeColors } from "@src/styles/theme";
import { Button, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Datatype {
	title: string;
	description: string;
	quantity: string;
	price: string;
  }
export const BranchIndex = () => {
	const { t } = useTranslation();
	const columns: TableProps<Datatype>["columns"] = [
	  {
		title: t("productAndServiceName"),
		dataIndex: "title",
		key: "title",
		render: (productname: String) => (
		  <p style={{ color: ThemeColors.blackColor }}>{productname}</p>
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
		  <Link
			to={`/products/${title}`}
			style={{ display: "flex", justifyContent: "center" }}
		  >
			<Button
			  icon={<EyeOutlined />}
			  style={{
				color: "#fff",
				display: "flex",
				alignItems: "center",
			  }}
			>
			  {t("inspect")}
			</Button>
		  </Link>
		),
	  },
	];
	const dataSource: Datatype[] = [
		{
		  title: "Website",
		  description: "This is Website",
		  quantity: "1",
		  price: "2000",
		},
	];
	const breadcrumbItem: BreadcrumbData[] = [
		{
			title:"Branches",
		},
	];
    return (
        <>
        	<GlobalBreadcrumb breadcrumbItems={breadcrumbItem}/>
			<GlobalIndexHeader
       			title={t("branchesBusinessOrOrganization")}
      			titleDescription={t("searchForBusinessOrOrganization")}
        		addItemsButton={t("addBusinessOrOrganization")}
				link={"/branches/create"}
      		/>
		  <GlobalTable dataSource={dataSource} columns={columns} />
        </>
    )
}