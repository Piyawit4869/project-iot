import React from 'react';
import { Card, Row, Col, Button, Progress, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { TitleBar } from '@src/components/shared';

interface CardData {
  title: string;
  value: number;
  unit: string;
}
const cardData: CardData[] = [
  { title: 'จำนวนลูกค้า', value: 538, unit: '' },
  { title: 'จำนวนพนักงาน', value: 70, unit: 'คน' },
  { title: 'จำนวนสาขา', value: 24, unit: '' },
];
const cardStyle: CSSProperties = {
  textAlign: 'center',
  borderRadius: '16px',
  backgroundColor: '#f8f9fa',
  minHeight: '170px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const titleStyle: CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};
const valueStyle: CSSProperties = {
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#000',
};
const addWidgetCardStyle: CSSProperties = {
  textAlign: 'center',
  borderRadius: '16px',
  border: '2px dashed #d9d9d9',
  backgroundColor: '#f8f9fa',
  minHeight: '170px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const documentCardStyle: CSSProperties = {
  borderRadius: '16px',
  backgroundColor: '#f8f9fa',
  padding: '10px',
  marginBottom: '20px',
};
const documentItemStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0',
};
const statusStyle = {
  draft: {
    color: '#999',
    backgroundColor: '#e0e0e0',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  sent: {
    color: '#fff',
    backgroundColor: '#4caf50',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  cancelled: {
    color: '#fff',
    backgroundColor: '#f44336',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
};
const progressData = [
  { label: 'วันนี้', value: 60 },
  { label: 'เมื่อวาน', value: 80 },
  { label: '27 มิ.ย.', value: 80 },
];
const DocumentStatusCard: React.FC = () => (
  <Card style={documentCardStyle} bodyStyle={{ padding: '10px' }}>
    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
      งานเอกสาร
    </div>
    <div style={documentItemStyle}>
      <div style={{ fontSize: '12px' }}>#INO000012</div>
      <div style={statusStyle.draft}>แบบร่าง</div>
      <div style={{ fontSize: '12px' }}>7 พ.ย. โดย สุภัค</div>
    </div>
    <div style={documentItemStyle}>
      <div style={{ fontSize: '12px' }}>#QU000012</div>
      <div style={statusStyle.sent}>ส่งแล้ว</div>
      <div style={{ fontSize: '12px' }}>5 พ.ย. โดย สุภัค</div>
    </div>
    <div style={documentItemStyle}>
      <div style={{ fontSize: '12px' }}>#IN000012</div>
      <div style={statusStyle.cancelled}>ยกเลิก</div>
      <div style={{ fontSize: '12px' }}>4 พ.ย. โดย ประพักตร์</div>
    </div>
  </Card>
);
const AttendanceCard: React.FC = () => (
  <Card style={documentCardStyle} bodyStyle={{ padding: '10px' }}>
    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
      การเข้าออกงาน
    </div>
    {progressData.map((item, index) => (
      <div key={index} style={documentItemStyle}>
        <div style={{ fontSize: '12px' }}>{item.label}</div>
        <Progress
          percent={item.value}
          status="active"
          style={{ width: '60%' }}
        />
        <div style={{ fontSize: '12px' }}>{item.value}%</div>
      </div>
    ))}
    <div style={{ textAlign: 'right', fontSize: '12px', color: '#999' }}>
      ดูเพิ่มเติม
    </div>
  </Card>
);
// const TaskCard: React.FC = () => (
//   <Card
//     style={{ ...documentCardStyle, width: '500px' }}
//     bodyStyle={{ padding: '10px' }}
//   >
//     <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
//       การทำงาน
//     </div>
//     <div style={documentItemStyle}>
//       <div style={{ fontSize: '12px', fontWeight: 'bold' }}>To Do</div>
//     </div>
//     <div style={documentItemStyle}>
//       <div style={{ fontSize: '12px', fontWeight: 'bold' }}>In Progress</div>
//     </div>
//     <div style={documentItemStyle}>
//       <div style={{ fontSize: '12px', fontWeight: 'bold' }}>In Review</div>
//       <div
//         style={{
//           backgroundColor: '#fff',
//           padding: '5px',
//           borderRadius: '4px',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: '#f44336',
//             color: '#fff',
//             padding: '2px 8px',
//             borderRadius: '4px',
//             marginRight: '5px',
//           }}
//         >
//           Bug
//         </div>
//         <div style={{ fontSize: '12px' }}>Fixed payment components</div>
//         <div style={{ fontSize: '12px', marginLeft: 'auto' }}>27 มิ.ย.</div>
//       </div>
//     </div>
//   </Card>
// );
const Analytic: React.FC = () => {
  return (
    <Flex vertical>
      <TitleBar title={'ภาพรวม'} subTitle={'สวัสดีตอนเที่ยง!'} />

      <div style={{ height: '25px' }} />
      <Row gutter={16} justify="space-between">
        {cardData.map((data, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card style={cardStyle} bodyStyle={{ padding: '20px' }}>
              <div style={titleStyle}>{data.title}</div>
              <div style={valueStyle}>
                {data.value} {data.unit}
              </div>
            </Card>
          </Col>
        ))}
        <Col xs={24} sm={12} md={6}>
          <DocumentStatusCard />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AttendanceCard />
        </Col>
        {/* <Col xs={24} sm={12} md={6}>
          <TaskCard />
        </Col> */}
        <Col xs={24} sm={12} md={6}>
          <Card style={addWidgetCardStyle} bodyStyle={{ padding: '20px' }}>
            <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
            <div style={{ marginTop: '10px', color: '#999' }}>เพิ่มวิดเจ็ต</div>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
export default Analytic;
