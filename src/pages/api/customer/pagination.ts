import { base_url } from '@/constant/common';

interface FetchTemplatesParams {
  page?: number;
  limit?: number;
  firstName?: string;
  companyName?: string;
  contactEmail?: string;
  taxId?: string;
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

export default async function paginationCustomers({
  page,
  limit,
  firstName,
  companyName,
  contactEmail,
  taxId,
  isAll,
}: FetchTemplatesParams): Promise<FetchTemplatesResponse> {
  try {
    const url = new URL(`${base_url}/crud/customers`);

    const accessToken = localStorage.getItem('accessToken');

    if (page) {
      url.searchParams.append('page', String(page));
    }

    if (limit) {
      url.searchParams.append('limit', String(limit));
    }

    if (firstName) {
      url.searchParams.append('firstName', firstName);
    }
    if (companyName) {
      url.searchParams.append('companyName', companyName);
    }
    if (contactEmail) {
      url.searchParams.append('contactEmail', contactEmail);
    }
    if (taxId) {
      url.searchParams.append('taxId', taxId);
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
