import { CSSProperties } from 'react';

const AttendanceIndex = () => {
  const attendanceData = [
    { date: '18 มิ.ย., 2020', checkIn: '05:51 am', checkOut: '12:01 pm' },
    { date: '19 มิ.ย., 2020', checkIn: '01:08 pm', checkOut: '05:49 pm' },
    { date: '20 มิ.ย., 2020', checkIn: '05:36 pm', checkOut: '11:23 pm' },
    { date: '21 มิ.ย., 2020', checkIn: '11:49 pm', checkOut: '07:40 am' },
  ];

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
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '15px 30px',
      margin: '5px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      minWidth: '150px', // Adjust the minimum width to make buttons longer
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

  return (
    <div style={styles.attendanceIndex}>
      <div style={styles.buttonGroup}>
        <button style={styles.button}>In</button>
        <button style={styles.button}>Break</button>
        <button style={styles.button}>Out</button>
      </div>
      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <span style={styles.summaryTitle}>08:00</span>
          <span style={styles.summarySubtitle}>Average Working Hour</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryTitle}>10:30 AM</span>
          <span style={styles.summarySubtitle}>Average In Time</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryTitle}>07:30 PM</span>
          <span style={styles.summarySubtitle}>Average Out Time</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryTitle}>01:00</span>
          <span style={styles.summarySubtitle}>Average Break Time</span>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Check In</th>
            <th style={styles.th}>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td style={styles.td}>{record.date}</td>
              <td style={styles.td}>{record.checkIn}</td>
              <td style={styles.td}>{record.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceIndex;
