<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()

const categories = [
    {
        name: 'Смартфоны',
        description: 'iPhone, Samsung, Xiaomi и др.',
        imageSrc: '/catalog/icons/phones.jpg',
        imageAlt: 'Смартфоны',
        href: '/catalog/phones',
    },
    {
        name: 'Ноутбуки',
        description: 'MacBook, Gigabyte, ASUS и др.',
        imageSrc: '/catalog/icons/laptops.jpg',
        imageAlt: 'Ноутбуки',
        href: '/catalog/laptops',
    },
    {
        name: 'Наушники',
        description: 'JBL, AirPods, Xiaomi и др.',
        imageSrc: '/catalog/icons/headphones.jpg',
        imageAlt: 'Наушники',
        href: '/catalog/headphones',
    },
    {
        name: 'Аэрогрили',
        description: 'Xiaomi, Philips, Tefal и др.',
        imageSrc: '/catalog/icons/airfrs.jpg',
        imageAlt: 'Аэрогрили',
        href: '/catalog/airfryers',
    },
    {
        name: 'Компьютеры',
        description: 'iMac, Mac mini и др.',
        imageSrc: '/catalog/icons/pcs.jpg',
        imageAlt: 'Компьютеры',
        href: '/catalog/pc',
    },
    {
        name: 'Планшеты',
        description: 'iPad, Samsung, Xiaomi и др.',
        imageSrc: '/catalog/icons/tablet.jpg',
        imageAlt: 'Планшеты',
        href: '/catalog/tablets',
    },
    {
        name: 'Телевизоры',
        description: 'Samsung, LG, Xiaomi и др.',
        imageSrc: '/catalog/icons/tvs.jpg',
        imageAlt: 'Телевизоры',
        href: '/catalog/tvs',
    },
    {
        name: 'Умные часы',
        description: 'Apple Watch, Samsung, Garmin и др.',
        imageSrc: '/catalog/icons/watches.jpg',
        imageAlt: 'Умные часы',
        href: '/catalog/watches',
    },
]

const goToCategory = (href: string) => {
    router.push(href)
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-7xl px-6">
                <div class="py-12">
                    <h2 class="text-2xl font-bold text-gray-900">Каталог товаров</h2>

                    <div class="mt-5 grid grid-cols-4 gap-y-16 gap-x-10">
                        <div v-for="category in categories" :key="category.name" class="group relative cursor-pointer"
                            @click="goToCategory(category.href)">
                            <img :src="category.imageSrc" :alt="category.imageAlt"
                                class="w-full h-72 rounded-lg bg-white object-cover group-hover:opacity-75 transition-opacity" />
                            <h3 class="mt-5 text-sm font-semibold text-gray-500">
                                <span class="absolute inset-0"></span>
                                {{ category.name }}
                            </h3>
                            <p class="text-base font-semibold text-gray-900">{{ category.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>