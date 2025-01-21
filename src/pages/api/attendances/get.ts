import { base_url } from '@/constant/common';

export default async function getSingleAttendance(id: string): Promise<any> {
  try {
    const accessToken = localStorage.getItem('accessToken');

    //query params in this
    const response = await fetch(`${base_url}/crud/attendances/daily-attendances/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNzQyNjg0NSwiZXhwIjoxNzM3Njg2MDQ1fQ.cGglgyxphCPaDeOV8eC7-ncVyB_4Rk8D4uBVr2iUV2E`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return {};
  }
} 


export async function getAttendance(){
  const url = `${base_url}/crud/attendances/daily-attendances/`;
  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNzQyNjg0NSwiZXhwIjoxNzM3Njg2MDQ1fQ.cGglgyxphCPaDeOV8eC7-ncVyB_4Rk8D4uBVr2iUV2E`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}