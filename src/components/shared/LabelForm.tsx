import { Form, FormItemProps } from "antd";
import { CSSProperties, FC, ReactNode } from "react";

interface LabelFormProps extends FormItemProps {
  label: string;
  icon?: ReactNode;
  lineThickness?: string;
  labelFontSize?: string;
  labelMarginBottom?: number;
 
}

export const LabelForm: FC<LabelFormProps> = ({
  label,
  icon,
  labelFontSize = "22px",
  labelMarginBottom = -20,

  ...formItemProps
}) => {
  const labelStyle: CSSProperties = {
    fontSize: labelFontSize,
    marginBottom: labelMarginBottom,
    fontWeight: "bold",
  };

  return (
    <Form.Item
      label={
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            <span style={labelStyle}>{label}</span>
          </div>

        </div>
      }
      {...formItemProps}
    ></Form.Item>
  );
};