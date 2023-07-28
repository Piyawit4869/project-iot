import { Button, Card, Select, Table, } from "antd";
import { AppLayout } from "../layout/AppLayout";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export const IndexQuotationPage = () => {

    const { Option } = Select;

    const handleChange = (_value: string[]) => {
        console.log('selected ${value}');
    }

    const dataSource = [
        {
          key: '2',
          documentNumber: 1234,
          name: 'John',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 2000,
          status: 'wait',
        },
        {
          key: '2',
          documentNumber: 1234,
          name: 'John',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 2000,
          status: 'wait',
        },
      ];
      
      const columns = [
        {
          title: 'Document Number',
          dataIndex: 'documentNumber',
          key: 'documentNumber',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'IssueDate',
          dataIndex: 'issueDate',
          key: 'issueDate',
        },
        {
            title: 'ValidDate',
            dataIndex: 'validDate',
            key: 'validDate',
        },
        {
            title: 'value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
      ];

  return (
    <AppLayout>
        <Card
           title="indexquotation"
           extra={<Link to="/dashboard">เพิ่มเติม</Link>}>
        <div className="status">
                <Select
                className="status_select"
                mode="multiple"
                style={{width:'275px'}}
                placeholder="select"
                defaultValue={['all']}
                onChange={handleChange}
                optionLabelProp="label"
                >
                    <Option value="ทั้งหมด" label="ทั้งหมด">           
                    </Option>
                    <Option value="ร่าง" label="ร่าง">           
                    </Option>
                    <Option value="รออนุมัติ" label="รออนุมัติ">           
                    </Option>
                    <Option value="รอตอบรับ" label="รอตอบรับ">           
                    </Option>
                    <Option value="ยอมรับแล้ว" label="ยอมรับแล้ว">           
                    </Option>
                </Select>
        </div>
        <div className="add_new_quotation">
            <Button type="primary" icon={<PlusOutlined />}
            style={{widows:'275px', height:'75px'}}>
                สร้างใบเสนอราคา
            </Button>
        </div>
        <div className="table_index_quota">
            <Table columns={columns} dataSource={dataSource} style={{marginTop:'20px'}}/>
        </div>
        </Card>
    </AppLayout>
  );
};
