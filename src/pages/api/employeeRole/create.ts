import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function createEmployeeRole(prevState: any, formData: any) {
  const url = `${base_url}/crud/employee-roles`;

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
