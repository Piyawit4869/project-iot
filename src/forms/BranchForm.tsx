import { Col, Row } from "antd";
import {
  RadioFormField,
  SelectFormField,
  TextboxFormField,
} from "@src/components/shared";
import { TextAreaFormField } from "@src/components/shared/TextAreaFormField";
interface BranchFormProps {
  initialValues?: OrganizeType;
}

export const BranchForm: React.FC<BranchFormProps> = (
  props: BranchFormProps
) => {
  const {} = props;

  return (
    <Row gutter={20}>
      <Col span={12} style={{ textAlign: "left", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>เพิ่มข้อมูลสาขา</div>
      </Col>
      <Col span={12} style={{ textAlign: "right", marginBottom: 16 }}></Col>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 24, order: 2 }}
        lg={{ span: 12, order: 2 }}
        xl={{ span: 12, order: 1 }}
      >
        <Row gutter={20}>
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <RadioFormField
              name="branchType"
              options={[
                { value: "headquarters", label: "สำนักงานใหญ่" },
                { value: "branch", label: "สาขา" },
              ]}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"bussinessModel"}
              label={"โมเดล"}
            />
          </Col>
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
        </Row>

        <Row gutter={20}>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"telephone"}
              label={"เบอร์โทรศัพท์"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"email"}
              label={"อีเมลล์"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={24} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"websiteUrl"}
              label={"เว็บไซต์"}
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
      >
        Image
      </Col>
    </Row>
  );
};
