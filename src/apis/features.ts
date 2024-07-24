import client from './client';

export async function gets() {
  return client({
    method: 'GET',
    url: '/api/crud/contents/home/preview',
  });
}

export async function getAll() {
  return client({
    method: 'GET',
    url: '/api/crud/contents/preview',
  });
}

export async function get(id: any) {
  console.log(id);

  return client({
    method: 'GET',
    url: `/api/crud/contents/preview/${id}`,
  });
}

export async function create(data: any) {
  return client({
    method: 'POST',
    url: `/api/crud/contents`,
    data,
  });
}

export async function update(data: any, id: any) {
  return client({
    method: 'PUT',
    url: `/api/crud/contents/${id}`,
    data,
  });
}

export async function deleted(id: any) {
  return client({
    method: 'DELETE',
    url: `/api/crud/contents/${id}`,
  });
}
