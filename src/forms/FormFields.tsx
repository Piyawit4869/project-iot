import { Row } from 'antd';
import { DynamicForm } from './Dynamic';

interface FormFieldsProps {
  renderForm: any[];
  uniqError?: any;
  type?: string;
  form: any;
}

export const FormFields = (props: FormFieldsProps) => {
  const { renderForm, type, form, uniqError } = props;

  // Helper function to find the error for a specific field
  const getFieldError = (fieldName: any) => {
    return (
      uniqError?.find((error: any) => error.name === fieldName) || {
        name: '',
        status: '',
        uniqError: false,
        errorMessage: '',
      }
    );
  };

  // console.log(uniqError);

  return (
    <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
      {renderForm.map((item: any, index: number) => {
        const fieldName = Array.isArray(item.name)
          ? item.name.join('.')
          : item.name; // Normalize field name to match uniqError naming
        const fieldError = getFieldError(fieldName);

        return (
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
            validateStatus={fieldError.status} // Use error status from uniqError
            isUniq={fieldError.uniqError} // Pass uniqError status
            errorUniqMessage={item.errorUniqMessage}
            isBranch={item.isBranch}
            labelRadio={item.labelRadio}
            nameRadio={item.nameRadio}
          />
        );
      })}
    </Row>
  );
};
