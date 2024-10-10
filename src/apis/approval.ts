import client from './client';

export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/approvals',
    data,
  });
}

export async function pagination(params: any) {
  return client({
    method: 'GET',
    url: '/api/crud/approvals',
    params,
  });
}

export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/crud/approvals${id}`,
  });
}

export async function update(id: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/approvals/action/${id}`,
  });
}
