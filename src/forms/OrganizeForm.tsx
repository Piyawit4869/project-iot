import { TagFilled } from "@ant-design/icons";
import {
  CheckboxFormField,
  LabelForm,
  RadioFormField,
  SelectFormField,
  TextboxFormField,
} from "@src/components/shared";
import { Button, Col, Form, Row } from "antd";

interface OrganizeFormProps {
  initialValues?: OrganizeType;
}

export const OrganizeForm: React.FC<OrganizeFormProps> = (
  props: OrganizeFormProps
) => {
  const { initialValues } = props;

  return (
    <Form layout="vertical" initialValues={initialValues}>
      <Row gutter={20}>
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
                name="name"
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
                name={""}
                label={"เลขทะเบียน 13 หลัก"}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <RadioFormField
                name="branchType"
                options={[
                  { value: "headquarters", label: "สำนักงานใหญ่" },
                  { value: "branch", label: "สาขา" },
                ]}
                label={""}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"นิติบุคคล"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={""}
                label={"ชื่อกิจการ"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={16}>
              <TextboxFormField
                placeholder="-"
                name={""}
                label={"คำอธิบายธุรกิจ"}
              />
            </Col>
          </Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <CheckboxFormField
              name={"addingvat"}
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
                name={""}
                label={"เบอร์โทรศัพท์"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"อีเมลล์"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"เว็บไซต์"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={24}>
              <LabelForm
                style={{ marginBottom: -30 }}
                icon={<TagFilled />}
                label={"ข้อมูลตามทะเบียน"}
                children={undefined}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={16}>
              <TextboxFormField placeholder="-" name={""} label={"ที่อยู่"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"ประเทศ"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"แขวง/ตำบล"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"เขต/อำเภอ"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"จังหวัด"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={""}
                label={"รหัสไปรษณีย์"}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={24}></Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <LabelForm
                icon={<TagFilled />}
                label={"ที่อยู่เอกสาร"}
                children={undefined}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <RadioFormField
                name="branchType"
                options={[
                  { value: "headquarters", label: "สำนักงานใหญ่" },
                  { value: "branch", label: "สาขา" },
                ]}
                label={""}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={16}>
              <TextboxFormField placeholder="-" name={""} label={"ที่อยู่"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"ประเทศ"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"แขวง/ตำบล"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"เขต/อำเภอ"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField placeholder="-" name={""} label={"จังหวัด"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={24} xl={8}>
              <TextboxFormField
                placeholder="-"
                name={""}
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
          Details
        </Col>
      </Row>
      <Row>
        <Button htmlType="reset">Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};
