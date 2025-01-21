import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function updateItem(prevState: any, formData: any, id: any) {
  const url = `${base_url}/crud/items/edit/${id}`;

  const body = {
    ...formData,
  };

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `PUT`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
