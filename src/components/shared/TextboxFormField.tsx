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
<<<<<<< HEAD
  const { name, label, placeholder , type } = props;
=======
  const { name, label, placeholder, type } = props;
>>>>>>> bbc74d0783083ffa6b20a98e4d81962ba81dfe78

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
