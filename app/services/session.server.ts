// // app/services/session.server.ts
// import {
//   createCookieSessionStorage,
//   redirect,
//   type LoaderFunction,
//   type LoaderFunctionArgs,
// } from "react-router";
// import type { UsersFormValues } from "~/schemas/users/user";

// const USER_SESSION_KEY = "user";
// const ACCESS_TOKEN_KEY = "accessToken";
// const REFRESH_TOKEN_KEY = "refreshToken";

// type JwtPayload = { exp?: number; [k: string]: unknown };

// type User = { id: string; username: string; password: string };

// function decodeJwtExp(token?: string): number | undefined {
//   if (!token) return undefined;
//   try {
//     const [, payloadB64] = token.split(".");
//     if (!payloadB64) return undefined;
//     const json = Buffer.from(payloadB64, "base64url").toString("utf-8");
//     const data = JSON.parse(json) as JwtPayload;
//     return typeof data.exp === "number" ? data.exp : undefined; // exp in seconds (unix)
//   } catch {
//     return undefined;
//   }
// }

// export const sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "__session_rome_platform",
//     secrets: ["s3cret"],
//     sameSite: "lax",
//     path: "/",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   },
// });

// export const { commitSession, destroySession } = sessionStorage;

// const getUserSession = async (request: Request) => {
//   return await sessionStorage.getSession(request.headers.get("Cookie"));
// };

// export async function logout(request: Request) {
//   const session = await getUserSession(request);
//   return redirect("/", {
//     headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
//   });
// }

// export async function getUser(
//   request: Request
// ): Promise<UsersFormValues | undefined> {
//   const session = await getUserSession(request);
//   return session.get(USER_SESSION_KEY);
// }

// export async function getAccessToken(
//   request: Request
// ): Promise<string | undefined> {
//   const session = await getUserSession(request);
//   return session.get(ACCESS_TOKEN_KEY);
// }

// export async function createUserSession({
//   request,
//   user,
//   accessToken,
//   remember = true,
//   redirectUrl,
// }: {
//   request: Request;
//   user: UsersFormValues;
//   accessToken: string;
//   remember?: boolean;
//   redirectUrl?: string;
// }) {
//   const session = await getUserSession(request);
//   session.set(USER_SESSION_KEY, user);
//   session.set(ACCESS_TOKEN_KEY, accessToken);

//   return redirect(redirectUrl || "/", {
//     headers: {
//       "Set-Cookie": await sessionStorage.commitSession(session, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         // maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 วัน หรือ session-only

//         maxAge: 60,
//       }),
//     },
//   });
// }

// app/services/session.server.ts
import axios, { type AxiosRequestConfig } from "axios";
import { createCookieSessionStorage, redirect } from "react-router";
import type { UsersFormValues } from "~/schemas/users/user";

type JwtPayload = { exp?: number; [k: string]: unknown };

function decodeJwt(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, marginSeconds = 0): boolean {
  if (!token) return true;

  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp <= now + marginSeconds;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session_rome_platform",
    secrets: [`${process.env.SESSION_SECRET}`],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const { commitSession, destroySession } = sessionStorage;

const USER_SESSION_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// ---------- Utils ----------
export const getUserSession = async (request: Request) =>
  sessionStorage.getSession(request.headers.get("Cookie"));

function decodeJwtExp(token?: string): number | undefined {
  if (!token) return undefined;
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return undefined;
    const json = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const data = JSON.parse(json) as JwtPayload;
    return typeof data.exp === "number" ? data.exp : undefined;
  } catch {
    return undefined;
  }
}

function isExpSoon(expSec?: number, skewSec = 15): boolean {
  if (!expSec) return true;
  const nowSec = Math.floor(Date.now() / 1000);
  return expSec <= nowSec + skewSec;
}

// ---------- Public APIs ----------
export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export async function getUser(
  request: Request
): Promise<UsersFormValues | undefined> {
  const session = await getUserSession(request);
  return session.get(USER_SESSION_KEY);
}

export async function getAccessToken(request: Request): Promise<any> {
  const session = await getUserSession(request);
  return session.get(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(
  request: Request
): Promise<string | undefined> {
  const session = await getUserSession(request);
  return session.get(REFRESH_TOKEN_KEY);
}

type CreateUserSessionArgs<> = {
  request: Request;
  user: UsersFormValues;
  accessToken: string;
  refreshToken: string;
  remember?: boolean;
  redirectUrl?: string;
  refreshTokenMaxAgeSec?: number;
};

export async function createUserSession({
  request,
  user,
  accessToken,
  refreshToken,
  remember = true,
  redirectUrl,
  refreshTokenMaxAgeSec = 60 * 60 * 24 * 7, // 7 day
}: CreateUserSessionArgs) {
  const session = await getUserSession(request);
  session.set(USER_SESSION_KEY, user);
  session.set(ACCESS_TOKEN_KEY, accessToken);
  session.set(REFRESH_TOKEN_KEY, refreshToken);

  let maxAge: number | undefined;

  if (accessToken) {
    const decoded = decodeJwt(accessToken);

    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000);
      const remaining = decoded.exp - now;

      maxAge = remaining > 0 ? remaining : 60 * 60 * 24 * 7;
    } else {
      maxAge = 60 * 60 * 24 * 7; // default 7 days
    }
  }

  return redirect(redirectUrl || "/", {
    headers: {
      "Set-Cookie": await commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: remember ? refreshTokenMaxAgeSec : maxAge,
      }),
    },
  });
}

async function callRefreshTokenApi(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken?: string;
}> {
  const { data } = await axios.post(
    process.env.PUBLIC_API_URL + "/auth/exchange-refresh-token",
    {
      headers: { "Content-Type": "application/json" },
      body: refreshToken,
    }
  );

  if (!data.ok) {
    throw new Error("Refresh token failed");
  }
  return data.json();
}

export async function ensureAccessToken(request: Request): Promise<{
  accessToken?: string;
  headers?: HeadersInit;
}> {
  const session = await getUserSession(request);
  let accessToken: string | undefined = session.get(ACCESS_TOKEN_KEY);
  const refreshToken: string | undefined = session.get(REFRESH_TOKEN_KEY);

  const exp = decodeJwtExp(accessToken);
  const needRefresh = !accessToken || isExpSoon(exp, 15);

  if (needRefresh) {
    if (!refreshToken) {
      return { accessToken: undefined };
    }

    const refreshed = await callRefreshTokenApi(refreshToken);
    accessToken = refreshed.accessToken;

    session.set(ACCESS_TOKEN_KEY, refreshed.accessToken);
    if (refreshed.refreshToken) {
      session.set(REFRESH_TOKEN_KEY, refreshed.refreshToken);
    }

    return {
      accessToken,
      headers: { "Set-Cookie": await commitSession(session) },
    };
  }

  return { accessToken };
}

export async function serverApi(
  request: Request,
  url: string,
  config: AxiosRequestConfig = {}
) {
  const ensured = await ensureAccessToken(request);
  if (!ensured.accessToken) {
    throw await logout(request);
  }

  const setCookieHeaders = ensured.headers;

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${ensured.accessToken}`,
    },
    // เพิ่ม option เพื่อให้ axios โยน error เมื่อสถานะ >= 400
    // validateStatus: () => true,
  };

  const res = await axios(url, axiosConfig);

  if (res.status === 401) {
    throw await logout(request);
  }

  return { res, headers: setCookieHeaders };
}
