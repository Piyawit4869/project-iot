'use server';

import { base_url } from '@/constant/common';

export const login = async (prevState: any, formData: any) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Wrong Credentials!' };
  }

  const body = {
    user: username,
    password: password,
  };

  try {
    const response = await fetch(`${base_url}/auth/signin/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return { error: `Login failed: ${response.statusText}` };
    }

    const data = await response.json(); // Parse JSON response

    return { data }; // Return the actual response data
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong!' };
  }
};
