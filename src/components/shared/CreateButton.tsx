import { Button } from 'antd';
import { FC } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';

interface CreateButtonProps {
  label: string;
  disable?: boolean;
}

export const CreateButton: FC<CreateButtonProps> = (
  props: CreateButtonProps,
) => {
  const { label, disable } = props;

  return (
    <div>
      <Button disabled={disable} type="primary" icon={<PlusCircleFilled />}>
        {label}
      </Button>
    </div>
  );
};
