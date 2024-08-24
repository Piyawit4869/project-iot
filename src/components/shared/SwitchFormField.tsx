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
  checkedText?: string;
  unCheckedText?: string;
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
    checkedText,
    unCheckedText,
    ...formItemProps
  } = props;
  return (
    <Form.Item label={label} name={name} {...formItemProps}>
      <Switch
        checkedChildren={checkedText ? checkedText : 'เปิด'}
        unCheckedChildren={unCheckedText ? unCheckedText : 'ปิด'}
        {...switchProps}
        defaultValue={true}
        disabled={disabled}
        checked={checked}
      />
    </Form.Item>
  );
};
