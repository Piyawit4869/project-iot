import { ApiConfig } from "~/api/config";

export const fetchLoginlog = async (params: {
  page: number;
  limit: number;
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
