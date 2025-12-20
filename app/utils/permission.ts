import type {
  Permission,
  PermissionBaseAction,
} from "~/types/roles/permission";

export const getUserMapPermission = (
  user: any
): Record<string, string[]> | undefined => {
  if (!user || !user.permissions) return;

  const permissionItem: Record<string, string[]> = {};

  Object.values(user.permissions).forEach((permissionArray) => {
    if (!permissionArray || !Array.isArray(permissionArray)) return;
    permissionArray.length > 0 &&
      permissionArray.forEach((p: string) => {
        const [module, action] = p.split(":");
        if (!permissionItem[module]) {
          permissionItem[module] = [];
        }
        if (!permissionItem[module].includes(action)) {
          permissionItem[module].push(action);
        }
      });
  });

  return permissionItem;
};

export const getUserActionByPermission = (
  permission: Permission,
  module: string,
  action: PermissionBaseAction
): boolean => {
  if (!permission) return false;
  const actions = permission[module === "customer" ? "customer" : module];
  return Array.isArray(actions) && actions.includes(action);
};

export const keyToModuleMap: Record<string, string> = {
  home: "home",
  orders: "order",
  product: "product",
  messages: "chat",
  customer: "customer",
  employee: "user",
  "setting-organization": "setting",
  loginLog: "loginLog",
  inventory: "inventory",
  role: "roles",
  "on_boarding": "on_boarding",
};
