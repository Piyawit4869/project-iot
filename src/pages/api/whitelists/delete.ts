import { base_url } from '@/constant/common';

export default async function updateWhitelists(prevState: any, formData: any) {
  const url = `${base_url}/crud/whitelists/`;

  const body = {
    ...formData,
  };

  const data = await fetch(url, {
    method: `DELETE`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTg5Mzg2MywiZXhwIjoxNzM2MTUzMDYzfQ.aI64GV1BjrvDGscbiq_UOhea3b0KvsafeH1l4iKeTzE`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
