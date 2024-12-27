import { base_url } from '@/constant/common';

interface FetchNotationsParams {
  page: number;
  limit: number;
  docNo?: string;
}

interface FetchNotationsResponse {
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
}: FetchNotationsParams): Promise<FetchNotationsResponse> {
  try {
    const url = new URL(`${base_url}/crud/notations`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    if (docNo) {
      url.searchParams.append('docNo', docNo);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM1ZmFlNS04NWRiLTQ1MzUtODkxYi1lYThkYmRhMzg3MzQiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MzUyNjcyNzIsImV4cCI6MTczNTI5NjA3Mn0.gbWesGioCYGY1dJ2X5L79iw_gjK3QkybXtaXbp7Fvuw`,
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
