import * as API from '@src/apis';

export async function LoginAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  try {
    const { data } = await API.auth.login(submitData);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return { message: 'Welcome to Stay Organize', status: 'success' };
  } catch (e: any) {
    return { message: 'Invalid email or password', status: 'error' };
  }
}
