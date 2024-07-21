import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';

export const SearchBar: React.FC = () => {
  return (
    <Row gutter={6} align="middle">
      <Col>
        <Input addonBefore="ค้นหา" allowClear style={{ width: 304 }} />
      </Col>
      <Col>
        <Button
          icon={<SearchOutlined />}
          type="primary"
          style={{
            backgroundColor: '#19142A',
            borderColor: '#19142A',
          }}
        />
      </Col>
    </Row>
  );
};
