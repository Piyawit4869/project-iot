import client from './client';

export async function login(data: any) {
  return client({
    method: 'POST',
    url: '/api/auth/signin',
    data,
  });
}

export async function refreshToken(data: any) {
  return client({
    method: 'POST',
    url: '/api/auth/exchange-refresh-token',
    data,
  });
}

export async function adminLogin(data: any) {
  return client({
    method: 'POST',
    url: '/api/auth/signin',
    data,
  });
}

export async function loginWithGoogle(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/users/auth-code/',
    data,
  });
}
