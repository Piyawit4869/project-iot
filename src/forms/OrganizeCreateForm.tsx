import { TagFilled } from "@ant-design/icons";
import {
  CheckboxFormField,
  LabelForm,
  RadioFormField,
  SelectFormField,
  TextboxFormField,
} from "@src/components/shared";
import { Button, Col, Row } from "antd";

import { DatePickerFormField } from "@src/components/shared/DatePicker";
import { TextAreaFormField } from "@src/components/shared/TextAreaFormField";

interface OrganizeCreateFormProps {
  initialValues?: OrganizeType;
}

export const OrganizeCreateForm: React.FC<OrganizeCreateFormProps> = () => {
  return (
    <Row gutter={20}>
      <Col span={12} style={{ textAlign: "left", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>
          เพิ่มข้อมูลองค์กร
        </div>
      </Col>
      <Col span={12} style={{ textAlign: "right", marginBottom: 16 }}>
        <Button style={{ margin: "10px" }} htmlType="reset">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
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
            <TextAreaFormField
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
          <Col xs={24} sm={24} md={12} lg={24} xl={8}>
            <SelectFormField
              placeholder="-"
              name="addressType"
              label="ประเภทที่อยู่"
              options={[
                { value: "Single", label: "Home" },
                { value: "Duo", label: "Apartment" },
                { value: "Team", label: "Detached House" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24}>
            <TextAreaFormField
              placeholder="-"
              name={"descriptions"}
              label={"คำอธิบายเกี่ยวกับที่อยู่"}
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
          <Col xs={24} sm={24} md={12} lg={24} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"postalCode"}
              label={"รหัสไปรษณีย์"}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={24} xl={12}>
            <LabelForm
              icon={<TagFilled />}
              label={"ที่อยู่ตามเอกสาร"}
              children={undefined}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <RadioFormField
              name="branchType"
              options={[
                { value: "same", label: "ใช้ข้อมูลที่อยู่ตามทะเบียน" },
                { value: "new", label: "ข้อมูลใหม่" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <TextboxFormField
              placeholder="-"
              name={"address"}
              label={"ที่อยู่"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={24} xl={8}>
            <SelectFormField
              placeholder="-"
              name="addressType"
              label="ประเภทที่อยู่"
              options={[
                { value: "Single", label: "Home" },
                { value: "Duo", label: "Apartment" },
                { value: "Team", label: "Detached House" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24}>
            <TextAreaFormField
              placeholder="-"
              name={"descriptions"}
              label={"คำอธิบายเกี่ยวกับที่อยู่"}
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
          <Col xs={24} sm={24} md={12} lg={24} xl={8}>
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
  );
};
