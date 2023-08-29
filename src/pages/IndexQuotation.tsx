import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";

export const IndexQuotationPage = () => {
  const dataSource = [
    {
      key: "1",
      documentNumber: 1234,
      name: "John",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 2000,
      status: "ร่าง",
    },
    {
      key: "2",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "3",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "4",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "5",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "6",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "7",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "8",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "9",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
    {
      key: "10",
      documentNumber: 1235,
      name: "Po",
      issueDate: "01/01/2566",
      validDate: "01/01/2566",
      value: 212100,
      status: "ร่าง",
    },
  ];

  const columns = [
    {
      title: "เลขที่เอกสาร",
      dataIndex: "documentNumber",
      key: "documentNumber",
    },
    {
      title: "ลูกค้า",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "วันที่ออก",
      dataIndex: "issueDate",
      key: "issueDate",
    },
    {
      title: "ใช้ได้ถึง",
      dataIndex: "validDate",
      key: "validDate",
    },
    {
      title: "มูลค่าสุทธิ์",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
    },
  ];

  const onClickCurrency: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const itemsCurrency: MenuProps["items"] = [
    {
      label: "ทั้งหมด",
      key: "1",
    },
    {
      label: "ร่าง",
      key: "2",
    },
    {
      label: "รออนุมัติ",
      key: "3",
    },
    {
      label: "รอตอบรับ",
      key: "4",
    },
    {
      label: "ตอบรับแล้ว",
      key: "5",
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const items: MenuProps['items'] = [
    {
      key:'1',
      label:'เลขที่เอกสาร',
    },
    {
      key:'2',
      label:'ลูกค้า',
    },
  ]

  return (
    <div>
      {Title("Quotation")}
      <Row>
      <Input 
      prefix={<SearchOutlined />} 
      placeholder="Search Doccument Number"
      bordered={true}
      style={{
        paddingLeft: "10px",
        fontSize: "16px",
        color: ThemeColors.lightOrangeColor,
        border:"2px solid #EFAB3A",
        height:"50px",
        width:"75vw"
        }}/>
      <Button
        icon={<SearchOutlined />} 
        style={{
          marginLeft:"20px", 
          width:"15vh", height:"5vh", 
          backgroundColor:"#EFAB3A", 
          fontSize:"16px",}}>
            Search
      </Button>
      </Row>
        <Row style={{marginTop:"20px"}}>
        <Dropdown menu={{items, onClick}}>
        <Button 
        icon={<FilterOutlined />} 
        style={{
          backgroundColor:"#E46F1B", 
          width:"5vh", 
          height:"5vh", 
          marginTop:"15px"
        }}/>
        </Dropdown>
        <div
          style={{
            marginLeft:"15px",
            width: "253px",
            height: "72px",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
          }}>
          <Typography style={{ fontSize: "18px" }}>สถานะ</Typography>
          <Form.Item>
            <Dropdown menu={{ items: itemsCurrency, onClick: onClickCurrency }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                    color: ThemeColors.lightOrangeColor,
                  }}>
                  -
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Form.Item>
        </div>
        <div style={{marginLeft:"20px"}}>
          <Link to="/quotation/create">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                width: "253px",
                height: "72px",
                backgroundColor: "#E46F1B",
                fontSize: "22px",
              }}>
              สร้างใบเสนอราคา
            </Button>
          </Link>
        </div>
        </Row>
      <Table
          columns={columns}
          dataSource={dataSource}
          style={{marginTop:"20px", border:"2px solid #EFAB3A", borderRadius:"12px", backgroundColor:"#EFAB3A"}}
        />
    </div>
  );
};
