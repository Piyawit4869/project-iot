import { Button, Flex, Form, Input, Modal, notification, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderEditForm } from './renderForm';
import { useLoaderData, useSubmit } from 'react-router-dom';
import React from 'react';
import vine, { errors } from '@vinejs/vine';
import dayjs from 'dayjs';

export const UsersSingle = () => {
  const { user } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();

  const [open, setOpen] = React.useState(false);

  const schema = vine.object({
    active: vine.boolean(),
    roleId: vine.string().optional(),
    profile: vine.object({
      photoUrl: vine.string().optional(),
      prefix: vine.enum(['Mr.', 'Mrs.', 'Miss']).optional(),
      firstName: vine.string(),
      lastName: vine.string().optional(),
      birthDate: vine.string().optional(),
      phone: vine.string().maxLength(10).optional(),
    }),
  });

  const onFinish = async (values: any) => {
    const validator = vine.compile(schema);

    try {
      const payload = Object.assign({}, values);

      if (values.file && values.file.length > 0) {
        if (values.file[0].url) {
          payload.profile.photoUrl = values.file[0].url;
          delete payload.file;
        } else {
          values.profile.photoUrl = values.file[0].response?.url;
          delete payload.file;
        }
      } else {
        payload.profile.photoUrl = null;
        delete payload.file;
      }

      if (!payload.active) {
        payload.active = true;
      }

      if (payload.profile.birthDate) {
        payload.profile.birthDate = payload.profile.birthDate.toISOString();
      }

      await validator.validate(payload);

      await submit(
        { data: JSON.stringify(payload), action: 'edit' },
        { method: 'put' },
      );
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);

        notification.error({
          message: 'แก้ไขผู้ใช้งานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
      } else {
        notification.error({
          message: 'ข้อมูลผู้ใช้งานไม่ถูกต้อง',
          placement: 'bottomRight',
          duration: 3,
        });
      }
    }
  };

  React.useEffect(() => {
    let birthDate = null;
    if (user && user.profile.birthDate) {
      birthDate = dayjs(user.profile.birthDate);
    } else {
      birthDate = '';
    }

    const profile = user.profile;

    form.setFieldsValue({
      ...user,
      profile: {
        ...profile,
        birthDate: birthDate,
        photoUrl: user?.profile?.photoUrl
          ? [
              {
                url: user?.profile?.photoUrl ? user.profile.photoUrl : '',
              },
            ]
          : undefined,
      },
      file: user?.profile?.photoUrl
        ? [
            {
              url: user?.profile?.photoUrl ? user.profile.photoUrl : '',
            },
          ]
        : undefined,
    });
  }, [form, user]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const resetPassword = async (values: any) => {
    submit(
      { data: JSON.stringify(values), action: 'resetPassword' },
      { method: 'put' },
    );

    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form layout="vertical" onFinish={resetPassword}>
          <Form.Item label={'รหัสผ่าน'} name={'password'}>
            <Input placeholder="กรอกรหัสผ่านของคุณ" />
          </Form.Item>
          <Form.Item label={'รหัสผ่านใหม่'} name={'newPassword'}>
            <Input placeholder="กรอกรหัสผ่านใหม่ของคุณ" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            ยืนยัน
          </Button>
        </Form>
      </Modal>
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <FormButtonsEdit
              form={form}
              titleModalSubmit="คุณต้องการแก้ไขข้อมูลผู้ใช้งาน ใช่หรือไม่?"
              contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
              titleModalReset="คุณต้องการเคลียร์ข้อมูลผู้ใช้งาน ใช่หรือไม่?"
              contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
              titleModalDelete="คุณต้องการลบข้อมูลผู้ใช้งาน ใช่หรือไม่?"
              contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
            />
            <Row gutter={24}>
              {renderEditForm.map((item: any, index: number) => (
                <DynamicForm
                  key={index}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  col={item.col}
                  icon={item.icon}
                  value={item.value}
                  rule={item.rule}
                  option={item.options}
                  disabled={item.disabled}
                  checked={item.checked}
                  maxLength={item.maxLength}
                  defaultValue={item.defaultValue}
                  isName={item.isName}
                  title={item.title}
                  description={item.description}
                  form={form}
                  checkedText={item.checkedText}
                  unCheckedText={item.unCheckedText}
                />
              ))}
            </Row>
          </Form>
          <Flex justify="end">
            <Button type="text" onClick={handleOpenModal}>
              เปลี่ยนรหัสผ่าน
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};
