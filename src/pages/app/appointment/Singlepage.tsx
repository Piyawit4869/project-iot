import { TitleBar, CalendarComponent } from '@src/components/shared';
import { Button, Flex, Form, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const AppointmentSingle = () => {
  return (
    <>
      <TitleBar
        title={'Utotech Stand Up Meeting'}
        subTitle={'อัพเดทสถานะงาน และ ความเป็นอยู่ของพนักงานทุกแผนก'}
        buttons={[<Button type="primary">ยืนยัน</Button>]}
      />
      <Flex gap={8}>
        <Typography>ลิงค์ :</Typography>
        <Link
          to={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
          target="_blank"
          style={{ color: '#2db7f5' }}
        >
          https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </Link>
      </Flex>

      <Form layout="vertical">
        <div style={{ marginTop: '12px' }}>
          <CalendarComponent />
        </div>
      </Form>
    </>
  );
};
