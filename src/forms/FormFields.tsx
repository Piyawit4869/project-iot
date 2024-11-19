import { Row } from 'antd';
import { DynamicForm } from './Dynamic';

interface FormFieldsProps {
  renderForm: any[];
  isUniq?: boolean;
  status?: string;
  type?: string;
  form: any;
}

export const FormFields = (props: FormFieldsProps) => {
  const { renderForm, isUniq, status, type, form } = props;

  return (
    <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
      {renderForm.map((item: any, index: number) => (
        <DynamicForm
          key={index}
          name={item.name}
          label={item.label}
          placeholder={item.placeholder}
          type={item.type}
          col={item.col}
          icon={item.icon}
          value={item.value}
          rule={item.rule}
          option={item.options}
          disabled={item.disabled}
          checked={item.checked}
          maxLength={item.maxLength}
          defaultValue={item.defaultValue}
          businessType={type}
          isName={item.isName}
          title={item.title}
          description={item.description}
          form={form}
          checkedText={item.checkedText}
          unCheckedText={item.unCheckedText}
          isUniq={isUniq}
          validateStatus={status}
          errorUniqMessage={item.errorUniqMessage}
          isBranch={item.isBranch}
          labelRadio={item.labelRadio}
          nameRadio={item.nameRadio}
        />
      ))}
    </Row>
  );
};
