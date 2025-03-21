import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function update(prevState: any, formData: any, id: any) {
  const url = `${base_url}/crud/config-setting/edit/${id}`;

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
