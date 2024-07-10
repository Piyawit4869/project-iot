import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const styles = {
      container: {
          padding: '20px',
          maxWidth: '600px',
          margin: 'auto',
      },
      section: {
          marginBottom: '20px',
          padding: '20px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fff',
      },
      header: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
      },
      profilePic: {
          width: '80px',
          height: '80px',
          borderRadius: '50%',
      },
      info: {
          flexGrow: 1,
          marginLeft: '20px',
      },
      editButton: {
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
      },
      editButtonHover: {
          backgroundColor: '#0056b3',
      },
      content: {
          marginTop: '10px',
      },
      item: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
      },
  };
  return (
      <div style={styles.container}>
          <Row gutter={20}>
              <Col span={24} style={{ textAlign: 'left' }}>
                  <Button type="primary" onClick={() => navigate(-1)}>
                      <LeftOutlined /> Back
                  </Button>
              </Col>
          </Row>
          <div style={styles.section}>
              <div style={styles.header}>
                  <img src="profile-pic-url" alt="Profile" style={styles.profilePic} />
                  <div style={styles.info}>
                      <h2>Jack Adams</h2>
                      <p>Product Designer</p>
                      <p>Los Angeles, California, USA</p>
                  </div>
                  <button style={styles.editButton}>Edit</button>
              </div>
              <h3>Personal Information</h3>
              <div style={styles.content}>
                  <div style={styles.item}>
                      <span>First Name:</span> <span>Jack</span>
                  </div>
                  <div style={styles.item}>
                      <span>Last Name:</span> <span>Adams</span>
                  </div>
                  <div style={styles.item}>
                      <span>Email address:</span> <span>jackadams@gmail.com</span>
                  </div>
                  <div style={styles.item}>
                      <span>Phone:</span> <span>(213) 555-1234</span>
                  </div>
                  <div style={styles.item}>
                      <span>Bio:</span> <span>Product Designer</span>
                  </div>
              </div>
              <button style={styles.editButton}>Edit</button>
          </div>
          <div style={styles.section}>
              <h3>Address</h3>
              <div style={styles.content}>
                  <div style={styles.item}>
                      <span>Country:</span> <span>United States of America</span>
                  </div>
                  <div style={styles.item}>
                      <span>City/State:</span> <span>California, USA</span>
                  </div>
                  <div style={styles.item}>
                      <span>Postal Code:</span> <span>ERT 62574</span>
                  </div>
                  <div style={styles.item}>
                      <span>TAX ID:</span> <span>AS564178969</span>
                  </div>
              </div>
              <button style={styles.editButton}>Edit</button>
          </div>
      </div>
  );
};

