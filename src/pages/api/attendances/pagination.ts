import { base_url } from '@/constant/common';

interface FetchAttendancesParams {
  page: number;
  limit: number;
  docNo?: string;
}

interface FetchAttendancesResponse {
  items: any[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export default async function pagination({
  page,
  limit,
  docNo,
}: FetchAttendancesParams): Promise<FetchAttendancesResponse> {
  try {
    const url = new URL(`${base_url}/crud/attendances/daily-attendances`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const accessToken = localStorage.getItem('accessToken');

    if (docNo) {
      url.searchParams.append('docNo', docNo);
    }

    const response = await fetch(url.toString(), {
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
    return {
      items: [],
      meta: {
        totalItems: 0,
        itemsPerPage: limit,
        totalPages: 0,
        currentPage: page,
      },
    };
  }
}
