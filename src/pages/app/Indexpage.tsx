import {
  FieldTimeOutlined,
  ProjectOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const styles: { [key: string]: CSSProperties } = {
  attendanceIndex: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '15px 30px',
    margin: '5px',
    border: '1px solid #000000',
    borderRadius: '4px',
    cursor: 'pointer',
    minWidth: '150px',
    textDecoration: 'none',
  },
  icon: {
    marginRight: '10px',
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  summaryItem: {
    textAlign: 'center',
    flex: 1,
  },
  summaryTitle: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  summarySubtitle: {
    display: 'block',
    fontSize: '14px',
    color: 'gray',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
};

export const AppLandingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        // height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>StayOrganize</h1>
      <div style={styles.attendanceIndex}>
        <div style={styles.buttonGroup}>
          <Link to="/attendance" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>
              <FieldTimeOutlined style={styles.icon} />
              Attendance
            </button>
          </Link>
          <Link to="/notation" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>
              <ReconciliationOutlined style={styles.icon} />
              Notation
            </button>
          </Link>
          <Link to="/project" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>
              <ProjectOutlined style={styles.icon} />
              Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
