export enum PermissionBaseAction {
  GET_ALL = "get_all",
  GET_SINGLE = "get_single",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type Permission = Record<string, string[]>;
