import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export default async function getSingle(id: string): Promise<any> {
  try {
    const auth = await getServerSession();

    //query params in this
    const response = await fetch(`${base_url}/crud/config-setting/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export async function getAll() {
  const url = `${base_url}/crud/config-setting/`;
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
