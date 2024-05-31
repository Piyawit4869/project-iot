import { Form } from "antd";
import { DatePicker } from "antd";
import { CSSProperties, FC } from "react";

interface DatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
}
export const DatePickerFormField: FC<DatePickerProps> = (
  props: DatePickerProps
) => {
  const { name, label, placeholder } = props;

  return (
    <Form.Item name={name} label={label}>
      <DatePicker placeholder={placeholder} style={styles.input} />
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
