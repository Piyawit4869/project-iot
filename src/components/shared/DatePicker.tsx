import { Form } from 'antd';
import { DatePicker } from 'antd';
import { CSSProperties, FC } from 'react';

interface DatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  rule?: any;
}
export const DatePickerFormField: FC<DatePickerProps> = (
  props: DatePickerProps,
) => {
  const { name, label, placeholder, rule } = props;
  const dateFormat = 'DD/MM/YYYY';
  return (
    <Form.Item name={name} label={label} rules={rule}>
      <DatePicker
        placeholder={placeholder}
        style={styles.input}
        format={dateFormat}
      />
    </Form.Item>
  );
};
const styles: Record<string, CSSProperties> = {
  input: {
    width: '100%',
    margin: '5px 0',
    marginTop: -10,
  },
};
