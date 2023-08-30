import { Button, Row, Typography } from "antd";
import { ThemeColors } from "../../styles/theme";

/**
 * this component is a box of title
 * @param title
 * @param button
 * @param textButton
 * @returns {Title("",true,"")} Box of title
 */
export const Title = (title: string, button: boolean, textButton: string) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      {button ? (
        <Row justify="space-between" align="middle" wrap>
          <Typography style={{ fontSize: "24px", fontWeight: 500 }}>
            {title}
          </Typography>
          <Button style={{ backgroundColor: ThemeColors.orangeColor }}>
            <Typography style={{ color: "white" }}>{textButton}</Typography>
          </Button>
        </Row>
      ) : (
        <Typography style={{ fontSize: "24px", fontWeight: 500 }}>
          {title}
        </Typography>
      )}

      <div
        style={{
          background: ThemeColors.goldColor,
          height: "3px",
        }}
      />
    </div>
  );
};
