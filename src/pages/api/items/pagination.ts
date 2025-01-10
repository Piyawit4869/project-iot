import { base_url } from '@/constant/common';

interface FetchTemplatesParams {
  page?: number;
  limit?: number;
  name?: string;
  isAll?: boolean;
}

interface FetchTemplatesResponse {
  items: any[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export default async function paginationItems({
  page,
  limit,
  name,
  isAll,
}: FetchTemplatesParams): Promise<FetchTemplatesResponse> {
  try {
    const url = new URL(`${base_url}/crud/items`);

    const accessToken = localStorage.getItem('accessToken');

    if (name) {
      url.searchParams.append('name', name);
    }
    if (page) {
      url.searchParams.append('page', String(page));
    }

    if (limit) {
      url.searchParams.append('limit', String(limit));
    }

    if (isAll) {
      url.searchParams.append('isAll', String(isAll));
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
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}
