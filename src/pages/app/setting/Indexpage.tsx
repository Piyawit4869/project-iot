import React from 'react';
import { Segmented, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

export const SettingIndex: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguageHandler = (lng: string | number) => {
    i18n.changeLanguage(`${lng}`.toLowerCase());
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Button type="primary" onClick={() => navigate(-1)}>
            <LeftOutlined /> กลับ
          </Button>
        </Col>
      </Row>
      <h3>เปลี่ยนภาษา</h3>
      <Segmented
        defaultValue="EN"
        options={['EN', 'TH']}
        size="small"
        onChange={changeLanguageHandler}
      />
    </div>
  );
};

export default SettingIndex;
