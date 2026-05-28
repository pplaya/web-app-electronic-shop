<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const form = ref({
    firstName: 'Глеб',
    lastName: 'Пашкевич',
    email: 'ggg@gmail.com',
    phone: '+375-33-343-40-43',
    address: 'Город Минск, улица Казинца 21/2',
})

const isEditing = ref(false)
const showOrdersModal = ref(false)

const orders = ref([
    { id: '#1', date: '12.04.2026', total: '2500', status: 'В пути', statusClass: 'bg-yellow-100 text-yellow-700' },
    { id: '#2', date: '05.04.2026', total: '2410', status: 'Доставлен', statusClass: 'bg-green-100 text-green-700' },
    { id: '#3', date: '28.03.2026', total: '5100', status: 'Доставлен', statusClass: 'bg-green-100 text-green-700' },
    { id: '#4', date: '22.03.2026', total: '1299', status: 'Доставлен', statusClass: 'bg-green-100 text-green-700' },
])

const openOrdersModal = () => { showOrdersModal.value = true }
const closeOrdersModal = () => { showOrdersModal.value = false }

const saveProfile = () => {
    console.log('Сохранено:', form.value)
    isEditing.value = false
}

const cancelEdit = () => {
    isEditing.value = false
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1 mx-auto max-w-3xl px-6 py-12 w-full">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Личный кабинет</h1>
                    </div>
                    <button v-if="!isEditing" @click="isEditing = true"
                        class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer text-sm font-medium">
                        Редактировать
                    </button>
                </div>

                <div class="flex items-center gap-x-6 pb-8 border-b border-gray-200">
                    <div
                        class="size-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-2xl font-medium">
                        {{ form.firstName[0] }}{{ form.lastName[0] }}
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">{{ form.firstName }} {{ form.lastName }}</h2>
                        <p class="text-sm text-gray-500">{{ form.email }}</p>
                    </div>
                </div>

                <form @submit.prevent="saveProfile" class="mt-8 space-y-8">

                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input v-model="form.firstName" type="text" :disabled="!isEditing" :class="[
                                'w-full px-4 py-2.5 rounded-lg border transition-colors',
                                isEditing
                                    ? 'border-gray-300 bg-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                            ]" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                            <input v-model="form.lastName" type="text" :disabled="!isEditing" :class="[
                                'w-full px-4 py-2.5 rounded-lg border transition-colors',
                                isEditing
                                    ? 'border-gray-300 bg-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none'
                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                            ]" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Почта</label>
                        <input v-model="form.email" type="email" :disabled="!isEditing" :class="[
                            'w-full px-4 py-2.5 rounded-lg border transition-colors',
                            isEditing
                                ? 'border-gray-300 bg-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none'
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        ]" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                        <input v-model="form.phone" type="tel" :disabled="!isEditing" :class="[
                            'w-full px-4 py-2.5 rounded-lg border transition-colors',
                            isEditing
                                ? 'border-gray-300 bg-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none'
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        ]" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
                        <textarea v-model="form.address" rows="3" :disabled="!isEditing" :class="[
                            'w-full px-4 py-2.5 rounded-lg border transition-colors resize-none',
                            isEditing
                                ? 'border-gray-300 bg-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none'
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        ]" />
                    </div>

                    <div class="pt-6 border-t border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Последние заказы</h3>
                        <div class="space-y-3">
                            <div v-for="order in orders.slice(0, 2)" :key="order.id"
                                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-gray-900">Заказ {{ order.id }}</p>
                                    <p class="text-sm text-gray-500">{{ order.date }} - Сумма: {{ order.total }} BYN</p>
                                </div>
                                <span :class="['px-3 py-1 text-sm rounded-full', order.statusClass]">{{ order.status
                                }}</span>
                            </div>
                        </div>
                        <button @click="openOrdersModal"
                            class="inline-block mt-4 text-cyan-600 hover:text-cyan-800 text-sm cursor-pointer font-medium">
                            Все заказы
                        </button>
                    </div>

                    <div v-if="isEditing" class="flex justify-end gap-x-4 pt-6 border-t border-gray-200">
                        <button type="button" @click="cancelEdit"
                            class="px-6 py-2.5 text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                            Отмена
                        </button>
                        <button type="submit"
                            class="px-6 py-2.5 bg-cyan-600 text-white rounded-lg cursor-pointer hover:bg-cyan-700 transition-colors font-medium">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </main>

        <AppFooter />

        <div v-if="showOrdersModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeOrdersModal">
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">История заказов</h3>
                    <button @click="closeOrdersModal" class="p-1.5 rounded-lg hover:bg-gray-100">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-3">
                    <div v-for="order in orders" :key="order.id"
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p class="font-medium text-gray-900">Заказ {{ order.id }}</p>
                            <p class="text-sm text-gray-500">{{ order.date }} - Cумма: {{ order.total }} BYN</p>
                        </div>
                        <span :class="['px-3 py-1 text-sm rounded-full', order.statusClass]">{{ order.status }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>