import client from './client';

export async function getMe() {
  return client({
    method: 'GET',
    url: `/api/auth/me`,
  });
}

export async function paginate(params?: any) {
  return client({
    method: 'GET',
    url: `/api/crud/users`,
    params,
  });
}

export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/crud/users/${id}`,
  });
}

export async function create(data: any) {
  return client({
    method: 'POST',
    url: `/api/crud/users`,
    data,
  });
}

export async function edit(data: any, id?: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/users/${id}`,
    data,
  });
}

export async function deleted(id?: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/users/${id}`,
  });
}

export async function resetPassword(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/users/${id}/change-password`,
    data,
  });
}
