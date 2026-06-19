import { create } from "zustand";

export interface Notification {
  id: string;
  message: string;
  createdAt: number;
}

interface NotificationStore {
  notifications: Notification[];

  addNotification: (
    notification: {
      id: string;
      message: string;
    }
  ) => void;

  removeNotification: (
    id: string
  ) => void;

  clearNotifications: () => void;
}

export const useNotificationStore =
  create<NotificationStore>(
    (set) => ({
      notifications: [],

      addNotification: (
        notification
      ) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              createdAt:
                Date.now(),
            },
            ...state.notifications,
          ].slice(0, 20),
        })),

      removeNotification: (
        id
      ) =>
        set((state) => ({
          notifications:
            state.notifications.filter(
              (n) =>
                n.id !== id
            ),
        })),

      clearNotifications:
        () =>
          set({
            notifications: [],
          }),
    })
  );