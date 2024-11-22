import client from './client';

export async function pagination(params: any) {
  return client({
    method: 'GET',
    url: '/api/crud/notations',
    params,
  });
}

export async function get(id: any) {
  return client({ method: 'GET', url: `/api/crud/notations/${id}` });
}

export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/notations',
    data,
  });
}

export async function update(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/notations/${id}`,
    data,
  });
}

export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/notations/${id}`,
  });
}
