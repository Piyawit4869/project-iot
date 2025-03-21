import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function statusApproved(id: any) {
  const url = `${base_url}/crud/whitelists/edit-status-approved/${id}`;

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

export async function statusRejected(id: any) {
  const url = `${base_url}/crud/whitelists/edit-status-rejected/${id}`;

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
