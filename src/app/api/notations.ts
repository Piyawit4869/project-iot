import * as lib from '@/lib';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function notationsLoader(params = {}) {
  // const url = new URL(request.url);
  // const query = url.searchParams;
  // const params = Object.fromEntries(query);
  const session = await lib.getSession();

  const queryString = new URLSearchParams(params).toString();
  const apiUrl = `${base_url}/crud/notations?${queryString}`;

  try {
    const data = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    console.log({ data });

    if (!data.ok) {
      throw new Error(`Error fetching notations: ${data.statusText}`);
    }

    return await data.json();
  } catch (error) {
    console.error('Error fetching notations:', error);
    return {};
  }
}

// export async function notationLoader({ params }: any) {
//   const session = await lib.getSession();

//   const apiUrl = `${base_url}/crud/notations/${params.id}`;

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session.accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error fetching notations: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching notations:', error);
//     return {};
//   }
// }

// export async function notationCreateAction() {}

// export async function notationSingleAction() {}
