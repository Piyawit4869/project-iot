import { ApiConfig } from "~/api/config";

export const getCategoryPaginate = async (params: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await ApiConfig.get(`/crud/categories/paginate`, {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });
    return res.data.res;
  } catch (error) {
    return error;
  }
};

export const getCategories = async () => {
  try {
    const res = await ApiConfig.get(`/crud/categories/search`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await ApiConfig.get(`/crud/categories/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCategory = async (body: object) => {
  try {
    const response = await ApiConfig.post("/crud/categories/create", body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCategory = async (id: string, body: object) => {
  try {
    const response = await ApiConfig.put(`/crud/categories/edit/${id}`, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await ApiConfig.delete(`/crud/delete/categories/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
