import client from "./client";

export async function getMe() {
  return client({
    method: "GET",
    url: `/api/auth/me`,
  });
}

export async function paginate(params?: any) {
  return client({
    method: "GET",
    url: `/api/crud/users`,
    params,
  });
}

export async function get(id: any) {
  return client({
    method: "GET",
    url: `/api/users/${id}`,
  });
}

export async function create(data: any) {
  return client({
    method: "POST",
    url: `/api/crud/users/create`,
    data,
  });
}

export async function edit(data: any, id?: any) {
  return client({
    method: "PUT",
    url: `/api/crud/users/edit/${id}`,
    data,
  });
}

export async function deleted(id?: any) {
  return client({
    method: "DELETE",
    url: `/api/crud/users/delete/${id}`,
  });
}

export function getAll() {
  throw new Error('Function not implemented.');
}
