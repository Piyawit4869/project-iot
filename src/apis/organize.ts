import client from './client';

export async function getAll(params?: any) {
  return client({
    method: 'GET',
    url: '/api/crud/organizations',
    params,
  });
}
export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/crud/organizations',
    data,
  });
}
export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/crud/organizations/${id}`,
  });
}
export async function update(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/organizations/${id}`,
    data,
  });
}
export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/organizations/${id}`,
  });
}

export async function getSetting() {
  return client({
    method: 'GET',
    url: '/api/crud/settings',
  });
}

export async function updateSystem(data: any) {
  return client({
    method: 'PUT',
    url: '/api/crud/settings/update',
    data,
  });
}
