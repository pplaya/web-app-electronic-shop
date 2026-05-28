<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'

const store = useNotificationStore()

const getTypeClasses = (type: string) => {
    switch (type) {
        case 'success':
            return {
                container: 'bg-green-100 border-green-400',
                text: 'text-green-700',
                icon: 'text-green-600',
                button: 'text-green-700'
            }
        case 'error':
            return {
                container: 'bg-red-100 border-red-400',
                text: 'text-red-700',
                icon: 'text-red-600',
                button: 'text-red-700'
            }
        default:
            return {
                container: 'bg-cyan-100 border-cyan-400',
                text: 'text-cyan-700',
                icon: 'text-cyan-600',
                button: 'text-cyan-700'
            }
    }
}

const getIcon = (type: string) => {
    switch (type) {
        case 'success':
            return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        case 'error':
            return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        default:
            return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
}
</script>

<template>
    <div class="fixed top-20 right-6 z-50 flex flex-col gap-y-3 max-w-md">
        <div v-for="notification in store.notifications" :key="notification.id"
            class="px-5 py-4 rounded-lg shadow-lg relative border animate-slide-down"
            :class="getTypeClasses(notification.type).container">
            <div class="flex items-center gap-x-3">
                <svg class="size-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    :class="getTypeClasses(notification.type).icon">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        :d="getIcon(notification.type)" />
                </svg>
                <div>
                    <strong class="font-bold text-base" :class="getTypeClasses(notification.type).text">{{
                        notification.title }}</strong>
                    <p class="text-sm mt-0.5" :class="getTypeClasses(notification.type).text">{{ notification.message }}
                    </p>
                </div>
            </div>
            <button @click="store.removeNotification(notification.id)"
                class="absolute top-3 right-3 cursor-pointer hover:opacity-75 transition-opacity"
                :class="getTypeClasses(notification.type).button">
                <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-down {
    animation: slideDown 0.3s ease-out;
}
</style>