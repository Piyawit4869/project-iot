import { TableComponent, TitleBar } from '@src/components/shared';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

export const AppointmentIndex = () => {
  const navigate = useNavigate();
  return (
    <>
      <TitleBar
        title={'การนัดหมายในวันนี้'}
        subTitle={'รวมการนัดหมายทั้งหมดในวันนี้อยู่ที่นี่แล้ว'}
        buttons={[
          <Link to={'create'}>
            <Button type="primary">สร้างนัดหมาย</Button>
          </Link>,
        ]}
      />
      <div style={{ marginTop: '12px' }}>
        <TableComponent
          columns={columns}
          dataSource={data}
          onRowClick={(record) => {
            navigate(`/appointment/${record.id}`);
          }}
        />
      </div>
    </>
  );
};

const columns: ColumnsType<any> | undefined = [
  { title: 'ลำดับ', dataIndex: 'id', key: 'id', align: 'center' },
  { title: 'ชื่อการนัดหมาย', dataIndex: 'name', key: 'name', width: 200 },
  {
    title: 'รายละเอียด',
    dataIndex: 'descriptions',
    key: 'descriptions',
    width: 200,
  },
  {
    title: 'เวลาที่นัดหมาย',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (value: string) => {
      return <>{dayjs(value).format('M/D/YYYY h:mm A')}</>;
    },
  },
  { title: 'สร้างโดย', dataIndex: 'createdBy', key: 'createdBy' },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (value: string) => {
      return (
        <Link to={value} target="_blank" style={{ color: '#2db7f5' }}>
          {value}
        </Link>
      );
    },
  },
];

const data = [
  {
    id: 1,
    name: 'Utotech Stand Up Meeting',
    descriptions: 'อัพเดทสถานะงาน และ ความเป็นอยู่ของพนักงานทุกแผนก',
    duedate: '2024-10-02T04:40:24.863Z',
    createdBy: 'ภูวิศ วัฒนะ',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];
