import React, { useState } from 'react';
import { HomeOutlined, TagFilled } from "@ant-design/icons";
import { Breadcrumb, Row, Col, Form, Input, Select, Radio } from "antd";
import Title from "antd/es/typography/Title";

const { Option } = Select;

const styles = {
  uploadContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
  },
 
  uploadInfo: {
    flex: '1',
  },
  
  fileInput: {
    display: 'none',
  },
};

export const OrganizeCreate: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('image-placeholder.png');

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>ตั้งค่าองค์กร</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>เพิ่มข้อมูลองค์กร</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3} style={{ marginBottom: 10, marginTop: -2 }}>
        เพิ่มข้อมูลองค์กร
      </Title>

      <div className="container mt-5">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item label="รูปแบบธุรกิจ" name="businessType">
                <Select placeholder="-">
                  <Option value="">ney</Option>
                  <Option value="">ney 2</Option>
                </Select>
              </Form.Item>
              <Radio.Group>
                <Radio value="headOffice">สำนักงานใหญ่</Radio>
                <Radio value="branch">สาขา</Radio>
              </Radio.Group>
              <Form.Item style={{ marginTop: 10 }} label="นิติบุคคล" name="address">
                <Input />
              </Form.Item>
              <Form.Item style={{ marginTop: -15 }} label="คำอธิบายธุรกิจ" name="address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="เลขทะเบียน 13 หลัก" name="address">
                <Input />
              </Form.Item>
              <Form.Item style={{ marginTop: 55 }} label="ชื่อกิจการ" name="address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={8}>
              <div>
                <TagFilled style={{ marginBottom: -60, marginRight: 8 }} />
                <span style={{ marginBottom: 20 }}>โลโก้บริษัท</span>
              </div>
              <div style={styles.uploadContainer}>
                <div style={{flex: '0 0 100px', marginRight: '20px'}}>
                  <img src={imageSrc} alt="Image Placeholder" style={{  width: '100px',height: '100px', objectFit: 'cover', borderRadius: '10px'}} />
                </div>
                <div style={styles.uploadInfo}>
                  <div style={{textAlign: 'left', marginBottom: '10px'}}>
                    <ul>
                      <li>รูปขนาดอัตราส่วน 1:1</li>
                      <li>ขนาดไฟล์ไม่เกิน 3 MB</li>
                      <li>รองรับไฟล์ภาพ .png .jpg .jpeg</li>
                    </ul>
                  </div>
                  <button style={{backgroundColor: '#1c2c5c',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '5px'}} 
                    onClick={() => document.getElementById('fileInput')?.click()}>
                    อัพโหลดรูปภาพ
                  </button>
                  <input type="file" id="fileInput" accept=".png, .jpg, .jpeg" style={styles.fileInput} onChange={previewImage} />
                </div>
              </div>
            </Col>

          </Row>
          <Radio value="headOffice">จดทะเบียนภาษีมูลค่าเพิ่ม</Radio>
             <div>
                <TagFilled style={{ marginTop: 20, marginRight: 8 }} />
                <span style={{ marginBottom: 20}}>ข้อมูลช่องทางการติดต่อ</span>
              </div>

           <Row gutter={16}>
           <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="เบอร์โทรศัพท์" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
                <Form.Item style={{ marginTop: 10 }} label="อีเมลล์" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
           <Form.Item style={{ marginTop: 10 }} label="เว็บไซต์" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={8}> 
           
           </Col>
            </Row>
            <div>
                <TagFilled style={{ marginTop: 20, marginRight: 8 }} />
                <span style={{ marginTop: 5}}>ข้อมูลตามทะเบียน</span>
              </div>
              <Row gutter={16}>
                <Col span={8}>
                <Form.Item style={{ marginTop: 10 }} label="ที่อยู่" name="address">
                        <Input />
                </Form.Item>
                </Col>
                <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="ประเทศ" name="address">
                        <Input />
                </Form.Item>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
              </Row>

              <Row gutter={16}>
           <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="แขวง/ตำบล" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
                <Form.Item style={{ marginTop: 10 }} label="เขต/อำเภอ" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
           <Form.Item style={{ marginTop: 10 }} label="จังหวัด" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={8}> 
           
           </Col>
            </Row>

            <Row gutter={16}>
           <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="รหัสไปรษณีย์" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
                
           </Col>
           <Col span={4}> 
          
           </Col>
           <Col span={8}> 
           
           </Col>
            </Row>
            <Row gutter={16}>
            <Col span={4}> 
            <div>
                <TagFilled style={{ marginTop: 20, marginRight: 8 }} />
                <span style={{ marginTop: 5}}>ที่อยู่เอกสาร</span>
              </div>
            </Col>
            <Col span={8}> 
            <Radio.Group>
                <Radio style={{ marginTop: 20}} value="oldAdd">ใช้ข้อมูลที่อยู่ตามทะเบียน</Radio>
                <Radio  style={{marginTop: 20}}value="newInfo">ข้อมูลใหม่</Radio>
           </Radio.Group>
              </Col>
              <Col span={4}> 
              
              </Col>
              <Col span={8}> 
              </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                <Form.Item style={{ marginTop: 10 }} label="ที่อยู่" name="address">
                        <Input />
                </Form.Item>
                </Col>
                <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="ประเทศ" name="address">
                        <Input />
                </Form.Item>
                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
                <Col span={4}>

                </Col>
              </Row>

              <Row gutter={16}>
           <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="แขวง/ตำบล" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
                <Form.Item style={{ marginTop: 10 }} label="เขต/อำเภอ" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
           <Form.Item style={{ marginTop: 10 }} label="จังหวัด" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={8}> 
           
           </Col>
            </Row>

            <Row gutter={16}>
           <Col span={4}>
                <Form.Item style={{ marginTop: 10 }} label="รหัสไปรษณีย์" name="address">
                        <Input />
                </Form.Item>
           </Col>
           <Col span={4}> 
                
           </Col>
           <Col span={4}> 
          
           </Col>
           <Col span={8}> 
           
           </Col>
            </Row>
        </Form>

      </div>
    </div>
  );
};

export default OrganizeCreate;
