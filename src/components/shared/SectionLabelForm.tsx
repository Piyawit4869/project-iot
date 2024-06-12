import { Form, FormItemProps } from "antd";
import { CSSProperties, FC, ReactNode } from "react";

interface SectionLabelFormProps extends FormItemProps {
  label: string;
  icon?: ReactNode;
  lineThickness?: string;
  labelFontSize?: string;
  labelMarginBottom?: number;
  showLine?: boolean;
}

export const SectionLabelForm: FC<SectionLabelFormProps> = ({
  label,
  icon,
  labelFontSize = "22px",
  labelMarginBottom = -20,
  lineThickness = "2px",
  showLine = false,
  ...formItemProps
}) => {
  const labelStyle: CSSProperties = {
    fontSize: labelFontSize,
    marginBottom: labelMarginBottom,
    fontWeight: "bold",
    borderBottom: `${lineThickness} solid #010101`,
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
          {showLine && <div style={labelStyle}></div>}
        </div>
      }
      {...formItemProps}
    ></Form.Item>
  );
};
