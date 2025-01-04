import { base_url } from '@/constant/common';

export async function changeStatusNotation(id: any, status: string) {
  const url = `${base_url}/crud/notations/status/${status}/${id}`;

  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: `PUT`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
