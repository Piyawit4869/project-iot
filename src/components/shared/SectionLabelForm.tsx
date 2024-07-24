import { Flex, FormItemProps } from 'antd';
import { CSSProperties, FC, ReactNode } from 'react';

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
  labelFontSize = '22px',
  lineThickness = '2px',
  showLine = false,
}) => {
  const labelStyle: CSSProperties = {
    fontSize: labelFontSize,
    fontWeight: 'bold',
    borderBottom: `${lineThickness} solid #010101`,
  };

  return (
    <Flex vertical style={{ margin: '20px 0px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
        <span style={labelStyle}>{label}</span>
      </div>
      {showLine && <div style={labelStyle}></div>}
    </Flex>
  );
};
