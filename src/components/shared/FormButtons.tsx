import React from 'react';
import { Button, FormInstance, Modal } from 'antd';
import { useNavigate, useSubmit } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface FormButtonsProps {
  form: FormInstance<any>;
}

const FormButtonsEdit: React.FC<FormButtonsProps> = ({ form }) => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const onDelete = () => {
    confirm({
      title: 'คุณต้องการลบข้อมูล ใช่หรือไม่?',
      content: 'ข้อมูลของคุณจะถูกลบหากกดยืนยัน',
      okText: 'ยืนยัน',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk() {
        submit({ action: 'delete' }, { method: 'delete' });
      },
    });
  };

  const onReset = () => {
    confirm({
      title: 'คุณต้องการเคลียร์ข้อมูล ใช่หรือไม่?',
      content: 'ข้อมูลที่คุณกรอกจะถูกเคลียร์',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.resetFields();
      },
    });
  };

  const onSubmit = () => {
    confirm({
      title: 'คุณต้องการสร้างองค์กร ใช่หรือไม่?',
      content: 'ข้อมูลที่คุณกรอกจะถูกบันทึก',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.submit();
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        style={{ marginRight: '10px' }}
      >
        <LeftOutlined /> กลับ
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            marginRight: '10px',
            backgroundColor: '#A79DB4',
            borderColor: '#A79DB4',
            color: '#fff',
          }}
          onClick={onReset}
        >
          ยกเลิก
        </Button>
        <Button type="primary" onClick={onSubmit}>
          ยืนยัน
        </Button>
        <Button danger onClick={onDelete} style={{ marginLeft: '10px' }}>
          ลบ
        </Button>
      </div>
    </div>
  );
};

const FormButtonsCreate: React.FC<FormButtonsProps> = ({ form }) => {
  const navigate = useNavigate();

  const onReset = () => {
    confirm({
      title: 'คุณต้องการเคลียร์ข้อมูล ใช่หรือไม่?',
      content: 'ข้อมูลที่คุณกรอกจะถูกเคลียร์',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.resetFields();
      },
    });
  };

  const onSubmit = () => {
    confirm({
      title: 'คุณต้องการสร้างองค์กร ใช่หรือไม่?',
      content: 'ข้อมูลที่คุณกรอกจะถูกบันทึก',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.submit();
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        style={{ marginRight: '10px' }}
      >
        <LeftOutlined /> กลับ
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            marginRight: '10px',
            backgroundColor: '#A79DB4',
            borderColor: '#A79DB4',
            color: '#fff',
          }}
          onClick={onReset}
        >
          ยกเลิก
        </Button>
        <Button type="primary" onClick={onSubmit}>
          บันทึก
        </Button>
      </div>
    </div>
  );
};

export { FormButtonsEdit, FormButtonsCreate };
