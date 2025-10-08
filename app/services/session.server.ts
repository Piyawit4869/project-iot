// app/services/session.server.ts
import { createCookieSessionStorage, redirect } from "react-router";

type User = { id: string; username: string; password: string };

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session_rome_platform",
    secrets: ["s3cret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const { commitSession, destroySession } = sessionStorage;

const getUserSession = async (request: Request) => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

const USER_SESSION_KEY = "userId";
const ACCESS_TOKEN_KEY = "accessToken";

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getUserSession(request);
  return session.get(USER_SESSION_KEY);
}

export async function getAccessToken(
  request: Request
): Promise<string | undefined> {
  const session = await getUserSession(request);
  return session.get(ACCESS_TOKEN_KEY);
}

export async function createUserSession({
  request,
  userId,
  accessToken,
  remember = true,
  redirectUrl,
}: {
  request: Request;
  userId: string;
  accessToken: string;
  remember?: boolean;
  redirectUrl?: string;
}) {
  const session = await getUserSession(request);
  session.set(USER_SESSION_KEY, userId);
  session.set(ACCESS_TOKEN_KEY, accessToken);

  return redirect(redirectUrl || "/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 วัน หรือ session-only
      }),
    },
  });
}
