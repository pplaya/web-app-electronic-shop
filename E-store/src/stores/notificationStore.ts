import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'info'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  duration?: number
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  let nextId = 1

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = nextId++
    const duration = notification.duration ?? 4500

    notifications.value.push({ ...notification, id })

    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const success = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration })
  }

  const error = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration })
  }

  const info = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
  }
})
