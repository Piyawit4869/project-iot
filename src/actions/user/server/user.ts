"use server";

import axios from "axios";

export const fetchUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data;
};
