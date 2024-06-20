import * as API from "../../../apis"

export async function organizeSingleLoader() {
  const me = JSON.parse(localStorage.getItem("me")as any)

  try {
    const organize = await API.organize.get(me.organizationId);
    console.log({organize})
    return { organize: organize.data.data };
  } catch (error) {
    return { error: "error", message: error };
  }
}
  