<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cart1 from '@/assets/cart1.png'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const userRole = ref<'user' | 'admin'>(
    (localStorage.getItem('userRole') as 'user' | 'admin') || 'user'
)
const userName = ref(
    localStorage.getItem('userName') || 'Глеб Пашкевич'
)
const isProfileOpen = ref(false)

const userInitials = computed(() => {
    return userName.value
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

const userNavigation = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'О нас', href: '/about' },
]

const adminNavigation = [
    { name: 'Информационный раздел', href: '/admin/dashboard' },
    { name: 'Товары', href: '/admin/products' },
    { name: 'Заказы', href: '/admin/orders' },
    { name: 'Клиенты', href: '/admin/customers' },
]

const currentNavigation = computed(() => {
    return userRole.value === 'admin' ? adminNavigation : userNavigation
})

const route = useRoute()
const router = useRouter()

const isActive = (href: string) => {
    return route.path === href || route.path.startsWith(href + '/')
}

const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    isProfileOpen.value = false
    router.push('/login')
}
</script>

<template>
    <nav class="bg-white shadow-md border-b border-gray-200">
        <div class="mx-auto max-w-7xl px-6">
            <div class="flex h-16 items-center justify-between">

                <router-link :to="userRole === 'admin' ? '/admin/dashboard' : '/'"
                    class="flex items-center gap-x-2 shrink-0">
                    <div
                        class="size-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        EN
                    </div>
                    <span class="text-gray-900 font-semibold text-lg">ENavar</span>
                </router-link>

                <div class="flex-1 flex justify-center">
                    <div class="flex items-baseline space-x-4">
                        <router-link v-for="item in currentNavigation" :key="item.name" :to="item.href"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            :class="{ 'bg-gray-100 text-gray-900': isActive(item.href) }">
                            {{ item.name }}
                        </router-link>
                    </div>
                </div>

                <div class="flex items-center space-x-4">

                    <router-link v-if="userRole === 'user'" to="/cart"
                        class="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <img :src="cart1" alt="Корзина" class="size-7 object-contain" />
                        <span v-if="cartStore.totalItems > 0"
                            class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-white">
                            {{ cartStore.totalItems }}
                        </span>
                    </router-link>

                    <div class="relative">
                        <button @click="isProfileOpen = !isProfileOpen"
                            class="flex items-center focus:outline-none hover:opacity-80 transition-opacity">
                            <div
                                class="size-8 rounded-full bg-cyan-600 flex items-center justify-center cursor-pointer text-white font-medium">
                                {{ userInitials }}
                            </div>
                        </button>

                        <div v-if="isProfileOpen"
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 border border-gray-200">
                            <router-link v-if="userRole === 'user'" to="/profile"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                @click="isProfileOpen = false">
                                Личный кабинет
                            </router-link>
                            <button @click="handleLogout"
                                class="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100">
                                Выйти
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </nav>
</template>