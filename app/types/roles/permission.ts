export enum PermissionBaseAction {
  GET_ALL = "get_all",
  GET_SINGLE = "get_single",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  GET_MENU = "get_menu",
}

export type Permission = Record<string, string[]>;
