import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { ThemeColors } from "@src/styles/theme";
import {
  Button,
  Dropdown,
  Form,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import { t } from "i18next";
import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

interface FilterBarProps {
  onFilterClick: MouseEventHandler<HTMLElement> | undefined;
  filterIcon: ReactNode;
  filterCollapsed: Boolean;
  roleMenu: MenuProps;
  role: string;
}

export const FilterBar = (props: FilterBarProps) => {
    
  return (
    <Row style={{ marginTop: "10px", marginBottom: "10px" }} wrap={false}>
      <Button
        onClick={props.onFilterClick}
        icon={props.filterIcon}
        style={{
          backgroundColor: props.filterCollapsed ? "#E46F1B" : "#FFFFFF",
          width: "5%",
          height: "70px",
          border: "0px",
        }}
      />
      <div
        style={{
          marginLeft: "15px",
          width: "15%",
          height: "70px",
          backgroundColor: "white",
          paddingTop: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography
          style={{
            fontSize: "16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {t("role")}
        </Typography>
        <Form.Item>
          <Dropdown menu={props.roleMenu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                  color: ThemeColors.lightOrangeColor,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  marginTop: "-17px",
                }}
              >
                {props.role}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Form.Item>
      </div>
      <Link to="/branches/create" style={{ width: "12%" }}>
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontSize: "25px" }} />}
          style={{
            width: "100%",
            height: "70px",
            backgroundColor: "#E46F1B",
            fontSize: "16px",
            marginLeft: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {t("create user")}
        </Button>
      </Link>
    </Row>
  );
};
