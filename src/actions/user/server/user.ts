import axios from "axios";

export const fetchMe = async () => {
  const res = await axios.get("/api/auth/me");
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get("/api/users");
  return res.data;
};
