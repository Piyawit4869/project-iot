import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function getAll() {
  const url = `${base_url}/crud/users/`;
  const auth = await getServerSession();

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
