import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Button, Row, Col, Typography, Image, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const profileImageSrc = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const bannerImageSrc = 'https://via.placeholder.com/800x200'; 

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '800px',
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    marginTop: '40px',  // Added margin top to move the form down
  },
  bannerImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
    position: 'relative',
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-50px',  // Adjusted to position profile image on top of the banner
    marginBottom: '20px',
  },
  profileImage: {
    borderRadius: '50%',
    border: '4px solid white',
  },
  formItem: {
    marginBottom: '15px',
  },
  title: {
    marginBottom: '20px',
  },
  buttons: {
    marginTop: '20px',
  },
  userInfo: {
    padding: '20px',
  }
};

export const ProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    // console.log("Form Submitted", payload);
    localStorage.setItem("me", JSON.stringify(payload));
    setIsEditing(false);
  };

  const me = JSON.parse(localStorage.getItem("me") as any);
  const { Title, Text } = Typography;

  return (
    <>
      <Col span={24} style={{ textAlign: 'left', marginBottom: '20px' }}>
        <Button type="primary" onClick={() => navigate(-1)}>
          <LeftOutlined /> Back
        </Button>
      </Col>
      <div style={styles.container} ref={containerRef}>
        <div style={styles.content}>
          <Image src={bannerImageSrc}  />
          <div style={styles.profileImageContainer}>
            <Image width={100} src={profileImageSrc} style={styles.profileImage} />
          </div>
          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={me}>
            <div style={styles.userInfo}>
              <Title level={2} style={styles.title}>Profile</Title>
                <div>
                  <Title level={4}>Personal Information</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={12}><Text strong>คำนำหน้า:</Text> <Text>{me.profix}</Text></Col>
                    <Col span={12}><Text strong>ชื่อ:</Text> <Text>{me.firstName}</Text></Col>
                    <Col span={12}><Text strong>นามสกุล:</Text> <Text>{me.lastName}</Text></Col>
                    <Col span={12}><Text strong>อีเมลล์:</Text> <Text>{me.email}</Text></Col>
                    <Col span={12}><Text strong>เบอร์โทรศัพท์ติดต่อ:</Text> <Text>{me.phone}</Text></Col>
                    <Col span={12}><Text strong>วัน/เดือน/ปีเกิด:</Text> <Text>{me.birthDate}</Text></Col>
                  </Row>
                  <Title level={4} style={{ marginTop: '20px' }}>Address</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={12}><Text strong>ที่อยู่:</Text> <Text>{me.country}</Text></Col>
                    <Col span={12}><Text strong>แขวง/ตำบล:</Text> <Text>{me.cityState}</Text></Col>
                    <Col span={12}><Text strong>เขต/อำเภอ:</Text> <Text>{me.postalCode}</Text></Col>
                    <Col span={12}><Text strong>จังหวัด:</Text> <Text>{me.taxId}</Text></Col>
                    <Col span={12}><Text strong>รหัสไปรษณีย์:</Text> <Text>{me.taxId}</Text></Col>
                    <Col span={12}><Text strong>ประเทศ:</Text> <Text>{me.taxId}</Text></Col>
                  </Row>
                </div>
       
            </div>
            <div style={styles.buttons}>
                <>
                  <Button type="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                </>
           
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
