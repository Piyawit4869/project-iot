import { BranchTitle } from "@src/components/branch/Title"
import { SearchBox } from "@src/components/global/SearchBox"
import { BranchTable } from "@src/components/branch/Table"
import { FilterBar } from "@src/components/branch/FilterBar"
import { ControlOutlined } from "@ant-design/icons"
import { useState } from "react"
import { MenuProps, message } from "antd"

export const BranchIndex = () => {
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

    const [collapsed, setCollapsed] = useState(false);
    let [status, setStatus] = useState<string>(itemsCurrency[0].label);
    const setQuoStatus: MenuProps["onClick"] = ({ key }) => {
		setStatus((status = key));
		message.info(`เลือกสถาณะ ${key}`);
	};
    return (
        <>
            <BranchTitle/>
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
            <BranchTable/>
        </>
    )
}