import client from './client';

export async function _getAll(id: any) {
  return client({
    method: 'GET',
    url: `/api/attendances/work-info/${id}`,
  });
}
export async function getAllWorkInfo(params?: any) {
  return client({
    method: 'GET',
    url: '/api/crud/work-info/',
    params,
  });
}

export async function create(data: any) {
  return client({
    method: 'POST',
    url: `/api/crud/work-info`,
    data,
  });
}
export async function get(id: any) {
  return client({
    method: 'GET',
    url: `/api/crud/work-info/${id}`,
  });
}
export async function update(id: any, data: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/work-info/${id}`,
    data,
  });
}
export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/branches/${id}`,
  });
}

export async function getCurrentWorkInfo() {
  return client({
    method: 'GET',
    url: '/api/crud/work-info/current',
  });
}

export async function attendanceAction(data: any) {
  return client({
    method: 'POST',
    url: '/api/attendances',
    data,
  });
}

//attendances
