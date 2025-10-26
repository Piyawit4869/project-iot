import { ApiConfig } from "~/api/config";

export const getInventoryPaginate = async (params: {
  page?: number;
  limit?: number;
  status: string;
  name?: string;
  productCount?: string;
  productCanSale?: string;
  createdBy?: string;
  updatedBy?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}) => {
  try {
    const p = { ...params } as any;
    if (params.status && params.status === "all") {
      delete p.status;
    }
    const res = await ApiConfig.get(`/crud/inventories/paginate`, {
      params: p,
    });

    return res.data;
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

export const fetchInventoryAiById = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/inventories/ai-collects/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAnalyzeInventory = async (id: string) => {
  try {
    // const res = await ApiConfig.get(
    //   `/crud/inventories/${id}/summary-chat-message
    //    `
    // );
    const res = await ApiConfig.get(
      `
       `
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
