import { base_url } from '@/constant/common';

interface FetchWhielistsParams {
  page: number;
  limit: number;
  docNo?: string;
}

interface FetchWhielistsResponse {
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
}: FetchWhielistsParams): Promise<FetchWhielistsResponse> {
  try {
    const url = new URL(`${base_url}/crud/whitelists`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBsb3llZVJvbGUiOiJvd25lciIsImlhdCI6MTczNTg3NTMwMSwiZXhwIjoxNzM2MTM0NTAxfQ.uDJ3Cam3hOcexLplqpji86Hl1dsxwwlB_pWgzqHdJio`,
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
