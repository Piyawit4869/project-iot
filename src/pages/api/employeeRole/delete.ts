import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function deleteemployeeRole(id: any) {
  const url = `${base_url}/crud/employee-roles/delete/${id}`;

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
