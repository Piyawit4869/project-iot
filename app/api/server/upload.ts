"use server";

import { ApiConfig } from "../config";

export const fetchUpload = async (formData: FormData) => {
  try {
    const res = await ApiConfig.post(`/upload`, formData);

    return res.data;
  } catch (error) {
    return error;
  }
};
