import { base_url } from '@/constant/common';

export async function changeStatusApproveWhitelists(id: any,status: string) {
  const url = `${base_url}/whitelists/edit-status-approved/${status}/${id}`;

  const accessToken = localStorage.getItem('accessToken');

  const data = await fetch(url, {
    method: `PATCH`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      // Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await data.json();
}

export async function changeStatusRejectWhitelists(id: any,status: string) {
    const url = `${base_url}/whitelists/edit-status-rejected/${status}/${id}`;
  
    const accessToken = localStorage.getItem('accessToken');
  
    const data = await fetch(url, {
      method: `PATCH`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        // Authorization: `Bearer ${session.accessToken}`,
      },
    });
  
    return await data.json();
  }
  