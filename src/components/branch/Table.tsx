import { EditOutlined, } from "@ant-design/icons";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

export const BranchTable = () => {
    const dataSource = [
		{
			key: "1",
			documentName: "การออกแบบ",
			name: "การออกแบบ Flow Chart และ User Journey ของระบบ",
			issueDate: "บริการ",
			validDate: "4",
			value: 100000,
			status: "ร่าง",
		},
		{
			key: "2",
			documentName: "1235",
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
		{
			key: "3",
			documentName: "1235",
			name: "Po",
			issueDate: "01/01/2566",
			validDate: "01/01/2566",
			value: 212100,
			status: "ร่าง",
		},
    ]
    const columns = [
        {
            title: "ชื่อสินค้า/บริการ",
            dataIndex: "documentName",
            key: "documentName",
        },
        {
            title: "คำอธิบาย",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "ประเภท",
            dataIndex: "issueDate",
            key: "issueDate",
        },
        {
            title: "จำนวน",
            dataIndex: "validDate",
            key: "validDate",
        },
        {
            title: "ราคา",
            dataIndex: "value",
            key: "value",
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: () => <Link to={"/branchs/update"}>
            <Button icon={<EditOutlined />}
            style={{backgroundColor:"#EE9437",color:"white"}}>
            แก้ไข
            
          </Button>
          </Link>
        },
        // {
        //     title: "สถานะ",
        //     dataIndex: "status",
        //     key: "status",
        //     button: true
        // },
    ];
    
    return (
        <>
         <Table
            columns={columns}
            dataSource={dataSource}
            style={{ marginTop: "10px", borderRadius: "12px" }} />
        </>
       
        
    )

}

