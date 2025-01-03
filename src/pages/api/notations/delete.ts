import { base_url } from '@/constant/common';

export async function deleteNotation(id: any) {
  const url = `${base_url}/crud/notations/delete/${id}`;

  const data = await fetch(url, {
    method: `DELETE`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTg4MTAxMSwiZXhwIjoxNzM2MTQwMjExfQ.EliJjVqg8xcCWmXS3O8qqpOCxJW2WIl93gXxhbh0Igg`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}
