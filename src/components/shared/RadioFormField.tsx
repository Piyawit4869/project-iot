import React, { useState } from "react";
import { Form, Radio } from "antd";
import { CSSProperties } from "react";

interface RadioFormFieldProps {
  name: string;

  options: { value: string | number; label: string }[];
  value?: string | number;
}

export const RadioFormField: React.FC<RadioFormFieldProps> = (
  props: RadioFormFieldProps
) => {
  const { options, name } = props;
  const [checkedValue, setCheckedValue] = useState<string | number | null>(
    null
  );

  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setCheckedValue(checkedValue === value ? null : value);
  };

  return (
    <Form.Item name={name}>
      <Radio.Group
        style={styles.radioGroup}
        onChange={handleRadioChange}
        value={checkedValue}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value} style={styles.radio}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: -10,
  },
  radio: {
    margin: "5px 0",
  },
};
