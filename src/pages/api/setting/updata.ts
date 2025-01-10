import { base_url } from '@/constant/common';

export async function updatesystem(prevState: any, formData: any) {
  const url = `${base_url}/crud/settings/update`;

  const body = {
    ...formData,
  };

  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: `PUT`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json;
}
