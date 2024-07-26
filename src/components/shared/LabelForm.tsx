import { Flex, FormItemProps } from 'antd';
import { CSSProperties, FC, ReactNode } from 'react';

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
  labelFontSize = '24px',
  labelMarginBottom = -0,
}) => {
  const labelStyle: CSSProperties = {
    fontSize: labelFontSize,
    marginBottom: labelMarginBottom,
    fontWeight: 'bold',
  };

  return (
    <Flex vertical style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
        <span style={labelStyle}>{label}</span>
      </div>
    </Flex>
  );
};
