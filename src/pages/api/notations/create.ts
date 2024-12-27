import { base_url } from '@/constant/common';

export async function createNotation(prevState: any, formData: any) {
  const url = `${base_url}/crud/notations/create/`;

  const body = {
    ...formData,
  };

  const data = await fetch(url, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTI5NTQ4NywiZXhwIjoxNzM1NTU0Njg3fQ.F_8ywTFPX-9se7TC0svh9t6hy6998WLr0uFl5v1B7Xs`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
}
