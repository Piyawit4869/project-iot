import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const Headerbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const me = JSON.parse(localStorage.getItem("me") as any);
  // console.log({me})
  return (
    <div className="app-background" style={styles.menu}>
      <div style={styles.navRight}>
        <div style={styles.dropdown}>
          <span onClick={handleDropdownToggle} style={styles.dropdownToggle}>
            {me.role}
            <UserOutlined style={styles.icon} />
          </span>
          {isDropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownItem}>
                <Link to="/profile">โปรไฟล์</Link>
              </div>
              <div style={styles.dropdownItem}>การตั้งค่า</div>
              <div style={styles.dropdownItem}>ลงชื่อออก</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  menu: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
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
  dropdownItemHover: {
    // backgroundColor: "#f1f1f1",
  },
};
