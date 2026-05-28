<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { TrashIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { useNotificationStore } from '@/stores/notificationStore'
import { useCartStore } from '@/stores/cartStore'
import { useOrdersStore } from '@/stores/ordersStore'
import { useTelegram } from '@/composables/useTelegram'

const notificationStore = useNotificationStore()
const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const { sendOrder } = useTelegram()
const showDeleteModal = ref(false)
const productToDelete = ref<number | null>(null)
const showOrderModal = ref(false)

const orderForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
})

const errors = ref({
    email: '',
    phone: ''
})

const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.')
}

const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '')
    return digits.length === 12 && digits.startsWith('375')
}

const validateForm = () => {
    errors.value.email = ''
    errors.value.phone = ''

    if (!orderForm.value.email) {
        errors.value.email = 'Формат: yourname@gmail.com'
    } else if (!validateEmail(orderForm.value.email)) {
        errors.value.email = 'Некорректная почта'
    }

    if (!orderForm.value.phone) {
        errors.value.phone = 'Формат: +375 xx xxx xx xx'
    } else if (!validatePhone(orderForm.value.phone)) {
        errors.value.phone = 'Некорректный номер телефона'
    }

    return !errors.value.email && !errors.value.phone
}

const openDeleteModal = (id: number) => {
    productToDelete.value = id
    showDeleteModal.value = true
}

const closeDeleteModal = () => {
    showDeleteModal.value = false
    productToDelete.value = null
}

const confirmDelete = () => {
    if (productToDelete.value !== null) {
        cartStore.removeFromCart(productToDelete.value)
    }
    closeDeleteModal()
}

const openOrderModal = () => {
    showOrderModal.value = true
}

const closeOrderModal = () => {
    showOrderModal.value = false
    orderForm.value = { firstName: '', lastName: '', email: '', phone: '', address: '' }
    errors.value = { email: '', phone: '' }
}

const submitOrder = () => {
    if (!validateForm()) {
        notificationStore.error('Ошибка!', 'Проверьте почту и номер телефона.')
        return
    }

    const orderInfo = {
        ...orderForm.value,
        total: cartStore.subtotal,
        items: cartStore.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }))
    }

    sendOrder(orderInfo)

    ordersStore.addOrder({
        customer: {
            firstName: orderForm.value.firstName,
            lastName: orderForm.value.lastName,
            email: orderForm.value.email,
            phone: orderForm.value.phone,
            address: orderForm.value.address
        },
        items: cartStore.items.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        total: cartStore.subtotal
    })

    console.log('Заказ оформлен:', orderForm.value)
    console.log('Товары:', cartStore.items)
    console.log('Итого:', cartStore.subtotal, 'BYN')

    cartStore.clearCart()
    closeOrderModal()

    notificationStore.success('Заказ оформлен!', 'Ожидайте звонка оператора для подтверждения.', 4500)
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-4xl px-6 py-12">
                <h1 class="text-2xl font-bold text-gray-900 mb-8">Корзина</h1>

                <div v-if="cartStore.items.length === 0"
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p class="text-gray-500 text-lg">В корзине ничего нет</p>
                    <router-link to="/catalog" class="mt-4 inline-block text-cyan-600 hover:text-cyan-800 font-medium">
                        Перейти в каталог
                    </router-link>
                </div>

                <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    <ul class="divide-y divide-gray-200">
                        <li v-for="item in cartStore.items" :key="item.id" class="flex py-6 px-6">
                            <div class="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                <img :src="item.image" :alt="item.name" class="size-full object-cover" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{{ item.name }}</h3>
                                        <p class="ml-4">{{ (item.price * item.quantity).toLocaleString() }} BYN</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                                </div>

                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <div class="flex items-center gap-x-2">
                                        <span class="text-gray-500">Кол-во:</span>
                                        <div class="flex items-center gap-x-0.5">
                                            <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                                                class="cursor-pointer text-cyan-600 hover:text-cyan-800">
                                                <MinusCircleIcon class="size-6" />
                                            </button>
                                            <span class="w-6 text-center font-medium">{{ item.quantity }}</span>
                                            <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                                                class="cursor-pointer text-cyan-600 hover:text-cyan-800">
                                                <PlusCircleIcon class="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <button type="button" @click="openDeleteModal(item.id)"
                                        class="text-red-600 hover:text-red-800 cursor-pointer p-2">
                                        <TrashIcon class="size-6" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div class="border-t border-gray-200 px-6 py-6 bg-gray-50">
                        <div class="flex justify-start mb-1 font-medium">
                            <button @click="cartStore.clearCart()"
                                class="text-sm text-red-600 hover:text-red-800 cursor-pointer">
                                Очистить корзину
                            </button>
                        </div>

                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <p>Итого</p>
                            <p>{{ cartStore.subtotal.toLocaleString() }} BYN</p>
                        </div>

                        <div class="mt-6 flex gap-x-4">
                            <router-link to="/catalog"
                                class="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                                Продолжить покупки
                            </router-link>
                            <button @click="openOrderModal"
                                class="flex-1 rounded-lg bg-cyan-600 px-6 py-3 text-base cursor-pointer font-medium text-white shadow-sm hover:bg-cyan-700 transition-colors">
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <AppFooter />

        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/30" @click="closeDeleteModal"></div>
            <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Удалить товар?</h3>
                <p class="text-sm text-gray-500 mb-6">Вы уверены, что хотите удалить товар из корзины?</p>
                <div class="flex gap-x-3 justify-end">
                    <button @click="closeDeleteModal"
                        class="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Отмена
                    </button>
                    <button @click="confirmDelete"
                        class="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 rounded-lg hover:bg-red-800 transition-colors">
                        Удалить
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showOrderModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/30" @click="closeOrderModal"></div>
            <div class="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Оформление заказа</h3>
                    <button @click="closeOrderModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input v-model="orderForm.firstName" type="text" placeholder=""
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                            <input v-model="orderForm.lastName" type="text" placeholder=""
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Почта</label>
                        <input v-model="orderForm.email" type="email" placeholder=""
                            class="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none"
                            :class="errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'" />
                        <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                        <input v-model="orderForm.phone" type="tel" placeholder=""
                            class="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none"
                            :class="errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'" />
                        <p v-if="errors.phone" class="text-sm text-red-600 mt-1">{{ errors.phone }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
                        <textarea v-model="orderForm.address" rows="3" placeholder=""
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none resize-none" />
                    </div>

                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">Товаров в заказе: {{ cartStore.totalItems }} шт.</p>
                        <p class="text-lg font-bold text-gray-900 mt-1">Итого: {{ cartStore.subtotal.toLocaleString() }}
                            BYN</p>
                    </div>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 flex gap-x-3 justify-end">
                    <button @click="closeOrderModal"
                        class="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Отмена
                    </button>
                    <button @click="submitOrder"
                        class="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors">
                        Подтвердить заказ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>