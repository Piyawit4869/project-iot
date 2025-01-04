import { base_url } from '@/constant/common';

export async function deleteUser(id: any) {
  const url = `${base_url}/crud/users/delete/${id}`;

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
