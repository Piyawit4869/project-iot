import { Form, notification, Row } from 'antd';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { DynamicForm } from '@src/forms';
import { renderEditForm } from './renderForm';
import vine, { errors } from '@vinejs/vine';
import { redirect, useLoaderData, useSubmit } from 'react-router-dom';
import * as API from '../../../apis';
import React from 'react';
import dayjs from 'dayjs';

export async function profileLoader() {
  const me = JSON.parse(localStorage.getItem('me') as any);
  try {
    const user = await API.user.get(me.id);

    return { user: user.data.data };
  } catch (error) {
    return { user: {}, error: 'error', message: error };
  }
}

export async function profileAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const me = JSON.parse(localStorage.getItem('me') as any);
  try {
    await API.user.edit(JSON.parse(submitData.data), me.id);
    notification['success']({
      message: 'แก้ไขข้อมูลผู้ใช้งานเสร็จสิ้น',
      placement: 'bottomRight',
      duration: 3,
    });
    return redirect(`/profile`);
  } catch (error) {
    notification['error']({
      message: 'แก้ไขข้อมูลผู้ใช้งานล้มเหลว',
      placement: 'bottomRight',
      duration: 3,
    });
    return {
      data: {
        action: 'edit',
        status: 'error',
        message: 'User Updated Failed !',
      },
    };
  }
}

export const ProfilePage: React.FC = () => {
  const { user } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();

  const schema = vine.object({
    userName: vine.string().optional(),
    active: vine.boolean(),
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

      await submit({ data: JSON.stringify(payload) }, { method: 'put' });
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
    if (user && user.profile?.birthDate) {
      birthDate = dayjs(user.profile?.birthDate);
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

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลของคุณ ใช่หรือไม่?"
          contentModalReset="ข้อมูลทของคุณจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการแก้ไขข้อมูล ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณแก้ไขจะถูกบันทึก"
        />
        <div style={{ height: '30px' }} />
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
    </>
  );
};

export default ProfilePage;
