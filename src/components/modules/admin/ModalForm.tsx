import { Flex, Modal, Typography } from 'antd';
import { ReactNode } from 'react';

interface ModalFormProp {
  title?: string;
  open: boolean | undefined;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  child?: ReactNode;
}

export const ModalForm = (props: ModalFormProp) => {
  const { title, open, onCancel, child } = props;
  return (
    <Modal width={900} open={open} onCancel={onCancel} footer={null}>
      <div style={{ marginTop: '30px' }}>
        <Flex justify="start">
          {title ? (
            <Typography.Title level={3} style={{ marginTop: 0 }}>
              {title}
            </Typography.Title>
          ) : null}
        </Flex>
        {child}
      </div>
    </Modal>
  );
};
