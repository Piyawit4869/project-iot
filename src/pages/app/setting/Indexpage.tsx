import React from "react";
import { Segmented } from "antd";
import { useTranslation } from "react-i18next";

export const SettingIndex: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (lng: string | number) => {
    i18n.changeLanguage(`${lng}`.toLowerCase());
  };

  return (
    <div>
      <h3>เปลี่ยนภาษา</h3>
      <Segmented
        defaultValue="EN"
        options={["EN", "TH"]}
        size="small"
        onChange={changeLanguageHandler}
      />
    </div>
  );
};

export default SettingIndex;
