import { base_url } from '@/constant/common';

export default async function get(id: string): Promise<any> {
  try {
    //query params in this
    const response = await fetch(`${base_url}/crud/notations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjY2M5MTZjNC0zNTdjLTQyMDQtODA1Ni03MDI4ZGRjMzRjN2IiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3MzUxODIxMDAsImV4cCI6MTczNTIxMDkwMH0.7Z_f8EbgqixOXqKd0i4KmXwpWIIG7p07W0aXuBHCOq8`,
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
