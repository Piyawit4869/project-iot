import { base_url } from '@/components/common/constant';

export async function usersLoader() {
  const url = `${base_url}/crud/users`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTdjZGU5Zi0xMTk2LTQ3NTktODM1Mi00OWM5NzE4ZDBjMzciLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3MzUxMjE3MDUsImV4cCI6MTczNTE1MDUwNX0.XABGnJMJzoRBCBSucvcLhY4Gyl_mBnYx1x48Pg6JUd0`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
