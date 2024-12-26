'use server';

import { getSession } from '@/libs/lib';
import { redirect } from 'next/navigation';

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

  await fetch(`${base_url}/auth/signin/`, {
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
    })
    .catch((e) => console.log({ e }));

  await fetch(`${base_url}/auth/me/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      session.role = data.role;
      session.profile = data.profile;
    })
    .catch((e) => console.log({ e }));

  session.save();
  if (session.role.name === 'super_admin') {
    redirect('/superadmin');
  } else if (session.role.name === 'owner') {
    redirect('/admin');
  } else {
    redirect('/');
  }
};

export const loginT = async (data: any) => {
  const session = await getSession();

  const { user, password } = data;

  if (!user && !password) {
    return { error: 'Wrong Credentials!' };
  }

  const body = {
    user: user,
    password: password,
  };

  await fetch(`${base_url}/auth/signin/`, {
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
      console.log({ data });
    })
    .catch((e) => console.log({ e }));

  session.save();
  redirect('/');
};
