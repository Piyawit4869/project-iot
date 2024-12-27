'use server';

import { base_url } from '@/components/common/constant';

export async function usersLoader() {
  const url = `${base_url}/crud/users/`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MzUyNjYzMTUsImV4cCI6MTczNTI5NTExNX0.r-V8HwNazgmOt5MMHw4CpYzvmubPwVz6EOVkECNpqE8`,
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MzUyNjYzMTUsImV4cCI6MTczNTI5NTExNX0.r-V8HwNazgmOt5MMHw4CpYzvmubPwVz6EOVkECNpqE8`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
