import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function changeStatusNotation(id: any, status: string) {
  const url = `${base_url}/crud/notations/status/${status}/${id}`;

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `PUT`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
