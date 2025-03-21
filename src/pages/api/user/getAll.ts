import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function getAll() {
  const url = `${base_url}/crud/users/`;
  const auth = await getServerSession();

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}

export async function countUser() {
  const url = `${base_url}/crud/users/count/`;
  const auth = await getServerSession();

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
