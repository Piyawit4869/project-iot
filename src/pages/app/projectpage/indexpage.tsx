import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Input, Pagination, Row, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";




const columns = [
    {
        title: 'ลำดับ',
        dataIndex: 'nummer',
        key: 'nummer',
      },
  {
    title: 'ชื่อโปรเจต',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'อีเมล',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'เบอร์โทร',
    dataIndex: 'tel',
    key: 'tel',
  },
  {
    title: "รายละเอียดเพิ่มเติม",
    dataIndex: "details",
    key: "details",
    render: () => <Button type="link" onClick={() => ('/project/singleproject')}>ดูข้อมูล</Button>,
  },
];

const data = [
  {
    key: '1',
    nummer:'1',
    name: 'Project 1',
    email: 'abcdefg@gmailcom',
    tel: '0123456789',
  },
  {
    key: '2',
    nummer:'1',
    name: 'Project 2',
    email: 'abcdefg@gmailcom',
    tel: '0123456789',
  },
  {
    key: '3',
    nummer:'1',
    name: 'Project 3',
    email: 'abcdefg@gmailcom',
    tel: '0123456789',
    
  },
];

export const ProjectIndex = () => {
  const navigate = useNavigate();



const onSearch = (value: any) => {
  console.log(value);
};
  return (
    <>
      <Row> {/* Top Buttons */}
        <Col span={12}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate('/')}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/project')}>
              Project
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row> {/* Top Buttons */}

      <h1>Project</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Input.Search
          placeholder="Search Project"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => navigate('/project/createproject')}>Add information</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  );
};
