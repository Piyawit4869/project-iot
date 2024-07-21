import { Button } from 'antd';
import { CSSProperties, FC } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';

interface CreateButtonProps {
  label: string;
}

export const CreateButton: FC<CreateButtonProps> = (
  props: CreateButtonProps,
) => {
  const { label } = props;

  return (
    <div style={styles.container}>
      <Button type="primary" icon={<PlusCircleFilled />} style={styles.button}>
        {label}
      </Button>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    fontSize: '18px',
    backgroundColor: '#19142a',
    borderColor: '#19142a',
    borderRadius: '10px',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
};
