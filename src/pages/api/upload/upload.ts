import { base_url } from '@/constant/common';
import { getServerSession } from '@/libs/auth';

export async function uploadFile(prevState: any, formData: FormData) {
  const url = `${base_url}/upload`;

  const auth = await getServerSession();

  const data = await fetch(url, {
    method: `POST`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  });

  return await data.formData();
}
