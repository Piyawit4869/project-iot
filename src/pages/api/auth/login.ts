'use server';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  console.log({ body });

  try {
    const response = await fetch(`${base_url}/auth/signin/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(response); // Logs the response object

    if (!response.ok) {
      return { error: `Login failed: ${response.statusText}` };
    }

    const data = await response.json(); // Parse JSON response

    console.log({ data }); // Logs the actual data

    return { data }; // Return the actual response data
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong!' };
  }
};
