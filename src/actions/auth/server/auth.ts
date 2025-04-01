import axios from "axios";

const romeApiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (
  user: string | undefined,
  password: string | undefined
) => {
  const res = await axios.post(`${romeApiBaseURL}/api/auth/signin`, {
    user,
    password,
  });
  return res.data;
};
