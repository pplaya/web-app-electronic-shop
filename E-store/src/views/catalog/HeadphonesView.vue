<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { useCartStore } from '@/stores/cartStore'
import { useProductsStore } from '@/stores/productsStore'

const productsStore = useProductsStore()
const products = computed(() => productsStore.getProductsByCategory('Наушники'))

const cartStore = useCartStore()
const notificationStore = useNotificationStore()

const addToCart = (product: any) => {
    cartStore.addToCart({
        id: product.id,
        name: product.name,
        category: 'Наушники',
        price: parseInt(product.price.replace(/\D/g, '')),
        image: product.image
    })
    notificationStore.success('Товар добавлен!', `${product.name} успешно добавлен в корзину.`)
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />
        <main class="flex-1">
            <div class="mx-auto max-w-5xl px-6 py-12">
                <h1 class="text-2xl font-bold text-gray-900 mb-8">Наушники</h1>
                <div class="space-y-4">
                    <div v-for="product in products" :key="product.id"
                        class="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex items-center gap-6 hover:shadow-lg transition-shadow">
                        <img :src="product.image" :alt="product.name"
                            class="size-34 rounded-lg object-cover shrink-0" />
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                            <p class="text-sm text-gray-500 mt-1">{{ product.specs }}</p>
                        </div>
                        <div class="text-right shrink-0">
                            <p class="text-xl font-bold text-gray-900">{{ product.price }}</p>
                            <button @click="addToCart(product)"
                                class="mt-2 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer">
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <AppFooter />
    </div>
</template>