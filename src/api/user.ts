'use server';

import { base_url } from '@/components/common/constant';

export async function usersLoader() {
  const url = `${base_url}/crud/users/`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTc4NDQ5MiwiZXhwIjoxNzM2MDQzNjkyfQ.4zCV41v3OgNzR-LnCsIQ7TZEml500t0kJ1UDt8ODKRQ`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}

export async function singleUserLoader(id: string) {
  const url = `${base_url}/crud/users/${id}`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTc4NDQ5MiwiZXhwIjoxNzM2MDQzNjkyfQ.4zCV41v3OgNzR-LnCsIQ7TZEml500t0kJ1UDt8ODKRQ`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
