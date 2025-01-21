import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function deleteTemplate(id: any) {
  const url = `${base_url}/crud/configure-notations/delete/${id}`;

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
