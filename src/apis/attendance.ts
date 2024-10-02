import { mockupAttendance } from '@src/pages/app/attendances/mockup-attendance';
import client from './client';

export async function getAll() {
  // return client({
  //   method: 'GET',
  //   url: '/api/crud/branches',
  //   params,
  // });

  //mockup
  const data = mockupAttendance.attendanceIndexData;
  return { data };
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
