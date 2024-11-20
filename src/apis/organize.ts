import client from './client';

//*API for Super Admin
export async function getAll(params?: any) {
  return client({
    method: 'GET',
    url: '/api/admin/organizations',
    params,
  });
}
export async function create(data: any) {
  return client({
    method: 'POST',
    url: '/api/admin/organizations',
    data,
  });
}
export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/admin/organizations/${id}`,
  });
}
export async function update(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/admin/organizations/${id}`,
    data,
  });
}
export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/admin/organizations/${id}`,
  });
}

export async function getUniqFields(params: any) {
  return client({
    method: 'GET',
    url: '/api/admin/organizations/find',
    params,
  });
}

export async function getBranchesWithOrrganiaztionId(id: any) {
  return client({
    method: 'GET',
    url: `/api/admin/organizations/${id}/branches`,
  });
}

//*API for Owner
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
