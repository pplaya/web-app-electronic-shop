<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useProductsStore } from '@/stores/productsStore'
import { useOrdersStore } from '@/stores/ordersStore'

const productsStore = useProductsStore()
const ordersStore = useOrdersStore()

const stats = [
    { name: 'Сумма продаж за месяц', value: computed(() => ordersStore.monthlyRevenue.toLocaleString() + ' BYN'), change: '', changeType: 'positive' },
    { name: 'Заказов', value: computed(() => ordersStore.totalOrders), change: '', changeType: 'positive' },
    { name: 'Товаров в наличии', value: computed(() => productsStore.totalStock), change: '', changeType: 'positive' },
    { name: 'Клиентов', value: computed(() => ordersStore.getUniqueCustomers), change: '', changeType: 'positive' },
]

const recentOrders = computed(() => ordersStore.recentOrders)
const allOrders = computed(() => ordersStore.orders)

const popularProducts = computed(() => {
    return productsStore.products
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 4)
        .map(p => ({
            name: p.name,
            sold: p.sold,
            revenue: (parseInt(p.price.replace(/\D/g, '')) * p.sold).toLocaleString() + ' BYN'
        }))
})

const getStatusText = (status: string): string => {
    switch (status) {
        case 'processing': return 'Обработка'
        case 'shipped': return 'В пути'
        case 'delivered': return 'Доставлен'
        case 'cancelled': return 'Отменён'
        default: return status
    }
}

const allProducts = computed(() => productsStore.products)

const showOrdersModal = ref(false)
const showProductsModal = ref(false)

const openOrdersModal = () => { showOrdersModal.value = true }
const closeOrdersModal = () => { showOrdersModal.value = false }

const openProductsModal = () => { showProductsModal.value = true }
const closeProductsModal = () => { showProductsModal.value = false }
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-7xl px-6 py-8">

                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-gray-900">Общие показатели магазина</h1>
                </div>

                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div v-for="stat in stats" :key="stat.name"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <p class="text-sm font-medium text-gray-500">{{ stat.name }}</p>
                        <p class="mt-2 text-3xl font-semibold text-gray-900">{{ stat.value.value }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-6">

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="font-semibold text-gray-900">Последние заказы</h2>
                        </div>
                        <div class="p-6">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                                        <th class="pb-3">ID</th>
                                        <th class="pb-3">Клиент</th>
                                        <th class="pb-3">Сумма</th>
                                        <th class="pb-3">Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in recentOrders" :key="order.id"
                                        class="border-b border-gray-100 last:border-0">
                                        <td class="py-3 text-sm font-medium text-gray-900">{{ order.id }}</td>
                                        <td class="py-3 text-sm text-gray-600">{{ order.customer.firstName }} {{
                                            order.customer.lastName }}</td>
                                        <td class="py-3 text-sm text-gray-900">{{ order.total.toLocaleString() }} BYN
                                        </td>
                                        <td class="py-3">
                                            <span :class="['px-2.5 py-1 text-xs rounded-full', order.statusClass]">
                                                {{ order.status === 'processing' ? 'Обработка' : order.status ===
                                                    'shipped' ? 'В пути' : order.status === 'delivered' ? 'Доставлен' :
                                                    'Отменён' }}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr v-if="recentOrders.length === 0">
                                        <td colspan="4" class="py-6 text-center text-gray-500">Нет заказов</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button @click="openOrdersModal"
                                class="inline-block mt-4 text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer">
                                Все заказы
                            </button>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="font-semibold text-gray-900">Популярные товары</h2>
                        </div>
                        <div class="p-6">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                                        <th class="pb-3">Товар</th>
                                        <th class="pb-3">Продано</th>
                                        <th class="pb-3">Выручка</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in popularProducts" :key="product.name"
                                        class="border-b border-gray-100 last:border-0">
                                        <td class="py-3 text-sm font-medium text-gray-900">{{ product.name }}</td>
                                        <td class="py-3 text-sm text-gray-600">{{ product.sold }} шт.</td>
                                        <td class="py-3 text-sm text-gray-900">{{ product.revenue }}</td>
                                    </tr>
                                    <tr v-if="popularProducts.length === 0">
                                        <td colspan="3" class="py-6 text-center text-gray-500">Нет товаров</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button @click="openProductsModal"
                                class="inline-block mt-4 text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer">
                                Все товары
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>

        <AppFooter />

        <div v-if="showOrdersModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeOrdersModal">
            <div class="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Все заказы</h3>
                    <button @click="closeOrdersModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                                <th class="pb-3">ID</th>
                                <th class="pb-3">Клиент</th>
                                <th class="pb-3">Дата</th>
                                <th class="pb-3">Сумма</th>
                                <th class="pb-3">Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in allOrders" :key="order.id"
                                class="border-b border-gray-100 last:border-0">
                                <td class="py-3 text-sm font-medium text-gray-900">{{ order.id }}</td>
                                <td class="py-3 text-sm text-gray-600">{{ order.customer.firstName }} {{
                                    order.customer.lastName }}</td>
                                <td class="py-3 text-sm text-gray-600">{{ order.date }}</td>
                                <td class="py-3 text-sm text-gray-900">{{ order.total.toLocaleString() }} BYN</td>
                                <td class="py-3">
                                    <span :class="['px-2.5 py-1 text-xs rounded-full', order.statusClass]">
                                        {{ getStatusText(order.status) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="showProductsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeProductsModal">
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Все товары</h3>
                    <button @click="closeProductsModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                                <th class="pb-3">Товар</th>
                                <th class="pb-3">Категория</th>
                                <th class="pb-3">Цена</th>
                                <th class="pb-3">Продано</th>
                                <th class="pb-3">Остаток</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in allProducts" :key="product.id"
                                class="border-b border-gray-100 last:border-0">
                                <td class="py-3 text-sm font-medium text-gray-900">{{ product.name }}</td>
                                <td class="py-3 text-sm text-gray-600">{{ product.category }}</td>
                                <td class="py-3 text-sm text-gray-900">{{ product.price }}</td>
                                <td class="py-3 text-sm text-gray-600">{{ product.sold }} шт.</td>
                                <td class="py-3 text-sm text-gray-600">{{ product.stock }} шт.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>