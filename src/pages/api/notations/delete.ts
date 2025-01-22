import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function deleteNotation(id: any) {
  const url = `${base_url}/crud/notations/delete/${id}`;

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `DELETE`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  return await data.json();
}
