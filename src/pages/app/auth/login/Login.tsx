import React from 'react';
import { notification } from 'antd';
import { useActionData, useNavigate, useSubmit } from 'react-router-dom';

import { LoginForm } from '@forms';

export const LoginPage = () => {
  const submit = useSubmit();
  const action = useActionData() as any;
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    submit(values, { method: 'post' });
  };

  React.useEffect(() => {
    if (action && action.status) {
      const type = action.status as 'success' | 'error';

      notification[type]({
        message: action.message,
        placement: 'bottomRight',
        duration: 5,
      });

      if (action.status === 'success') {
        navigate('/');
      }
    }
  }, [action]);

  return (
    <div
      style={{ backgroundColor: '#FFF5ED', width: '100vw', height: '100vh' }}
    >
      <LoginForm onFinish={onSubmit} />
    </div>
  );
};
