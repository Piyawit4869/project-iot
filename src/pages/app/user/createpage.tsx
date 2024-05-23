import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Input, Button, Radio, DatePicker, Row, Col, Upload } from "antd";


export const UsersCreate = () => {
  return (
    <div>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/users">ตั้งค่าผู้ใช้</Breadcrumb.Item>
        <Breadcrumb.Item>ลงทะเบียนผู้ใช้</Breadcrumb.Item>
      </Breadcrumb>
      <h1>ลงทะเบียนผู้ใช้</h1>
      <Form layout="vertical">
      <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="คำนำหน้า">
              <Input style={{width : 250}}/>
            </Form.Item>
          </Col>  
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ชื่อจริง">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="นามสกุล">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="อีเมล">
              <Input type='email'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ชื่อผู้ใช้">
              <Input />
            </Form.Item>
          </Col>
          </Row>
        
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label="รหัสผ่าน">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
           <Form.Item label="รหัสผ่าน">
              <Input.Password />
            </Form.Item>
          </Col>
          </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="เบอร์โทรศัพท์">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="วันเดือนปีเกิด">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="เพศ">
              <Radio.Group>
                <Radio value="male">ชาย</Radio>
                <Radio value="female">หญิง</Radio>
                <Radio value="other">อื่นๆ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="รูปโปรไฟล์">
              <Upload>
                <Button>อัปโหลดรูป</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        
        {/* <Col span={12}>
            <Form.Item label="รูปโปรไฟล์">
              <Upload
                listType="picture"
                maxCount={1}
                onChange={handleUpload}
              >
                <Button>อัปโหลดรูป</Button>
              </Upload>
              {imageUrl && <img src={imageUrl} alt="profile" style={{ width: '100%', marginTop: '20px' }} />}
            </Form.Item>
          </Col>
        </Row> */}

        {/* <h3>ข้อมูลที่อยู่</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ที่อยู่">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="เมือง">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="จังหวัด">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="รหัสไปรษณีย์">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ประเทศ">
              <Select>
                <Option value="thailand">ประเทศไทย</Option>
                <Option value="other">อื่นๆ</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <h3>ข้อมูลการติดต่อเพิ่มเติม</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="เบอร์โทรศัพท์สำรอง">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ที่อยู่อีเมลสำรอง">
              <Input />
            </Form.Item>
          </Col>
        </Row> */}

        {/* <h3>ข้อตกลงและเงื่อนไข</h3>
        <Form.Item>
          <Checkbox>ยอมรับข้อตกลงและเงื่อนไข</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>ยอมรับนโยบายความเป็นส่วนตัว</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            ลงทะเบียน
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// import { HomeOutlined } from "@ant-design/icons";
// import { Breadcrumb, Form, Input, Button, Select, Radio, DatePicker, Row, Col, Upload, Checkbox } from "antd";

// const { Option } = Select;

// export const UserCreate = () => {
//   return (
//     <div>
//       <Breadcrumb style={{ marginBottom: "20px" }}>
//         <Breadcrumb.Item href="/">
//           <HomeOutlined />
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="/users">ตั้งค่าผู้ใช้</Breadcrumb.Item>
//         <Breadcrumb.Item>ลงทะเบียนผู้ใช้</Breadcrumb.Item>
//       </Breadcrumb>
//       <h1>ลงทะเบียนผู้ใช้</h1>
//       <Form layout="vertical">
//         <Row gutter={16}>
//           <Col span={6}>
//             <Form.Item label="คำนำหน้า">
//               <Input style={{width : 360}}/>
//             </Form.Item>
//           </Col>
//           <Col span={9}>
//             <Form.Item label="ชื่อจริง">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={9}>
//             <Form.Item label="นามสกุล">
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//         <Col span={12}>
//             <Form.Item label="อีเมล">
//               <Input type='email'/>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="ชื่อผู้ใช้">
//               <Input />
//             </Form.Item>
//           </Col>
          
//         </Row>
        
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="รหัสผ่าน">
//               <Input.Password />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="ยืนยันรหัสผ่าน">
//               <Input.Password />
//             </Form.Item>
//           </Col>
//         </Row>

// {/* <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               label="รหัสผ่าน"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: 'กรุณากรอกรหัสผ่าน',
//                 },
//                 {
//                   min: 8,
//                   message: 'รหัสผ่านควรต่องมีความยาวอย่างน้อย 8 ตัวอักษร',
//                 },
//                 {
//                   max: 20,
//                   message: 'รหัสผ่านควรต้องมีความยาวไม่เกิน 20 ตัวอักษร',
//                 },
//               ]}
//             >
//               <Input.Password minLength={8} maxLength={20} />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               label="ยืนยันรหัสผ่าน"
//               name="confirm"
//               dependencies={['password']}
//               rules={[
//                 {
//                   required: true,
//                   message: 'กรุณายืนยันรหัสผ่าน',
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('รหัสผ่านที่ยืนยันไม่ตรงกัน'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password minLength={8} maxLength={20} />
//             </Form.Item>
//           </Col>
//         </Row> */}

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="เบอร์โทรศัพท์">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="วันเดือนปีเกิด">
//               <DatePicker style={{ width: '100%' }} />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="เพศ">
//               <Radio.Group>
//                 <Radio value="male">ชาย</Radio>
//                 <Radio value="female">หญิง</Radio>
//                 <Radio value="other">อื่นๆ</Radio>
//               </Radio.Group>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="รูปโปรไฟล์">
//               <Upload>
//                 <Button>อัปโหลดรูป</Button>
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>

//         {/* <h3>ข้อมูลที่อยู่</h3>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="ที่อยู่">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="เมือง">
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="จังหวัด">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="รหัสไปรษณีย์">
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="ประเทศ">
//               <Select>
//                 <Option value="thailand">ประเทศไทย</Option>
//                 <Option value="other">อื่นๆ</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <h3>ข้อมูลการติดต่อเพิ่มเติม</h3>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="เบอร์โทรศัพท์สำรอง">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item label="ที่อยู่อีเมลสำรอง">
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row> */}

//         <h3>ข้อตกลงและเงื่อนไข</h3>
//         <Form.Item>
//           <Checkbox>ยอมรับข้อตกลงและเงื่อนไข</Checkbox>
//         </Form.Item>
//         <Form.Item>
//           <Checkbox>ยอมรับนโยบายความเป็นส่วนตัว</Checkbox>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             ลงทะเบียน
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

