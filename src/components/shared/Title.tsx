import { Col, Row, Typography } from 'antd';

interface TitleBarProps {
  title: string;
  subTitle?: string | React.ReactElement;
  buttons?: React.ReactElement[];
}

export const TitleBar = (props: TitleBarProps) => {
  const { Title } = Typography;
  const { title, subTitle, buttons } = props;

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ margin: '0px' }}>
            {title}
          </Title>
        </Col>
        <Col>
          <Row gutter={6}>
            {buttons?.map((button, index) => {
              return <Col key={`btn-title-${index}`}>{button}</Col>;
            })}
          </Row>
        </Col>
      </Row>
      {subTitle ? <Typography>{subTitle}</Typography> : <></>}
    </div>
  );
};
