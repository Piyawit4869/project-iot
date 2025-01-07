import { base_url } from '@/constant/common';

export default async function getSingleWhitelists(id: string): Promise<any> {
  try {
    const accessToken = localStorage.getItem('accessToken');

    //query params in this
    const response = await fetch(`${base_url}/crud/whitelists/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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


export async function getWhitelists() {
  const url = `${base_url}/crud/whitelists/`;
  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}


