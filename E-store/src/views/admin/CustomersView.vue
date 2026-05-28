<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '@/stores/ordersStore'

const ordersStore = useOrdersStore()

const showDetailsModal = ref(false)
const selectedCustomer = ref<any>(null)

const openDetails = (customer: any) => {
    selectedCustomer.value = customer
    showDetailsModal.value = true
}
const closeDetails = () => { showDetailsModal.value = false }
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-7xl px-6 py-8">

                <h1 class="text-2xl font-bold text-gray-900 mb-8">Клиенты</h1>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Имя</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Почта</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Телефон</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Заказов</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Потрачено</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Действия</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="customer in ordersStore.getCustomers" :key="customer.id"
                                class="hover:bg-gray-50">
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ customer.id }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ customer.name }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ customer.email }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ customer.phone }}</td>
                                <td class="px-10 py-4 text-sm text-gray-600">{{ customer.orders }}</td>
                                <td class="px-6 py-4 text-sm text-gray-900">{{ customer.totalSpent.toLocaleString() }}
                                    BYN</td>
                                <td class="px-6 py-4">
                                    <button @click="openDetails(customer)"
                                        class="text-cyan-600 hover:text-cyan-800 cursor-pointer p-2 ml-2">
                                        <UserCircleIcon class="size-7" />
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="ordersStore.getCustomers.length === 0">
                                <td colspan="7" class="py-12 text-center text-gray-500">Нет клиентов</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </main>

        <AppFooter />

        <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeDetails">
            <div class="bg-white rounded-lg max-w-md w-full">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">{{ selectedCustomer?.name }}</h3>
                    <button @click="closeDetails" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-3">
                    <p><span class="font-medium text-gray-700">ID:</span> {{ selectedCustomer?.id }}</p>
                    <p><span class="font-medium text-gray-700">Email:</span> {{ selectedCustomer?.email }}</p>
                    <p><span class="font-medium text-gray-700">Телефон:</span> {{ selectedCustomer?.phone }}</p>
                    <p><span class="font-medium text-gray-700">Дата регистрации:</span> {{ selectedCustomer?.registered
                        }}</p>
                    <p><span class="font-medium text-gray-700">Всего заказов:</span> {{ selectedCustomer?.orders }}</p>
                    <p><span class="font-medium text-gray-700">Потрачено:</span> {{
                        selectedCustomer?.totalSpent?.toLocaleString() }} BYN</p>
                </div>
            </div>
        </div>
    </div>
</template>