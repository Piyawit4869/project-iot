import * as API from "../../../apis";

export async function organizeLoader() {
    try {
      const organize = await API.organize.getAll();
      return { organize: organize.data.items };
    } catch (error) {
      return { error: "error", message: error };
    }
  }
