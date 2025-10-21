import { ApiConfig } from "~/api/config";

export const fetchLoginlog = async (params: {
  page: number;
  limit: number;
  name?: string;
  email?: string;
  event?: string;
  createdFrom?: string;
  createdTo?: string;
}) => {
  try {
    const res = await ApiConfig.get(`/activities/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
        feature: "authentication",
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
