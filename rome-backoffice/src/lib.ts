import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
  role?: any;
  profile?: any;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: 'rome-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};

export const getSession = async () => {
  const cookiesStore: any = cookies();
  const session = await getIronSession<SessionData>(
    // await cookiesStore,
    cookiesStore,
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  baseUrl: string | undefined; // API Base URL
  endpoint: string; // Endpoint for the API
  method: HttpMethod; // HTTP method
  headers?: Record<string, string>; // Custom headers
  body?: any; // Request body for POST/PUT
  token?: string; // Optional Bearer token
  params?: any;
}

export async function apiRequest<T = any>({
  baseUrl,
  endpoint,
  method,
  headers = { 'Content-Type': 'application/json' },
  body,
  token,
  params,
}: FetchOptions): Promise<T> {
  const session = await getSession();
  try {
    // Build query string from params if provided
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params).reduce((acc: any, [key, value]) => {
            acc[key] = value?.toString();
            return acc;
          }, {} as Record<string, string>),
        ).toString()
      : '';

    const url = `${baseUrl}${endpoint}${queryString}`;

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.statusText}`,
      );
    }

    // Automatically parse the response as JSON
    return response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}
