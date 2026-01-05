import React from "react";
import { useCallback, useState } from "react";

export type NotificationPermissionState = "default" | "granted" | "denied";

export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermissionState>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  const checkAndRequestNotification =
    useCallback(async (): Promise<boolean> => {
      if (typeof Notification === "undefined") {
        setPermission("denied");
        return false;
      }

      // already allowed
      if (Notification.permission === "granted") {
        setPermission("granted");
        return true;
      }

      // already denied
      if (Notification.permission === "denied") {
        setPermission("denied");
        return false;
      }

      // request permission (must be user action)
      const result = await Notification.requestPermission();
      setPermission(result);

      return result === "granted";
    }, []);

  const requestNotification = React.useCallback(async (): Promise<boolean> => {
    if (typeof Notification === "undefined") {
      setPermission("denied");
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result); // 🔥 จุดสำคัญ

    return result === "granted";
  }, []);

  return {
    permission, // "default" | "granted" | "denied"
    checkAndRequestNotification, // async () => boolean
    requestNotification,
  };
}
