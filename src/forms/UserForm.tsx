import { Col, Row } from "antd";
import {
  LabelForm,
  RadioFormField,
  TextboxFormField,
} from "@src/components/shared";

export const UserForm: React.FC = () => {
  return (
    <Row gutter={20}>
      <Col span={24} style={{ textAlign: "left", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>
          เพิ่มข้อมูลผู้ใช้
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"taxId"}
              label={"คำนำหน้า"}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"businessName"}
              label={"ชื่อจริง"}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"businessName"}
              label={"นามสกุล"}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField placeholder="-" name={"email"} label={"อีเมล"} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"businessName"}
              label={"ชื่อผู้ใช้"}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"email"}
              label={"รหัสผ่าน"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"businessName"}
              label={"ยืนยันรหัสผ่าน"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"email"}
              label={"เบอร์โทรศัพท์"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <TextboxFormField
              placeholder="-"
              name={"businessName"}
              label={"วัน/เดือน/ปี เกิด"}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={24} xl={4}>
            <LabelForm label={"เพศ"} children={undefined} />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <RadioFormField
              name="branchType"
              options={[
                { value: "male", label: "ชาย" },
                { value: "female", label: "หญิง" },
                { value: "other", label: "อื่นๆ" },
              ]}
              label={""}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <TextboxFormField
              placeholder="-"
              name={"email"}
              label={"รูปโปรไฟล์"}
            />
          </Col>
        </Row>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        style={{ textAlign: "center" }}
      >
        Image
      </Col>
    </Row>
  );
};
