import { base_url } from '@/constant/common';

export default async function createWhitelists(prevState: any, formData: any) {
  const url = `${base_url}/crud/whitelists/create/`;

  const body = {
    ...formData,
  };

  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
