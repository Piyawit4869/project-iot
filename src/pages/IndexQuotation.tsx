import { Button, Card, Select, Table, } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";


export const IndexQuotationPage = () => {
    const handleChange = (_value: string[]) => {
        console.log('selected ${value}');
    }

    const dataSource = [
        {
          key: '1',
          documentNumber: 1234,
          name: 'John',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 2000,
          status: 'ร่าง',
        },
        {
          key: '2',
          documentNumber: 1235,
          name: 'Po',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 212100,
          status: 'ร่าง',
        },
      ];
      
      const columns = [
        {
          title: 'เลขที่เอกสาร',
          dataIndex: 'documentNumber',
          key: 'documentNumber',
        },
        {
          title: 'ลูกค้า',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'วันที่ออก',
          dataIndex: 'issueDate',
          key: 'issueDate',
        },
        {
            title: 'ใช้ได้ถึง',
            dataIndex: 'validDate',
            key: 'validDate',
        },
        {
            title: 'มูลค่าสุทธิ์',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
        },
      ];

  return (

        <Card
           title="quotation"
           extra={<Link to="/dashboard">เพิ่มเติม</Link>}>
        <div>
          <div className="status">
              <Select
                className="status_select"
                style={{minWidth:'175px',}}
                defaultValue={['ทั้งหมด']}
                onChange={handleChange}
                options={[
                  {value: 'ทั้งหมด', label:'ทั้งหมด'},
                  {value: 'ร่าง', label:'ร่าง'},
                  {value: 'รออนุมัติ', label:'รออนุมัติ'},
                  {value: 'รอตอบรับ', label:'รอตอบรับ'},
                  {value: 'ตอบรับแล้ว', label:'ตอบรับแล้ว'}
                ]}>
              </Select>
          </div>
          <div className="add_new_quotation">
            <Link to="/quotation">
              <Button type="primary" icon={<PlusOutlined />} 
              style={{width:'175px', height:'75px'}} >
                    สร้างใบเสนอราคา
              </Button>
            </Link>
          </div>
        </div>
        <div className="table_index_quota">
            <Table columns={columns} dataSource={dataSource} style={{marginTop:'20px'}}/>
        </div>
        </Card>

  );
};
