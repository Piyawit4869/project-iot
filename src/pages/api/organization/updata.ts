import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function updatesystem(prevState: any, formData: any) {
  const url = `${base_url}/crud/settings/update`;

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

  return await data.json;
}
