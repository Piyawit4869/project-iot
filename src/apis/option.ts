import client from './client';

export async function getAll() {
  return client({
    method: 'GET',
    url: '/api/crud/contents/options',
  });
}
