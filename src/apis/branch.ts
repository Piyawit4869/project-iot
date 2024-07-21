import client from './client';

export async function getAll(params?: any) {
  return client({
    method: 'GET',
    url: '/api/crud/branches',
    params,
  });
}
export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/branches',
    data,
  });
}
export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/crud/branches/${id}`,
  });
}
export async function update(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/branches/${id}`,
    data,
  });
}
export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/branches/${id}`,
  });
}
