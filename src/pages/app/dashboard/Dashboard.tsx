import type { CountdownProps } from 'antd';
import { Col, Row, Card, Statistic, Steps } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish: CountdownProps['onFinish'] = () => {
  console.log('finished!');
};

const onChange: CountdownProps['onChange'] = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};
const description = 'This is a description.';
export const Dashboard = () => {
  return (
    <>
      <div style={{ fontSize: 40 }}>Dashboard</div>
      <Steps
        current={1}
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />

      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title={<span style={{ color: 'white' }}>Active</span>}
                value={11.28}
                precision={2}
                valueStyle={{ color: '#62DA80' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title={<span style={{ color: 'white' }}>Idle</span>}
                value={9.3}
                precision={2}
                valueStyle={{ color: '#F57679' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 32 }}>
          <Col span={12}>
            <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
          </Col>
          <Col span={12}>
            <Countdown
              title="Million Seconds"
              value={deadline}
              format="DD:MM:YY:HH:mm"
            />
          </Col>
          <Col span={24} style={{ marginTop: 32 }}>
            <Countdown
              title="Day Level"
              value={deadline}
              format="D ᴅᴀʏ H ʜᴏᴜʀ m ᴍɪɴ  s ꜱᴇᴄ "
            />
          </Col>
          <Col span={12}>
            <Countdown
              title="Countdown"
              value={Date.now() + 10 * 1000}
              onChange={onChange}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
