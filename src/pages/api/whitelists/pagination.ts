import { base_url } from '@/constant/common';

interface FetchWhitelistsParams {
  page: number;
  limit: number;
  ip?: string;
  status?: string;
}

interface FetchWhitelistsResponse {
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
  ip,
  status,
}: FetchWhitelistsParams): Promise<FetchWhitelistsResponse> {
  try {
    const url = new URL(`${base_url}/crud/whitelists`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const accessToken = localStorage.getItem('accessToken');

    if (ip) {
      url.searchParams.append('ip', ip);
    }
    if (status) {
      url.searchParams.append('status', status);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
