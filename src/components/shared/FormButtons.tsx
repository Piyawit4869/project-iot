import { Button, FormInstance, Modal } from 'antd';
import { useNavigate, useSubmit } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

const { confirm } = Modal;

interface FormButtonEdit {
  form: FormInstance;
  titleModalReset?: string;
  contentModalReset?: string;

  titleModalSubmit?: string;
  contentModalSubmit?: string;

  titleModalDelete?: string;
  contentModalDelete?: string;
}

const FormButtonsEdit = (props: FormButtonEdit) => {
  const {
    form,
    titleModalReset,
    contentModalReset,
    titleModalSubmit,
    contentModalSubmit,
    titleModalDelete,
    contentModalDelete,
  } = props;
  const navigate = useNavigate();
  const submit = useSubmit();

  const onDelete = () => {
    confirm({
      title: titleModalDelete ? titleModalDelete : 'title',
      content: contentModalDelete ? contentModalDelete : 'content',
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
      title: titleModalReset ? titleModalReset : 'title',
      content: contentModalReset ? contentModalReset : 'content',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.resetFields();
      },
    });
  };

  const onSubmit = () => {
    confirm({
      title: titleModalSubmit ? titleModalSubmit : 'title',
      content: contentModalSubmit ? contentModalSubmit : 'content',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.submit();
      },
    });
  };

  return (
    <div style={styles.sticky}>
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

interface FormButtonSetting {
  form: FormInstance;
  titleModalSubmit?: string;
  contentModalSubmit?: string;
}

const FormButtonsSetting = (props: FormButtonSetting) => {
  const { form, titleModalSubmit, contentModalSubmit } = props;
  const navigate = useNavigate();

  const onSubmit = () => {
    confirm({
      title: titleModalSubmit ? titleModalSubmit : 'title',
      content: contentModalSubmit ? contentModalSubmit : 'content',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.submit();
      },
    });
  };

  return (
    <div style={styles.sticky}>
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
        <Button type="primary" onClick={onSubmit}>
          แก้ไขข้อมูล
        </Button>
      </div>
    </div>
  );
};

interface FormButtonSystemSetting {
  form: FormInstance;
  titleModalSubmit?: string;
  contentModalSubmit?: string;
}

const FormButtonsSystemSetting = (props: FormButtonSystemSetting) => {
  const { form, titleModalSubmit, contentModalSubmit } = props;

  const onSubmit = () => {
    confirm({
      title: titleModalSubmit ? titleModalSubmit : 'title',
      content: contentModalSubmit ? contentModalSubmit : 'content',
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
        justifyContent: 'end',
        alignItems: 'center',
        position: 'sticky',
        height: '50px',
        top: 0,
        zIndex: 1,
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button type="primary" onClick={onSubmit}>
          แก้ไขระบบ
        </Button>
      </div>
    </div>
  );
};

interface FormButtonCreate {
  form: FormInstance;
  titleModalReset?: string;
  contentModalReset?: string;

  titleModalSubmit?: string;
  contentModalSubmit?: string;
}

const FormButtonsCreate = (props: FormButtonCreate) => {
  const {
    form,
    titleModalReset,
    contentModalReset,
    titleModalSubmit,
    contentModalSubmit,
  } = props;
  const navigate = useNavigate();

  const onReset = () => {
    confirm({
      title: titleModalReset ? titleModalReset : 'title',
      content: contentModalReset ? contentModalReset : 'content',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.resetFields();
      },
    });
  };

  const onSubmit = () => {
    confirm({
      title: titleModalSubmit ? titleModalSubmit : 'title',
      content: contentModalSubmit ? contentModalSubmit : 'content',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk() {
        form.submit();
      },
    });
  };

  return (
    <div style={styles.sticky}>
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

export {
  FormButtonsEdit,
  FormButtonsCreate,
  FormButtonsSetting,
  FormButtonsSystemSetting,
};

const styles: Record<string, CSSProperties> = {
  sticky: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    height: '50px',
    top: 0,
    zIndex: 1,
    background: 'white',
  },
};
