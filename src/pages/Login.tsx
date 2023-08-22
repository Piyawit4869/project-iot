import { Form, Input, Button, Row, Card, Typography, Image } from "antd";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/Logo-StayOrganized.png";
// import axios from "axios";

export const LoginPage = () => {
  // const onSubmit = (value: any) => {
  //   const newData = {
  //     username: value.username,
  //     password: value.password,
  //   };
  //   axios
  //     .post("http://rhome29.thddns.net:7578/api/login", newData)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data.token);
  //         localStorage.setItem("Token", res.data.token);
  //         window.location.assign("/");
  //       }

  //       if (res.status === 203) {
  //         window.alert(res.data.message);
  //       }
  //     });
  // };
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
  <div>
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Card style={{
        width:"600px", 
        height:"500px", 
        justifyItems:"center",
        }}>
      <Row>
      <div style={{
        backgroundColor:"#E46F1B", 
        width:"125px", 
        height:"130px",
        borderRadius:"0px 0px 50px 0px",
        }}>
        <Image width={100}src={Logo} preview={false} style={{margin:"auto", display:"flex",marginTop:"15px",marginLeft:"8px"}}/>
      </div>
      <div style={{marginLeft:"15px"}}>
        <Typography style={{fontSize:"32px"}}>Stay Organize</Typography>
        <Typography style={{fontSize:"27px"}}>เข้าสู่ระบบ</Typography>
      </div>
      </Row> 
      <div
            style={{
              borderBottom: "1px solid #EFAB3A",
              width: "475px",
              margin: "auto",
              marginTop:"20px",
              marginBottom:"20px",
            }}
          ></div>
        <Form style={{marginTop:"10px"}}>
        <div
            style={{
              width: "475px",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              margin:"auto"
            }}
          >
          <Typography style={{ fontSize: "18px" }}>อีเมล์</Typography>
            <Form.Item>
              <Input
                placeholder="กรุณากรอกข้อมูลอีเมล์"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
          </div>
          <div
            style={{
              width: "475px",
              backgroundColor: "white",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 3px" + ThemeColors.goldColor,
              margin:"auto"
            }}
          >
            <Typography style={{ fontSize: "18px" }}>รหัสผ่าน</Typography>
            <Form.Item>
              <Input
                placeholder="กรุณากรอกข้อมูลรหัสผ่าน"
                bordered={false}
                style={{
                  padding: "0px",
                  fontSize: "16px",
                  color: ThemeColors.lightOrangeColor,
                }}
              />
            </Form.Item>
            </div>
            <Form.Item 
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button type="primary" htmlType="submit" style={{backgroundColor:"#F0BA3D", width:"180px", height:"50px", marginTop:"20px"}}>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
  </div>
  );
};
