import { ThemeColors } from "../styles/theme";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

export const CustomersDetail = () => {
  return <div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography style={{ fontSize: "18px", fontWeight: 500 }}>
        แก้ไขข้อมูลลูกค้า
      </Typography>
      <div style={{ marginBottom: "10px" }}>
        <Button
          style={{
            border: "0",
            height: "50px",
            width: "180px",
            marginRight: "10px",
            backgroundColor: ThemeColors.greenColor,
          }}
        >
          <Typography style={{ fontSize: "18px", color: "white" }}>
            บันทึก
          </Typography>
        </Button>
        <Link to={"/customers"}>
          <Button
            style={{
              border: "0",
              height: "50px",
              width: "180px",
              marginRight: "10px",
              fontSize: "18px",
              backgroundColor: ThemeColors.waringColor,
              color: ThemeColors.whiteColor,
            }}
          >
            ยกเลิก
          </Button>
        </Link>
      </div>
    </div>
  </div>
}