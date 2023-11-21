import client from "./client";

export async function gets() {
  return client({
    method: "GET",
    url: "/api/crud/contents/home/preview",
  });
}

export async function getAll() {
  return client({
    method: "GET",
    url: "/api/crud/contents/preview",
  });
}

export async function get(id: any) {
  console.log(id);

  return client({
    method: "GET",
    url: `/api/crud/contents/preview/${id}`,
  });
}
