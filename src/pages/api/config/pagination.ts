import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

interface FetchSettingParams {
  page: number;
  limit: number;
  name?: string;
  status?: string;
}

interface FetchSettingResponse {
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
}: FetchSettingParams): Promise<FetchSettingResponse> {
  try {
    const url = new URL(`${base_url}/crud/config-setting/`);
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
