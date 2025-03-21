import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function deleteUser(id: any) {
  const url = `${base_url}/crud/users/delete/${id}`;

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
