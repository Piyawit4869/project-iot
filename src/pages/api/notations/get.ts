import { base_url } from '@/constant/common';

export default async function get(id: string): Promise<any> {
  try {
    //query params in this
    const response = await fetch(`${base_url}/crud/notations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MzUyMTc1NzMsImV4cCI6MTczNTI0NjM3M30.lMkjLcG2GiT-UYfzyh1v9dOWck1tZtgLZQOv5UKzq_E`,
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
