import { base_url } from '@/components/common/constant';

export async function createUser(prevState: any, formData: any) {
  const url = `${base_url}/crud/users/`;

  const body = {
    ...formData,
  };

  const data = await fetch(url, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTc4NDQ5MiwiZXhwIjoxNzM2MDQzNjkyfQ.4zCV41v3OgNzR-LnCsIQ7TZEml500t0kJ1UDt8ODKRQ`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
