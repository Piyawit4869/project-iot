import React, { useState } from "react";
import { LogoutOutlined, SettingOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Col, Row, Segmented } from "antd";
import { useTranslation } from "react-i18next";

export const Headerbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const me = JSON.parse(localStorage.getItem("me") as any);

  const changeLanguageHandler = (lng: string | number) => {
    i18n.changeLanguage(`${lng}`.toLowerCase());
  };

  const generateBreadcrumbs = (path: string) => {
    const pathnames = path.split("/").filter((x) => x);
    return (

      <Breadcrumb style={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          console.log("is pathnames",name)
          return (
            <Breadcrumb.Item key={name}>
              {isLast ? t(name) : <Link to={routeTo}>{t(name)}</Link>}
              
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };
  return (
    <div style={styles.header}>
      {generateBreadcrumbs(location.pathname)}
      <Row gutter={[12,12]}
      align="middle"><Col> <div style={styles.menu}>
        <div style={styles.navRight}>
          <div style={styles.dropdown}>
            <span onClick={handleDropdownToggle} style={styles.dropdownToggle}>
              {me.role}
              <UserOutlined style={styles.icon} />
            </span>
            {isDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownItem}>
                  <Link to="/profile"><UserOutlined /> โปรไฟล์</Link>
                </div>
                <div style={styles.dropdownItem}>
                 <Link to="/setting"><SettingOutlined /> การตั้งค่า</Link>
                 </div>
                <div style={styles.dropdownItem}>
                  <Link to="/login"><LogoutOutlined /> ลงชื่อออก</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div></Col>
      <Col><Segmented
        defaultValue="EN"
        options={["EN", "TH"]}
        size="small"
        onChange={changeLanguageHandler}
      /></Col></Row>
     
      
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    height: "50px",
  },
  menu: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 0px",
    height: "50px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownToggle: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  icon: {
    marginLeft: "8px",
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: "100%",
    backgroundColor: "#fff",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
    zIndex: 1,
    borderRadius: "4px",
    marginTop: "5px",
  },
  dropdownItem: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  breadcrumb: {
    margin: "16px 0",
  },
  dropdownItemHover: {
    // backgroundColor: "#f1f1f1",
  },
};
