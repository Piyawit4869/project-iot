import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { useRef } from 'react';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';

export const UsersSingle = () => {
  const [form] = Form.useForm();
  const containerRef = useRef(null);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
  };

  // React.useEffect(() => {
  //   let businessRegister = null;
  //   if (organize && organize.openingDate) {
  //     businessRegister = dayjs(organize.openingDate);
  //   }
  //   form.setFieldsValue({
  //     ...organize,
  //     openingDate: businessRegister,
  //   });
  // }, [form, organize]);

  return (
    <div>
      <FormButtonsEdit form={form} />
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }} ref={containerRef}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              {renderForm.map((item: any) => (
                <DynamicForm
                  key={item.name}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  col={item.col}
                  option={item.option}
                  icon={item.icon}
                  value={item.value}
                  disabled={item.disabled}
                  checked={item.checked}
                />
              ))}
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UsersSingle;
