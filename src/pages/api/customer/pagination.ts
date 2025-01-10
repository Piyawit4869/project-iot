import { base_url } from '@/constant/common';

interface FetchTemplatesParams {
  page: number;
  limit: number;
  firstName?: string;
  companyName?: string;
  contactEmail?: string;
  taxId?: string;
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
}: FetchTemplatesParams): Promise<FetchTemplatesResponse> {
  try {
    const url = new URL(`${base_url}/crud/customers`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const accessToken = localStorage.getItem('accessToken');

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
