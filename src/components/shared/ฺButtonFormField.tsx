import { Radio } from 'antd';

interface RadioGetOrgProps {
  form: any;
}
export const RadioGetOrgValue = (props: RadioGetOrgProps) => {
  const { form } = props;

  const values = form.getFieldValue();

  const setFormFields = (value: string) => {
    if (value === 'true') {
      form.setFieldsValue({
        branch: {
          fromType: values?.fromType ? values.fromType : 'ordinary_person',
          type: values?.type ? values.type : null,
          nameTh: values?.nameTh ? values.nameTh : '',
          nameEn: values?.nameEn ? values.nameEn : '',
          taxId: values?.taxId ? values.taxId : '',
          openingDate: values?.openingDate ? values.openingDate : '',
          websiteUrl: values?.websiteUrl ? values.websiteUrl : '',
          contactPhone: values?.contactPhone ? values.contactPhone : '',
          contactEmail: values?.contactEmail ? values.contactEmail : '',
          registerVat: values?.registerVat ? values.registerVat : true,
        },
      });
    } else {
      form.setFieldsValue({
        branch: {
          fromType: null,
          type: null,
          nameTh: '',
          nameEn: '',
          taxId: '',
          openingDate: '',
          websiteUrl: '',
          contactPhone: '',
          contactEmail: '',
          registerVat: null,
        },
      });
    }
  };

  return (
    <Radio.Group defaultValue={'false'} style={{ marginBottom: '20px' }}>
      <Radio
        key={'true'}
        value={'true'}
        onChange={(e) => setFormFields(e.target.value)}
      >
        {'ใช้ข้อมูลตามองค์กร'}
      </Radio>
      <Radio
        key={'false'}
        value={'false'}
        onChange={(e) => setFormFields(e.target.value)}
      >
        {'สร้างข้อมูลใหม่'}
      </Radio>
    </Radio.Group>
  );
};
