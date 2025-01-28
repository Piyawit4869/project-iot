import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function changeStatusApproveWhitelists(id: any) {
  const url = `${base_url}/crud/whitelists/edit-status-approved/${id}`;

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `PATCH`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}

export async function changeStatusRejectWhitelists(id: any) {
  const url = `${base_url}/crud/whitelists/edit-status-rejected/${id}`;

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `PATCH`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
