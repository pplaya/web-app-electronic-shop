<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import { useCartStore } from '@/stores/cartStore'
import { useProductsStore } from '@/stores/productsStore'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const notificationStore = useNotificationStore()

const products = computed(() => productsStore.getProductsByCategory('Компьютеры').slice(0, 4))

const goToProduct = (product: any) => {
    router.push(`/catalog/pc`)
}

const addToCart = (product: any) => {
    cartStore.addToCart({
        id: product.id,
        name: product.name,
        category: 'Компьютеры',
        price: parseInt(product.price.replace(/\D/g, '')),
        image: product.image
    })
    notificationStore.success('Товар добавлен!', `${product.name} успешно добавлен в корзину.`)
}
</script>

<template>
    <section class="mx-auto max-w-7xl px-6 py-12">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Популярные компьютеры</h2>
            <router-link to="/catalog/pc" class="text-cyan-600 hover:text-cyan-800 font-medium text-sm">
                Все компьютеры
            </router-link>
        </div>

        <div class="grid grid-cols-4 gap-x-6 gap-y-10">
            <div v-for="product in products" :key="product.id" class="group relative cursor-pointer"
                @click="goToProduct(product)">
                <div class="relative">
                    <img :src="product.image" :alt="product.name"
                        class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75 transition-opacity" />
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm font-semibold text-gray-700">{{ product.name }}</h3>
                    <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
                </div>
                <button
                    class="mt-4 w-full py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-700"
                    @click.stop="addToCart(product)">
                    Добавить в корзину
                </button>
            </div>
        </div>
    </section>
</template>