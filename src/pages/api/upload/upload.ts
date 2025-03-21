import { base_url } from '@/helpers/common';
import { getServerSession } from '@/helpers/auth';

export async function uploadFile(prevState: any, formData: FormData) {
  const url = `${base_url}/upload`;

  const auth = await getServerSession();

  const response = await fetch(url, {
    method: `POST`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from external API');
  }

  const result = await response.json();
  return result;
}
