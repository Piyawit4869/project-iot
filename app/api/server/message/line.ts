import { ApiConfig } from "~/api/config";

//card message

export const getLineCardMessagePaginate = async () => {
  try {
    const res = await ApiConfig.get(`/thridparty/line/content-card/paginate`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getLineDetail = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/thridparty/line/contents/${id}`);

    return res.data;
  } catch (error) {
    return error;
  }
};

//reply message
