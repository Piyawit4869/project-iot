import { Button, Flex, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface LeaveEarlyModalProps {
  open?: boolean;
  handleCloseModal: () => void;
  handleSubmit: (values: any) => void;
}

export const LeaveEarlyModal = (props: LeaveEarlyModalProps) => {
  const { open, handleCloseModal, handleSubmit } = props;

  return (
    <Modal open={open} onCancel={handleCloseModal} footer={null}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="เหตุผลที่ออกงานก่อนเวลา"
          name="remark"
          rules={[
            { required: true, message: 'กรุณากรอกเหตุผลที่ออกงานก่อนเวลา' },
          ]}
        >
          <TextArea placeholder="กรอกเหตุผลที่ออกงานก่อนเวลา" />
        </Form.Item>
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            ยืนยัน{' '}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
