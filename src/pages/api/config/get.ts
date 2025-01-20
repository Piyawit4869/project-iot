import { base_url } from '@/constant/common';

export default async function getSingle(id: string): Promise<any> {
  try {
    const accessToken = localStorage.getItem('accessToken');

    //query params in this
    const response = await fetch(`${base_url}/crud/work-info/${id}`, {
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


export async function getAll() {
  const url = `${base_url}/crud/work-info/`;
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

export async function getUserWorkinfo() {
  const url = `${base_url}/crud/users/`;
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