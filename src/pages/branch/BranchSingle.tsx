import { EditOutlined, TagFilled } from "@ant-design/icons"
import  Image  from "@assets/images/image_logoV2.png"
import { Button, Col, Flex, Row, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
export const BranchSingle = ()=> {
    const { Title, Paragraph} = Typography;
    const { t } = useTranslation();
    return ( 
            <>  
                <Flex justify="space-between" align="center">
                <Title level={3}>ตั้งค่าองค์กร</Title>
                <Button
                    icon={<EditOutlined style={{ fontSize: "20px" }} />}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "16px 20px",
                    }}
                >
                    <Link to={"/branchs/update"}>แก้ไขข้อมูล</Link>
                </Button>
            </Flex>

            <Paragraph><TagFilled style={{color:"orange"}} /> โลโก้บริษัท</Paragraph>
            <img src={Image} />
            
            <Paragraph><TagFilled style={{color:"orange",marginTop:"10px"}} /> ข้อมูลสาขา/องค์กร</Paragraph>
                <Row>
                    <Col span={18} push={6}>
                        <Typography>บริษัทจำกัด</Typography>
                        <Typography>0-1055-65119-323</Typography>
                        <Typography>สำนักงานใหญ่</Typography>
                        <Typography>บริษัท ยูโทเทค จำกัด</Typography>
                        <Typography>Software house</Typography>
                        <Typography>25/07/2566</Typography>
                        <Typography>ไม่จำทะเบียนภาษีมูลค่าเพิ่ม</Typography>
                    </Col>
                    <Col span={6} pull={18}>
                        <Typography>รูปแบบกิจการ</Typography>
                        <Typography>เลข 13 หลัก</Typography>
                        <Typography>สาขา</Typography>
                        <Typography>ชื่อกิจการ</Typography>
                        <Typography>คำอธิบายธุรกิจ</Typography>
                        <Typography>วันที่จดทะเบียนกิจการ</Typography>
                        <Typography>จดทะเบียนภาษีมูลค่าเพิ่ม</Typography>
                    </Col>
                </Row>
               
                <Paragraph><TagFilled style={{color:"orange",marginTop:"19px"}} /> ข้อมูลช่องทางการติดต่อ</Paragraph>
                <Row>
                    <Col span={18} push={6}>
                        <Typography>0878888888</Typography>
                        <Typography>kittipoom@utotech.org</Typography>
                        <Typography>-</Typography>
                        
                    </Col>
                    <Col span={6} pull={18}>
                        <Typography>เบอร์โทร</Typography>
                        <Typography>อีเมล์</Typography>
                        <Typography>เว็บไซต์</Typography>
                    </Col>
                </Row>

                <Paragraph><TagFilled style={{color:"orange",marginTop:"19px"}} /> ข้อมูลที่อยู่บริษัท</Paragraph>
                <Row>
                    <Col span={18} push={6}>
                        <Typography>ห้องเลขที่ 1454/127 ถนน เทพรัตน แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260</Typography>
                        <Typography>ห้องเลขที่ 1454/127 ถนน เทพรัตน แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260</Typography>
                        
                        
                    </Col>
                    <Col span={6} pull={18}>
                        <Typography>ที่อยู่ตามทะเบียน</Typography>
                        <Typography>ที่อยู่ส่งเอกสาร</Typography>
                        
                    </Col>
                </Row>
            
            </>
    )
}