import { SearchOutlined } from "@ant-design/icons";
import { ThemeColors } from "@src/styles/theme";
import { Button, Input, Row } from "antd";

export const SearchBox = (props: any) => {
	return (
		<Row style={{ marginTop: "10px" }} wrap={false}>
			<Input
				prefix={<SearchOutlined style={{ color: "black", fontSize: "25px" }} />}
				placeholder={props.placeHolder}
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
	);
};
