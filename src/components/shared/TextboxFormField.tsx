import { Form, Input } from "antd";
import { CSSProperties, FC } from "react";

interface TextboxFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const TextboxFormField: FC<TextboxFormFieldProps> = (
  props: TextboxFormFieldProps
) => {
  const { name, label, placeholder } = props;

  return (
    <Form.Item name={name} label={label}>
      <Input placeholder={placeholder} style={styles.input} />
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
