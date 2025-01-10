import { base_url } from '@/constant/common';

interface FetchTemplatesParams {
  page?: number;
  limit?: number;
  templateName?: string;
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

export default async function pagination({
  page,
  limit,
  templateName,
  isAll,
}: FetchTemplatesParams): Promise<FetchTemplatesResponse> {
  try {
    const url = new URL(`${base_url}/crud/configure-notations`);

    const accessToken = localStorage.getItem('accessToken');

    if (page) {
      url.searchParams.append('page', String(page));
    }

    if (limit) {
      url.searchParams.append('limit', String(limit));
    }

    if (templateName) {
      url.searchParams.append('templateName', templateName);
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
