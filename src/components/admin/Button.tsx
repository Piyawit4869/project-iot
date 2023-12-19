import { Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

export default function UButton(props: any) {
	let content = props.content;
	return <Button>{content}</Button>;
}
