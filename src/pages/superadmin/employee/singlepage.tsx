import { Form, Button, Row, Col, Timeline } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { useRef, useState } from 'react';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderEditForm } from './renderForm';

export const UsersSingle = () => {
  const [form] = Form.useForm();
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const timelineItems = [
    'Create a services site 2015-09-01',
    'Solve initial network problems 2015-09-01',
    'Technical testing 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
  ];

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
                  {renderEditForm.map((item: any) => (
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
              </Col>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              >
                <div style={{ height: '100px' }}>
                  <h1>กิจกรรม</h1>
                </div>
                <div
                  style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '40px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                  }}
                >
                  <Timeline>
                    {(showMore ? timelineItems : timelineItems.slice(0, 5)).map(
                      (item, index) => (
                        <Timeline.Item key={index}>{item}</Timeline.Item>
                      ),
                    )}
                  </Timeline>
                  {timelineItems.length > 10 && (
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                      <Button
                        type="link"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'See Less' : 'See More'}
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UsersSingle;
