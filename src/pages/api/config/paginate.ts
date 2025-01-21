import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

interface FetchWorkInfoParams {
  page: number;
  limit: number;
  name?: string;
  status?: string;
}

interface FetchWorkInfoResponse {
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
  name,
  status,
}: FetchWorkInfoParams): Promise<FetchWorkInfoResponse> {
  try {
    const url = new URL(`${base_url}/crud/work-info`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const auth = await getServerSession();

    if (name) {
      url.searchParams.append('name', name);
    }
    if (status) {
      url.searchParams.append('status', status);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
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
