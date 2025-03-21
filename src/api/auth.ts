'use server';

import { getSession } from '@/helpers/lib';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (prevState: any, formData: any) => {
  const session = await getSession();

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username && !password) {
    return { error: 'Wrong Credentials!' };
  }

  const body = {
    user: username,
    password: password,
  };

  const data = await fetch(`${base_url}/auth/signin/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      session.accessToken = data.accessToken;
      session.refreshToken = data.refreshToken;

      return data;
    });

  session.save();

  return { data };
};
