"use client";

import { useEffect } from "react";

import { useNotificationStore } from "@/stores/notificationStore";

export default function NotificationCenter() {
  const notifications =
    useNotificationStore(
      (s) => s.notifications
    );

  const removeNotification =
    useNotificationStore(
      (s) => s.removeNotification
    );

  useEffect(() => {
    notifications.forEach(
      (notification) => {
        const timer =
          setTimeout(() => {
            removeNotification(
              notification.id
            );
          }, 5000);

        return () =>
          clearTimeout(timer);
      }
    );
  }, [
    notifications,
    removeNotification,
  ]);

  return (
    <div
      style={{
        position: "fixed",
        top: 90,
        right: 20,
        zIndex: 99999,

        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {notifications
        .slice(0, 5)
        .map((notification) => (
          <div
            key={notification.id}
            style={{
              width: 420,

              padding:
                "16px 20px",

              borderRadius: 18,

              background:
                "rgba(15,23,42,0.95)",

              border:
                "1px solid rgba(124,58,237,0.35)",

              color: "white",

              backdropFilter:
                "blur(20px)",

              boxShadow:
                "0 0 35px rgba(124,58,237,0.25)",

              fontSize: 15,

              fontWeight: 600,
            }}
          >
            🔔 {notification.message}
          </div>
        ))}
    </div>
  );
}