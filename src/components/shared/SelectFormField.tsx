import { Form, Select } from "antd";
import { CSSProperties } from "react";

interface SelectFormFieldProps {
  label: string;
  name: string;
  options: Array<object>;
  placeholder?: string;
}

export const SelectFormField: React.FC<SelectFormFieldProps> = (
  props: SelectFormFieldProps
) => {
  const { options, placeholder, name, label } = props;
  return (
    <Form.Item label={label} name={name}>
      <Select
        style={styles.input}
        placeholder={placeholder}
        options={options}
      ></Select>
    </Form.Item>
  );
};
const styles: Record<string, CSSProperties> = {
  input: {
    width: "100%",
    margin: "5px 0",
    marginTop: -10,
  },
};
