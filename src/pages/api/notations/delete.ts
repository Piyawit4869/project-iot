import { base_url } from '@/constant/common';

export async function deleteNotation(id: any) {
  const url = `${base_url}/crud/notations/delete/${id}`;

  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: `DELETE`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await data.json();
}
