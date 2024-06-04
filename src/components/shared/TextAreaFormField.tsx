import { Form, Input } from "antd";
import { CSSProperties, FC } from "react";

const { TextArea } = Input;

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaFormField: FC<TextAreaFormFieldProps> = ({
  name,
  label,
  placeholder = "",
  rows = 4,
}) => {
  return (
    <Form.Item name={name} label={label}>
      <TextArea placeholder={placeholder} rows={rows} style={styles.textarea} />
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  textarea: {
    width: "100%",
    margin: "5px 0",
    marginTop: -10,
  },
};
