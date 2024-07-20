import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const {} = props;
  return (
    <>
      <Input
        addonBefore="ค้นหา"
        allowClear
        style={{ width: 304 }}
      />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{
          backgroundColor: "#19142A",
          borderColor: "#19142A",
        }}
      ></Button>
    </>
  );
};
