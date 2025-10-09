import { ApiConfig } from "~/api/config";

export const getInventoryPaginate = async (params: {
  page?: number;
  limit?: number;
  status: string;
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;
    if (params.status && params.status !== "all") {
      p.status = params.status;
    }

    const { data } = await ApiConfig.get(`/crud/inventories/paginate`, {
      params: p,
    });
    return data;
  } catch (error) {
    return error;
  }
};
export const getInventories = async () => {
  try {
    const response = await ApiConfig.get(`/crud/inventories`);
    return response.data.res;
  } catch (error) {
    return error;
  }
};

export const getInventory = async (id: string) => {
  try {
    const response = await ApiConfig.get(`/crud/inventories/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createInventory = async (body: object) => {
  try {
    const response = await ApiConfig.post("/crud/inventories/create", body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateInventory = async (id: string, body: object) => {
  try {
    const response = await ApiConfig.put(`/crud/inventories/edit/${id}`, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteInventory = async (id: string) => {
  try {
    const response = await ApiConfig.delete(`/crud/inventories/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchInventorysSummary = async () => {
  try {
    const res = await ApiConfig.get(`/crud/inventories/status-summary`);

    return res.data;
  } catch (error) {
    return error;
  }
};
