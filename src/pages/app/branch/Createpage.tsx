
import { Form, Row, Col } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { useRef, useState } from 'react';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
export const BranchCreate = () => {
  const [form] = Form.useForm();
  const containerRef = useRef(null);
  const [] = useState(false);

  

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
  };

  return (
    <div>
      <FormButtonsEdit form={form} />
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }} ref={containerRef}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              >
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
                      ruleMessage={item.message}
                      require={item.require}
                      disabled={item.disabled}
                      checked={item.checked}
                    />
                  ))}
                </Row>
              </Col>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              ></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BranchCreate;
