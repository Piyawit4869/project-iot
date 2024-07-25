import { Form, Button, Row, Col, Timeline } from 'antd';

import { DynamicForm } from '@src/forms/Dynamic';
import { useRef, useState } from 'react';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderEditForm } from './renderForm';
import { useSubmit } from 'react-router-dom';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';
import dayjs from 'dayjs';

export const BranchSingle = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  
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

  const schema = vine.object({
    active: vine.boolean(),
    fromType: vine.enum(['ordinary_person', 'juristic_person']),
    nameTh: vine.string(),
    nameEn: vine.string(),
    status: vine.string(),
    taxId: vine.string().maxLength(13),
    logoUrl: vine.string(),
    isMain: vine.boolean(),
    type: vine.enum([
      'human',
      'ordinary_partnership',
      'shop',
      'bop',
      'company_limited',
      'public_company_limited',
      'limited_partnership',
      'foundation',
      'association',
      'joint_venture',
      'others',
    ]),
    openingDate: vine.string(),
    branchCode: vine.string(),
    contactEmail: vine.string().email(),
    websiteUrl: vine.string().optional(),
    contactPhone: vine.string().maxLength(10),
    contactFacebook: vine.string().optional(),
    contactLine: vine.string().optional(),
    contactWhatsapp: vine.string().optional(),
    contactWebsite: vine.string().optional(),
    contactNote: vine.string().optional(),
    registerVat: vine.boolean(),
    descriptionsTh: vine.string().optional(),
    descriptionsEn: vine.string().optional(),
    address: vine.object({
      descriptions: vine.string().optional(),
      active: vine.boolean(),
      status: vine.string(),
      language: vine.string(),
      isMain: vine.boolean(),
      name: vine.string(),
      addresType: vine.string().optional(),
      province: vine.string().optional(),
      district: vine.string().optional(),
      subDistrict: vine.string().optional(),
      address: vine.string().optional(),
      postalCode: vine.string().maxLength(5).optional(),
    })
  });


  vine.messagesProvider = new SimpleMessagesProvider({
    // Applicable for all fields
    required: 'The {{ field }} field is required',
    string: 'The value of {{ field }} field must be a string',
    email: 'The value is not a valid email address',

    // Error message for the username field
    'username.required': 'Please choose a username for your account',
  });
  

  const onFinish = async (values: any) => {
    const validator = vine.compile(schema);
    try {
      const payload = { ...values };
      payload.logoUrl = values.logoUrl[0].response?.url
      payload.openingDate = dayjs(payload.openingDate).toISOString();

      await validator.validate(payload);

      submit(
        { data: JSON.stringify(payload), action: 'edit' },
        { method: 'put' },
      );
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        const fieldErrors = error.messages.map((err: any) => ({
          name: err.field,
          errors: [err.message],
        }));

        form.setFields(fieldErrors);
      }
    }
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
                  {renderEditForm.map((item: any, index: number) => (
                    <DynamicForm
                      key={index}
                      name={item.name}
                      label={item.label}
                      placeholder={item.placeholder}
                      type={item.type}
                      col={item.col}
                      icon={item.icon}
                      value={item.value}
                      ruleMessage={item.message}
                      require={item.require}
                      option={item.options}
                      disabled={item.disabled}
                      checked={item.checked}
                      maxLength={item.maxLength}
                      validator={item.validator}
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

export default BranchSingle;
