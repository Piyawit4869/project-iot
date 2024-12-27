import { base_url } from '@/components/common/constant';

export async function usersLoader() {
  const url = `${base_url}/crud/users/`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTdjZGU5Zi0xMTk2LTQ3NTktODM1Mi00OWM5NzE4ZDBjMzciLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3MzUxODIzNjIsImV4cCI6MTczNTIxMTE2Mn0.FertygNPSmM8GgmWEx4aW3K9bVhv9s9obdXKoTb9uOA`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
