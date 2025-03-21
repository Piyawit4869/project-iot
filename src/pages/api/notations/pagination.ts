import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

interface FetchNotationsParams {
  page: number;
  limit: number;
  docNo?: string;
  docName?: string;
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
  docName,
}: FetchNotationsParams): Promise<FetchNotationsResponse> {
  try {
    const url = new URL(`${base_url}/crud/notations`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const auth = await getServerSession();

    if (docNo) {
      url.searchParams.append('docNo', docNo);
    }

    if (docName) {
      url.searchParams.append('docName', docName);
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
