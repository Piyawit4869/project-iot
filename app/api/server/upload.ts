"use server";

import axios from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_API_URL;

export const fetchUpload = async (formData: FormData) => {
  try {
    const res = await axios.post(`${baseURL}/upload`, formData);

    return res.data;
  } catch (error) {
    return error;
  }
};
