import client from "./client";

export async function get(id: any) {
  return client({
    method: "GET",
    url: `/api/users/${id}`,
  });
}

export async function paginate(params?: any) {
  return client({
    method: "GET",
    url: `/api/crud/users`,
    params,
  });
}
