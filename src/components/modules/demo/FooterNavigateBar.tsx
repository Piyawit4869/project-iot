import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const FooterNavigateBar: React.FC<object> = () => {
  return (
    <Row>
      <Col span={6} style={styles.button}>
        <Link to="">Attendance</Link>
      </Col>
      <Col span={6} style={styles.button}>
        <Link to="appointment">Appointment</Link>
      </Col>
      <Col span={6} style={styles.button}>
        <Link to="approval">Approval</Link>
      </Col>
      <Col span={6} style={styles.button}>
        <Link to="analytic">Analytic</Link>
      </Col>
    </Row>
  );
};

const styles: Record<string, React.CSSProperties> = {
  button: {
    width: '200px',
    height: '60px',
    textAlign: 'center',
  },
};
