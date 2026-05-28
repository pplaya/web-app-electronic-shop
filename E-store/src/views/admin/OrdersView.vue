<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { FolderIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '@/stores/ordersStore'

const ordersStore = useOrdersStore()

const showDetailsModal = ref(false)
const showStatusModal = ref(false)
const showDeleteModal = ref(false)
const selectedOrder = ref<any>(null)

const openDetails = (order: any) => {
    selectedOrder.value = order
    showDetailsModal.value = true
}
const closeDetails = () => { showDetailsModal.value = false }

const openStatusModal = (order: any) => {
    selectedOrder.value = order
    showStatusModal.value = true
}
const closeStatusModal = () => { showStatusModal.value = false }

const openDeleteModal = (order: any) => {
    selectedOrder.value = order
    showDeleteModal.value = true
}
const closeDeleteModal = () => { showDeleteModal.value = false }

const confirmDelete = () => {
    ordersStore.deleteOrder(selectedOrder.value.id)
    closeDeleteModal()
}

const updateStatus = (status: string) => {
    if (selectedOrder.value) {
        const statusMap: Record<string, 'processing' | 'shipped' | 'delivered' | 'cancelled'> = {
            'Обработка': 'processing',
            'В пути': 'shipped',
            'Доставлен': 'delivered',
            'Отменён': 'cancelled'
        }
        const newStatus = statusMap[status]
        if (newStatus) {
            ordersStore.updateOrderStatus(selectedOrder.value.id, newStatus)
        }
    }
    closeStatusModal()
}

const getStatusText = (status: string): string => {
    switch (status) {
        case 'processing': return 'Обработка'
        case 'shipped': return 'В пути'
        case 'delivered': return 'Доставлен'
        case 'cancelled': return 'Отменён'
        default: return status
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-7xl px-6 py-8">

                <h1 class="text-2xl font-bold text-gray-900 mb-8">Управление заказами</h1>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Клиент</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Дата</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Товаров</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Сумма</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Статус</th>
                                <th class="px-12 py-4 text-left text-sm font-medium text-gray-500">Действия</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="order in ordersStore.orders" :key="order.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ order.id }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ order.customer.firstName }} {{
                                    order.customer.lastName }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ order.date }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ order.items.length }} шт.</td>
                                <td class="px-6 py-4 text-sm text-gray-900">{{ order.total.toLocaleString() }} BYN</td>
                                <td class="px-6 py-4">
                                    <span :class="['px-2.5 py-1 text-xs rounded-full', order.statusClass]">
                                        {{ getStatusText(order.status) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-x-0.5">
                                        <button @click="openDetails(order)"
                                            class="text-blue-600 hover:text-blue-800 cursor-pointer p-2">
                                            <FolderIcon class="size-6" />
                                        </button>
                                        <button @click="openStatusModal(order)"
                                            class="text-cyan-600 hover:text-cyan-800 cursor-pointer p-2">
                                            <PencilSquareIcon class="size-6" />
                                        </button>
                                        <button @click="openDeleteModal(order)"
                                            class="text-red-600 hover:text-red-800 cursor-pointer p-2">
                                            <TrashIcon class="size-6" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="ordersStore.orders.length === 0">
                                <td colspan="7" class="py-12 text-center text-gray-500">Нет заказов</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </main>

        <AppFooter />

        <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeDetails">
            <div class="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Заказ {{ selectedOrder?.id }}</h3>
                    <button @click="closeDetails" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-medium text-gray-900 mb-2">Клиент</h4>
                        <p class="text-sm text-gray-600">{{ selectedOrder?.customer.firstName }} {{
                            selectedOrder?.customer.lastName }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder?.customer.phone }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder?.customer.email }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder?.customer.address }}</p>
                    </div>

                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">Товары</h4>
                        <div class="space-y-2">
                            <div v-for="item in selectedOrder?.items" :key="item.id"
                                class="flex justify-between text-sm border-b border-gray-100 pb-2">
                                <div>
                                    <p class="font-medium text-gray-900">{{ item.name }}</p>
                                    <p class="text-gray-500">{{ item.category }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-900">{{ item.quantity }} × {{ item.price }} BYN</p>
                                    <p class="font-medium text-gray-900">{{ (item.price *
                                        item.quantity).toLocaleString() }} BYN</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                        <span>Итого</span>
                        <span>{{ selectedOrder?.total.toLocaleString() }} BYN</span>
                    </div>

                    <div class="flex justify-between text-sm text-gray-500">
                        <span>Дата: {{ selectedOrder?.date }} {{ selectedOrder?.time }}</span>
                        <span :class="['px-2.5 py-1 text-xs rounded-full', selectedOrder?.statusClass]">
                            {{ getStatusText(selectedOrder?.status) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showStatusModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeStatusModal">
            <div class="bg-white rounded-lg max-w-xs w-full p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-900">Изменить статус</h3>
                    <button @click="closeStatusModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    <button @click="updateStatus('Обработка')"
                        class="w-full py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">Обработка</button>
                    <button @click="updateStatus('В пути')"
                        class="w-full py-2.5 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">В
                        пути</button>
                    <button @click="updateStatus('Доставлен')"
                        class="w-full py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">Доставлен</button>
                    <button @click="updateStatus('Отменён')"
                        class="w-full py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">Отменён</button>
                </div>
                <button @click="closeStatusModal"
                    class="w-full mt-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">Отмена</button>
            </div>
        </div>

        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeDeleteModal">
            <div class="bg-white rounded-lg max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-900">Удалить заказ?</h3>
                    <button @click="closeDeleteModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p class="text-gray-600 mb-6">Вы уверены, что хотите удалить заказ {{ selectedOrder?.id }}?</p>
                <div class="flex gap-x-3 justify-end">
                    <button @click="closeDeleteModal"
                        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">Отмена</button>
                    <button @click="confirmDelete"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>