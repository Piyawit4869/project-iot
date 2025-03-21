import { base_url } from '@/helpers/common';

export default async function Update(id: string, formData: any): Promise<any> {
  try {
    const body = {
      ...formData,
    };
    //query params in this
    const response = await fetch(`${base_url}/crud/notations/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTc4NDQ5MiwiZXhwIjoxNzM2MDQzNjkyfQ.4zCV41v3OgNzR-LnCsIQ7TZEml500t0kJ1UDt8ODKRQ`,
      },
      body: JSON.stringify(body),
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
