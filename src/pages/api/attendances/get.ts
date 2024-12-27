import { base_url } from '@/constant/common';

export default async function get(): Promise<any> {
  console.log('await');
  try {
    const response = await fetch(`${base_url}/attendances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTI4OTgxMSwiZXhwIjoxNzM1NTQ5MDExfQ.h-5zAbbhox5bWLpFk2wCTnTPSIrgeIeeKsubImoxE78`,
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
