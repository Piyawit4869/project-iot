// 'use server';
import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

// import { useRouter } from 'next/router';

interface FetchRoleParams {
  page: number;
  limit: number;
}

interface FetchRoleResponse {
  items: {
    items: any[];
    meta: {
      totalItems: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export default async function pagination({
  page,
  limit,
}: FetchRoleParams): Promise<FetchRoleResponse> {
  try {
    const url = new URL(`${base_url}/crud/roles/paginate`);
    url.searchParams.append('page', page?.toString());
    url.searchParams.append('limit', limit?.toString());

    const auth = await getServerSession();
    //query params in this
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
      items: {
        items: [],
        meta: {
          totalItems: 0,
          itemsPerPage: limit,
          totalPages: 0,
          currentPage: page,
        },
      },
    };
  }
}
