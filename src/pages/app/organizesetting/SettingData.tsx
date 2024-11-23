import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export const addressColumns: ColumnsType<any> = [
  {
    title: 'ชื่อที่อยู่',
    width: '200px',
    align: 'start',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'บ้านเลขที่',
    width: '80px',
    align: 'center',
    key: 'houseNo',
    dataIndex: 'houseNo',
  },
  {
    title: 'จังหวัด',
    width: '200px',
    align: 'center',
    key: 'province',
    dataIndex: 'province',
  },
  {
    title: 'อำเภอ/เขต',
    width: '200px',
    align: 'center',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'ที่อยู่หลัก',
    width: '100px',
    align: 'center',
    key: 'isMain',
    dataIndex: 'isMain',
    render: (value: boolean) => {
      if (value === true) {
        return <CheckOutlined style={{ color: 'green', fontSize: '15px' }} />;
      }
      return <>-</>;
    },
  },
  {
    title: '',
    width: '150px',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (id: any) => (
      <Link to={`${id}`}>
        <Button type="primary">ดูเพิ่มเติม</Button>
      </Link>
    ),
  },
];

export const mockupAddresses = [
  {
    id: 1,
    name: 'สำนักงานใหญ่',
    province: 'กรุงเทพมหานคร',
    city: 'จรัญสนิทวงศ์',
    houseNo: '99/6',
    isMain: true,
  },
  {
    id: 2,
    name: 'สาขา2',
    province: 'กรุงเทพมหานคร',
    city: 'บางกอกน้อย',
    houseNo: '123/9',
    isMain: false,
  },
  {
    id: 3,
    name: 'สาขา3',
    province: 'กรุงเทพมหานคร',
    city: 'บางนา',
    houseNo: '867',
    isMain: false,
  },
];

export const systemColumns: ColumnsType<any> = [
  {
    title: 'ชื่อการตั้งค่า',
    align: 'start',
    key: 'id',
    dataIndex: 'id',
    render: (id: any) => <>การตั้งค่าที่ {id}</>,
  },
  {
    title: 'ภาษา',
    align: 'start',
    key: 'defaultLanguage',
    dataIndex: 'defaultLanguage',
  },
  {
    title: 'ธีมสี',
    align: 'center',
    key: 'theme',
    dataIndex: 'theme',
  },
  {
    title: 'ขนาดตัวอักษร',
    align: 'center',
    key: 'textDisplay',
    dataIndex: 'textDisplay',
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (id: any) => (
      <Link to={`${id}`}>
        <Button type="primary">ดูเพิ่มเติม</Button>
      </Link>
    ),
  },
];

export const mockupSettings = [
  {
    id: 1,
    defaultLanguage: 'th',
    theme: 'light',
    textDisplay: 'normal',
  },
  {
    id: 2,
    defaultLanguage: 'en',
    theme: 'light',
    textDisplay: 'small',
  },
  {
    id: 3,
    defaultLanguage: 'th',
    theme: 'dark',
    textDisplay: 'large',
  },
];
