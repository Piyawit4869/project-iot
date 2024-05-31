import { Form, Input } from "antd";
import { CSSProperties, FC } from "react";

interface TextboxFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const TextboxFormField: FC<TextboxFormFieldProps> = (
  props: TextboxFormFieldProps
) => {
  const { name, label, placeholder , type } = props;

  return (
    <Form.Item name={name} label={label}>
      <Input type={type} placeholder={placeholder} style={styles.input} />
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
