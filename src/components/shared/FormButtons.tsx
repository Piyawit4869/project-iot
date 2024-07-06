import React from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface FormButtonsProps {
  form: any;
  onFinish: (values: any) => void;
}

const FormButtonsEdit: React.FC<FormButtonsProps> = ({ form }) => {
  const navigate = useNavigate();

  const onDelete = () => {
    confirm({
      title: "ต้องการลบองค์กรนี้หรือไม่?",
      content: "หากลบแล้ว จะไม่สามารถกู้คืนได้",
      okText: "ยืนยัน",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk() {
        console.log("Deleted");
      },
      onCancel() {
        console.log("Delete action cancelled");
      },
    });
  };

  const onReset = () => {
    confirm({
      title: "คุณต้องการยกเลิกการแก้ไขหรือไม่?",
      content: "ข้อมูลที่คุณกรอกจะไม่ถูกบันทึก",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk() {
        form.resetFields();
        navigate(-1);
      },
      onCancel() {
        console.log("Reset action cancelled");
      },
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
      <Button type="primary" onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
        <LeftOutlined /> กลับ
      </Button>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button style={{ marginRight: "10px" }} onClick={onReset}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          ยืนยัน
        </Button>
        <Button danger onClick={onDelete} style={{ marginLeft: "10px" }}>
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
      title: "คุณต้องการยกเลิกการแก้ไขหรือไม่?",
      content: "ข้อมูลที่คุณกรอกจะไม่ถูกบันทึก",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk() {
        form.resetFields();
        navigate(-1);
      },
      onCancel() {
        console.log("Reset action cancelled");
      },
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
      <Button type="primary" onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
        <LeftOutlined /> กลับ
      </Button>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button style={{ marginRight: "10px" }} onClick={onReset}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          บันทึก
        </Button>
      </div>
    </div>
  );
};

export { FormButtonsEdit, FormButtonsCreate };
