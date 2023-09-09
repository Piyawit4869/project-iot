import { Radio, Row, Typography } from "antd";
import { Title } from "../components/global/Title";
import { useState } from "react";

import { ThemeColors } from "../styles/theme";
import { Employee } from "../components/partial/Employee";
import { Organize } from "../components/partial/Organize";

export const PartialPage = () => {
  const [sheet, setSheet] = useState(true);

  console.log("this is sheet :" + sheet);

  const onSheetChange = () => {
    setSheet(sheet == false);
  };

  return (
    <div>
      {Title("คำนวณการชำระเงินกิจการ/องค์กร", false, "")}
      {/* <Typography style={{ color: ThemeColors.fontColor3 }}>
        ข้อมูลการเงินของกิจการ/องค์กร
      </Typography> */}
      <Typography
        style={{
          fontSize: "22px",
          fontWeight: 500,
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        ชื่อโครงการ : Stay-organize
      </Typography>
      <Row></Row>
      <Radio.Group value={sheet} onChange={onSheetChange}>
        <Radio.Button
          value={true}
          style={{
            color: sheet ? ThemeColors.orangeColor : "white",
            backgroundColor: sheet
              ? ThemeColors.bgColor
              : ThemeColors.orangeColor,
            borderColor: ThemeColors.orangeColor,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomColor: sheet
              ? ThemeColors.bgColor
              : ThemeColors.orangeColor,

            marginRight: "5px",
          }}
        >
          คำนวณการชำระเงินกิจการ/องค์กร
        </Radio.Button>
        <Radio.Button
          value={false}
          style={{
            color: sheet ? "white" : ThemeColors.orangeColor,
            backgroundColor: sheet
              ? ThemeColors.orangeColor
              : ThemeColors.bgColor,
            borderColor: ThemeColors.orangeColor,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomColor: sheet
              ? ThemeColors.orangeColor
              : ThemeColors.bgColor,
          }}
        >
          คำนวณการชำระเงินพนักงาน
        </Radio.Button>
        <div
          style={{
            background: ThemeColors.bgColor,
            marginBottom: "-2px",
            height: "1px",
          }}
        />
      </Radio.Group>
      <div
        style={{
          background: ThemeColors.orangeColor,
          marginBottom: "20px",
          height: "1px",
        }}
      />
      {sheet ? <Organize /> : <Employee />}
    </div>
  );
};
