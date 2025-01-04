import { base_url } from '@/components/common/constant';

export async function getWhitelists() {
  const url = `${base_url}/crud/whitelists/`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTgxMDMxOSwiZXhwIjoxNzM2MDY5NTE5fQ.libADF6cgdH8krEsIBhqc32AJjdiqnP3WQTJdPT7ENo`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  

  return await data.json();
}

export async function getSingleWhitelists() {
  const url = `${base_url}/whitelists/id`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTgxMDMxOSwiZXhwIjoxNzM2MDY5NTE5fQ.libADF6cgdH8krEsIBhqc32AJjdiqnP3WQTJdPT7ENo`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  

  return await data.json();
}


