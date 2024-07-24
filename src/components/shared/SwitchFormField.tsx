import React from 'react';
import { Form, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SwitchProps } from 'antd/lib/switch';

interface SwitchFormFieldProps extends FormItemProps {
  label?: string;
  name?: string;
  switchProps?: SwitchProps;
  disabled: boolean;
  checked: boolean;
  require: boolean;
}

export const SwitchFormField: React.FC<SwitchFormFieldProps> = (
  props: SwitchFormFieldProps,
) => {
  const {
    label,
    disabled,
    name,
    switchProps,
    checked,
    require,
    ...formItemProps
  } = props;
  return (
    <Form.Item required={require} label={label} name={name} {...formItemProps}>
      <Switch
        {...switchProps}
        defaultValue={false}
        disabled={disabled}
        checked={checked}
      />
    </Form.Item>
  );
};
