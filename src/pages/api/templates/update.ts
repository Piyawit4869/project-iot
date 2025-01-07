import { base_url } from '@/constant/common';

export async function updateTemplate(prevState: any, formData: any, id: any) {
  const url = `${base_url}/crud/configure-notations/edit/${id}`;

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

  return await data.json();
}
