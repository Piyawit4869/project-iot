import { Radio } from 'antd';

interface RadioGetOrgProps {
  form: any;
}
export const RadioGetOrgValue = (props: RadioGetOrgProps) => {
  const { form } = props;

  const values = form.getFieldValue();
  console.log(values);

  const setFormFields = (value: string) => {
    if (value === 'true') {
      form.setFieldsValue({
        branch: {
          fromType: values?.fromType ? values.fromType : 'OrdinaryPerson',
          type: values?.type ? values.type : null,
          nameTh: values?.nameTh ? values.nameTh : '',
          nameEn: values?.nameEn ? values.nameEn : '',
          taxId: values?.taxId ? values.taxId : '',
          openingDate: values?.openingDate ? values.openingDate : '',
          websiteUrl: values?.websiteUrl ? values.websiteUrl : '',
          contactPhone: values?.contactPhone ? values.contactPhone : '',
          contactEmail: values?.contactEmail ? values.contactEmail : '',
          registerVat: values?.registerVat ? values.registerVat : true,
          address: {
            language: values?.setting?.defaultLanguage
              ? values.setting.defaultLanguage
              : '',
            isMain: values.address.isMain,
            name: values?.nameEn ? values?.nameEn : '',
            city: values?.address?.city ? values.address.city : '',
            province: values?.address?.province ? values.address.province : '',
            postalCode: values?.address?.postalCode
              ? values.address.postalCode
              : '',
            roomNo: values?.address?.roomNo ? values.address.roomNo : '',
            floorNo: values?.address?.floorNo ? values.address.floorNo : '',
            village: values?.address?.village ? values.address.village : '',
            villageNo: values?.address?.villageNo
              ? values.address.villageNo
              : '',
            houseNo: values?.address?.houseNo ? values.address.houseNo : '',
            alley: values?.address?.alley ? values.address.alley : '',
            road: values?.address?.road ? values.address.road : '',
            building: values?.address?.building ? values.address.building : '',
            nation: values?.address?.nation ? values.address.nation : '',
            district: values?.address?.district ? values.address.district : '',
            subDistrict: values?.address?.subDistrict
              ? values.address.subDistrict
              : '',
            note: values?.address?.note ? values.address.note : '',
          },
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
          address: {
            language: values?.setting?.defaultLanguage
              ? values.setting.defaultLanguage
              : '',
            isMain: !values.address.isMain,
            name: values?.branch?.nameEn ? values?.branch?.nameEn : '',
            city: '',
            province: '',
            postalCode: '',
            roomNo: '',
            floorNo: '',
            village: '',
            villageNo: '',
            houseNo: '',
            alley: '',
            road: '',
            building: '',
            nation: '',
            district: '',
            subDistrict: '',
            note: '',
          },
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
