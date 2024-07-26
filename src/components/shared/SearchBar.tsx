import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';

// interface SearchBarProps {
//   form?: any;
//   param?: any;
//   handleChangeFilter?: ((changedValues: any, values: any) => void) | undefined;
//   renderField?: any[];
// }

export const SearchBar = () => {
  // const { form, param, handleChangeFilter, renderField } = props;

  return (
    <Row gutter={6} align="middle" wrap={false}>
      <Col xs={21} sm={12} md={12} lg={10} xl={10}>
        <Input allowClear />
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

    // <Form form={form} initialValues={param} onValuesChange={handleChangeFilter}>
    //   <Row gutter={6} align="middle">
    //     <Col>
    //       {renderField?.map((item: any) => (
    //         <Form.Item label={item.label} name={item.name}>
    //           <Input
    //             addonBefore={item.addonBefore}
    //             placeholder={item.placeholder}
    //             allowClear
    //           />
    //         </Form.Item>
    //       ))}
    //     </Col>
    //   </Row>
    // </Form>
  );
};
