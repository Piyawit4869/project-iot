import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function UButton() {
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
		สร้างใบเสนอราคา
	</Button>;
}
