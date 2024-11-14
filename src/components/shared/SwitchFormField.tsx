import React from 'react';
import { Flex, Form, Radio, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SwitchProps } from 'antd/lib/switch';

interface RadioOption {
  label: string;
  value: string;
  checked: boolean;
}
interface SwitchFormFieldProps extends FormItemProps {
  label?: string;
  labelRadio?: string;
  name?: string;
  nameRadio?: string;
  switchProps?: SwitchProps;
  disabled: boolean;
  checked: boolean;
  checkedText?: string;
  unCheckedText?: string;
  isBranch?: boolean;
  options: RadioOption[];
  rules?: any[];
  defaultValue?: any;
}

export const SwitchFormField: React.FC<SwitchFormFieldProps> = (
  props: SwitchFormFieldProps,
) => {
  const {
    label,
    labelRadio,
    disabled,
    name,
    nameRadio,
    switchProps,
    checked,
    checkedText,
    unCheckedText,
    isBranch,
    options,
    rules,
    defaultValue,
    ...formItemProps
  } = props;
  return (
    <Flex justify="space-between">
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
      {isBranch ? (
        <Form.Item name={nameRadio} label={labelRadio} rules={rules}>
          <Radio.Group defaultValue={defaultValue}>
            {options.map((option: any) => (
              <Radio value={option.value} key={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : (
        <></>
      )}
    </Flex>
  );
};
