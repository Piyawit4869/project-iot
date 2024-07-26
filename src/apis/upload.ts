import client from './client';

export async function createImage(data: any) {
  return client({
    method: 'POST',
    url: '/api/upload',
    data,
  });
}
