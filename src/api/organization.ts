import * as lib from '@/helpers/lib';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function organizationsLoader() {
  const session = await lib.getSession();

  const data = await fetch(`${base_url}/backoffice/organizations/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}

export async function organizationLoader(id: string) {
  const session = await lib.getSession();

  const data = await fetch(`${base_url}/backoffice/organizations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
