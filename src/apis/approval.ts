import client from './client';

export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/approvals/submit',
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

export async function updateStatus(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/approvals/action/${id}`,
    data,
  });
}

export async function resend(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/approvals/submit/${id}`,
    data,
  });
}
