import { Typography } from "antd";
import { ThemeColors } from "../../styles/theme";

/**
 * this component is a box of title
 * @param title
 * @returns {Title("")} Box of title
 */
export const Title = (title: string) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <Typography style={{ fontSize: "24px", fontWeight: 600 }}>
        {title}
      </Typography>
      <div
        style={{
          background: ThemeColors.goldColor,
          height: "3px",
        }}
      />
    </div>
  );
};
