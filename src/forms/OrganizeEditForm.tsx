import { DeleteOutlined, TagFilled } from "@ant-design/icons";
import {
  CheckboxFormField,
  LabelForm,
  SelectFormField,
  TextboxFormField,
} from "@src/components/shared";
import { Button, Col, Form, Row } from "antd";
import { useSubmit } from "react-router-dom";
import { DatePickerFormField } from "@src/components/shared/DatePicker";
import dayjs from "dayjs";
import React from "react";

interface OrganizeEditFormProps {
  initialValues?: any;
}

export const OrganizeEditForm: React.FC<OrganizeEditFormProps> = (
  props: OrganizeEditFormProps
) => {
  const { initialValues } = props;
  
  const [form] = Form.useForm();
  const submit = useSubmit();

  const formatDate = (isoDateString: any) => {
    return dayjs(isoDateString);
  };

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    payload.businessRegister = formatDate(payload.businessRegister);
    payload.active = true;
    payload.addressData = [];
    payload.branchesData = [];
    payload.userData = [];
    payload.descriptions = "-";
    payload.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";

    submit(
      { data: JSON.stringify(payload), action: "edit" },
      { method: "put" }
    );
  };

  const onDelete = () => {
    submit({ action: "delete" }, { method: "delete" });
  };

  React.useEffect(() => {
    let businessRegister = null;
    if (initialValues.businessRegister) {
      const combinedDateTime = initialValues.businessRegister;
      businessRegister = dayjs(combinedDateTime);
    }
    form.setFieldsValue({
      ...initialValues,
      businessRegister: businessRegister,
    });
  }, [form, initialValues]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={12} style={{ textAlign: "left", marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: "bold" }}>
            แก้ไขข้อมูลองค์กร
          </div>
        </Col>
        <Col span={12} style={{ textAlign: "right", marginBottom: 16 }}>
          <Row justify={"end"} gutter={15}>
            <Col>
              <Button onClick={onDelete} icon={<DeleteOutlined />} />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 1 }}
        >
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <SelectFormField
                placeholder="-"
                name="businessType"
                label="รูปแบบธุรกิจ"
                options={[
                  { value: "Single", label: "เดี่ยว" },
                  { value: "Duo", label: "คู่" },
                  { value: "Team", label: "ทีม" },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"taxId"}
                label={"เลขทะเบียน 13 หลัก"}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"businessName"}
                label={"ชื่อกิจการ"}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={24} xl={16}>
              <TextboxFormField
                placeholder="-"
                name={"businessDescription"}
                label={"คำอธิบายธุรกิจ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <DatePickerFormField
                placeholder="วันที่จดทะเบียน"
                name={"businessRegister"}
                label={"วันที่จดทะเบียน"}
              />
            </Col>
          </Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <CheckboxFormField
              name={"registerVat"}
              label={"จดทะเบียนภาษีมูลค่าเพิ่ม"}
            />
          </Col>
          <Col
            style={{ marginBottom: -50 }}
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <LabelForm
              icon={<TagFilled />}
              label={"ข้อมูลช่องทางการติดต่อ"}
              children={undefined}
            />
          </Col>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"businessPhone"}
                label={"เบอร์โทรศัพท์สำนักงาน"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"businessEmail"}
                label={"อีเมลล์สำนักงาน"}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"websiteUrl"}
                label={"เว็บไซต์สำนักงาน"}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"contactPhone"}
                label={"เบอร์โทรศัพท์ติดต่อ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"contactEmail"}
                label={"อีเมลล์ติดต่อ"}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <LabelForm
                style={{ marginBottom: -30 }}
                icon={<TagFilled />}
                label={"ข้อมูลตามทะเบียน"}
                children={undefined}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={16}>
              <TextboxFormField
                placeholder="-"
                name={"address"}
                label={"ที่อยู่"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"country"}
                label={"ประเทศ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"subDistrict"}
                label={"แขวง/ตำบล"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"district"}
                label={"เขต/อำเภอ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"province"}
                label={"จังหวัด"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={24}>
              <TextboxFormField
                placeholder="-"
                name={"postalCode"}
                label={"รหัสไปรษณีย์"}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={24} xl={12}>
              <LabelForm
                icon={<TagFilled />}
                label={"ที่อยู่เอกสาร"}
                children={undefined}
              />
            </Col>
            {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <RadioFormField
                name="branchType"
                options={[
                  { value: "same", label: "ใช้ข้อมูลที่อยู่ตามทะเบียน" },
                  { value: "new", label: "ข้อมูลใหม่" },
                ]}
                label={""}
              />
            </Col> */}
            <Col
              style={{ marginTop: -30 }}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={16}
            >
              <TextboxFormField
                placeholder="-"
                name={"address"}
                label={"ที่อยู่"}
              />
            </Col>
            <Col
              style={{ marginTop: -30 }}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={8}
            >
              <TextboxFormField
                placeholder="-"
                name={"country"}
                label={"ประเทศ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"subDistrict"}
                label={"แขวง/ตำบล"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"district"}
                label={"เขต/อำเภอ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={"province"}
                label={"จังหวัด"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={24}>
              <TextboxFormField
                placeholder="-"
                name={"postalCode"}
                label={"รหัสไปรษณีย์"}
              />
            </Col>
          </Row>
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 2 }}
        ></Col>
      </Row>
    </Form>
  );
};
