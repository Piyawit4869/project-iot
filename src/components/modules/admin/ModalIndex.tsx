import { TableComponent } from '@src/components/shared';
import { Button, Flex, Modal, Typography } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';

interface ModalIndexProp {
  title: string;
  open: boolean | undefined;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  buttonText?: ReactNode | string;
  onButtonClick?: MouseEventHandler<HTMLElement> | undefined;
  columns: any;
  dataSource: any[];
}

export const ModalIndex = (props: ModalIndexProp) => {
  const {
    title,
    open,
    onCancel,
    buttonText,
    onButtonClick,
    dataSource,
    columns,
  } = props;

  return (
    <Modal width={900} open={open} onCancel={onCancel} footer={null}>
      <div style={{ marginTop: '30px' }}>
        <Flex justify="space-between">
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            {title}
          </Typography.Title>
          <Button type="primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Flex>
        <TableComponent columns={columns} dataSource={dataSource} />
      </div>
    </Modal>
  );
};
