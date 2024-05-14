import React from "react";

export const Headerbar: React.FC = () => {
  // const dropdownItems = [
  //   {
  //     key: "profile",
  //     label: <Link to="profile">โปรไฟล์</Link>,
  //   },

  //   {
  //     key: "/",
  //     label: <Link to="/">{t("back to Homepage")}</Link>,
  //   },
  //   {
  //     key: "signing-out",
  //     label: <Link to="signing-out">ออกจากระบบ</Link>,
  //   },
  // ];

  return <div style={styles.menu} />;
};

const styles: Record<string, React.CSSProperties> = {
  menu: {
    display: "flex",
    justifyContent: "end",
    zIndex: 5,
    alignItems: "center",
    padding: "10px 20px 10px 20px",
    backgroundColor: "#192A5C",
    height: "50px",
  },
  icon: {
    fontSize: "16px",
  },
};
