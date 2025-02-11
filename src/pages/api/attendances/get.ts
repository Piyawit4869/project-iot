import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export default async function getSingleAttendance(id: string): Promise<any> {
  try {
    const auth = await getServerSession();

    //query params in this
    const response = await fetch(`${base_url}/crud/attendances/${id}`, {
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

export async function getAttendance() {
  const url = `${base_url}/crud/attendances`;
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
