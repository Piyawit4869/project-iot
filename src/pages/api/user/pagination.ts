// 'use server';

// import { useRouter } from 'next/router';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchNotationsParams {
  page: number;
  limit: number;
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
}: FetchNotationsParams): Promise<FetchNotationsResponse> {
  try {
    const accessToken = localStorage.getItem('accessToken');
    //query params in this
    const response = await fetch(`${base_url}/crud/users`, {
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
