import { Form, FormItemProps } from "antd";
import { CSSProperties, FC, ReactNode } from "react";

interface LabelFormProps extends FormItemProps {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  labelFontSize?: string;
  labelMarginBottom?: number;
}

export const LabelForm: FC<LabelFormProps> = ({
  label,
  icon,
  children,
  labelFontSize = "14px",
  labelMarginBottom = 0,
  ...formItemProps
}) => {
  const labelStyle: CSSProperties = {
    fontSize: labelFontSize,
    marginBottom: labelMarginBottom,
  };

  return (
    <Form.Item
      label={
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          <span style={labelStyle}>{label}</span>
        </div>
      }
      {...formItemProps}
    >
      {children}
    </Form.Item>
  );
};
