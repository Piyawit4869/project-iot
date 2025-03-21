import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function createItem(prevState: any, formData: any) {
  const url = `${base_url}/crud/items/create`;

  const body = {
    ...formData,
  };

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
