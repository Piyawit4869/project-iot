// 'use server';
import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

// import { useRouter } from 'next/router';

interface FetchEmployeeRoleParams {
  page?: number;
  limit?: number;
  isAll?: boolean;
}

interface FetchEmployeeRoleResponse {
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
  isAll,
}: FetchEmployeeRoleParams): Promise<FetchEmployeeRoleResponse> {
  try {
    const url = new URL(`${base_url}/crud/employee-roles/paginate`);

    const auth = await getServerSession();

    if (page) {
      url.searchParams.append('page', String(page));
    }

    if (limit) {
      url.searchParams.append('limit', String(limit));
    }

    if (isAll) {
      url.searchParams.append('isAll', String(isAll));
    }

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
          itemsPerPage: 10,
          totalPages: 0,
          currentPage: 1,
        },
      },
    };
  }
}
