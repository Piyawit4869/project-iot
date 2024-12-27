import { base_url } from '@/components/common/constant';

export async function whitelistsLoader() {
  const url = `${base_url}/crud/whitelists/`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTI5MzkzNywiZXhwIjoxNzM1NTUzMTM3fQ.jlmRXHuHv8G-26L08hjG59m5nLQN-2BUKhmu1R2TKUU`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
