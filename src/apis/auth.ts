import client from "./client";

export async function login(data: any) {
  return client({
    method: "POST",
    url: "/api/auth/signin",
    data,
  });
}

export async function refreshToken(data: any) {
  return client({
    method: "POST",
    url: "/api/auth/exchange-refresh-token",
    data,
  });
}
