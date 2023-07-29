import { Button, Dropdown, Form, MenuProps, Row, Space, Table, Typography, message, } from "antd";
import { Title } from "../components/global/Title";
import { ThemeColors } from "../styles/theme";
import { DownOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

export const IndexQuotationPage = () => {

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
        {
          key: '2',
          documentNumber: 1235,
          name: 'Po',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 212100,
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
        {
          key: '2',
          documentNumber: 1235,
          name: 'Po',
          issueDate: '01/01/2566',
          validDate: '01/01/2566',
          value: 212100,
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

      const itemsStatus: MenuProps["items"] = [
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
      label: "ยอมรับแล้ว",
      key: "5",
    },
  ];

  const onClickStatus: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  return (
        <div>
          {Title("ใบเสนอราคา")}
          <Row>
           <div
            style={{
              height:"75px",
              width: "20%",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              marginRight: "20px",
            }}
          >
            <Typography style={{ fontSize: "18px" }}>สถานะ</Typography>
            <Form.Item>
              <Dropdown
                menu={{ items: itemsStatus, onClick: onClickStatus }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      color: ThemeColors.lightOrangeColor,
                    }}
                  >
                    -
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Form.Item>
          </div>
          <div>
            <Button
              style={{ height: "75px", width:'265px', backgroundColor: ThemeColors.orangeColor }}
            >
              <Typography style={{ fontSize: "18px", color: "white" }}>
                <PlusSquareOutlined style={{
                color: ThemeColors.whiteColor,
                fontSize: "24px",
                marginRight: "5px",
              }}/>
                อนุมัติในเสนอราคา
              </Typography>
            </Button>
          </div>
          </Row>
        <div
          style={{
          width:'100%',
          height:'124px',
          flexShrink:'0', 
          borderRadius:'10px', 
          borderBottom:'1px solid var(--palettes-22, #EE9437', 
          background:'var(--palettes-22, #EE9437)',
          marginTop:'20px',
          }}>
            <Table columns={columns} dataSource={dataSource}></Table>
        </div>
        <div 
        style={{
          minWidth:'100vh',
          minHeight:'100vh',
          flexShrink:'0', 
          borderRadius:'10px', 
          border:'3px solid var(--palettes-22, #EE9437', 
          background:'var(--box-color, #FFF)', 
          }}>
        </div>
      </div>
  );
};
