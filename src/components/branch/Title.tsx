import { ThemeColors } from "@src/styles/theme"
import { Typography } from "antd"

export const BranchTitle = () => {
    return (
        <>
            <Typography style={{ fontSize: "18px" }}>
                สาขาภายในกิจการ/องค์กร
            </Typography>
            <div style={{
                background: ThemeColors.goldColor, height: "3px"
            }} />
            <p>ข้อมูลสินค้าและบริการขององค์กร และข้อมูลที่อยู่เพื่อใช้แสดงในหน้าเอกสาร </p>
            
        </>
    )
}
