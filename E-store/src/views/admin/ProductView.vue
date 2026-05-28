<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '@/stores/productsStore'

const productsStore = useProductsStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedProduct = ref<any>(null)

const newProduct = ref({
    name: '',
    category: '',
    specs: '',
    price: '',
    stock: 0,
    image: 'https://placehold.co/100'
})

const openAddModal = () => {
    newProduct.value = { name: '', category: '', specs: '', price: '', stock: 0, image: 'https://placehold.co/100' }
    showAddModal.value = true
}
const closeAddModal = () => { showAddModal.value = false }

const openEditModal = (product: any) => {
    selectedProduct.value = { ...product }
    showEditModal.value = true
}
const closeEditModal = () => { showEditModal.value = false }

const openDeleteModal = (product: any) => {
    selectedProduct.value = product
    showDeleteModal.value = true
}
const closeDeleteModal = () => { showDeleteModal.value = false }

const confirmDelete = () => {
    productsStore.deleteProduct(selectedProduct.value.id)
    closeDeleteModal()
}

const addProduct = () => {
    productsStore.addProduct({
        name: newProduct.value.name,
        category: newProduct.value.category,
        specs: newProduct.value.specs,
        price: newProduct.value.price,
        stock: newProduct.value.stock,
        sold: 0,
        image: newProduct.value.image
    })
    closeAddModal()
}

const updateProduct = () => {
    productsStore.updateProduct(selectedProduct.value.id, selectedProduct.value)
    closeEditModal()
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <AppHeader />

        <main class="flex-1">
            <div class="mx-auto max-w-7xl px-6 py-8">

                <div class="flex items-center justify-between mb-8">
                    <h1 class="text-2xl font-bold text-gray-900">Управление товарами</h1>
                    <button @click="openAddModal"
                        class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer">
                        + Добавить товар
                    </button>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Фото</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Название</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Категория</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Цена</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Продано</th>
                                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Остаток</th>
                                <th class="px-8 py-4 text-left text-sm font-medium text-gray-500">Действия</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="product in productsStore.products" :key="product.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <img :src="product.image" :alt="product.name"
                                        class="size-12 rounded object-cover" />
                                </td>
                                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.name }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ product.category }}</td>
                                <td class="px-6 py-4 text-sm text-gray-900">{{ product.price }}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ product.sold }} шт.</td>
                                <td class="px-6 py-4 text-sm text-gray-600">{{ product.stock }} шт.</td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-x-0.5">
                                        <button @click="openEditModal(product)"
                                            class="text-cyan-600 hover:text-cyan-800 cursor-pointer p-2">
                                            <PencilSquareIcon class="size-6" />
                                        </button>
                                        <button @click="openDeleteModal(product)"
                                            class="text-red-600 hover:text-red-800 cursor-pointer p-2">
                                            <TrashIcon class="size-6" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </main>

        <AppFooter />

        <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeAddModal">
            <div class="bg-white rounded-lg max-w-md w-full">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Добавить товар</h3>
                    <button @click="closeAddModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-4">
                    <input v-model="newProduct.name" type="text" placeholder="Название"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="newProduct.category" type="text" placeholder="Категория"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="newProduct.specs" type="text" placeholder="Характеристики"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="newProduct.price" type="text" placeholder="Цена"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model.number="newProduct.stock" type="number" placeholder="Остаток"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="newProduct.image" type="text" placeholder="Ссылка на картинку"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <button @click="addProduct"
                        class="w-full py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer">Добавить</button>
                </div>
            </div>
        </div>

        <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeEditModal">
            <div class="bg-white rounded-lg max-w-md w-full">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-900">Редактировать товар</h3>
                    <button @click="closeEditModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 space-y-4">
                    <input v-model="selectedProduct.name" type="text" placeholder="Название"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="selectedProduct.category" type="text" placeholder="Категория"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="selectedProduct.specs" type="text" placeholder="Характеристики"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="selectedProduct.price" type="text" placeholder="Цена"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model.number="selectedProduct.sold" type="number" placeholder="Продано"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model.number="selectedProduct.stock" type="number" placeholder="Остаток"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <input v-model="selectedProduct.image" type="text" placeholder="Ссылка на картинку"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none" />
                    <button @click="updateProduct"
                        class="w-full py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer">Сохранить</button>
                </div>
            </div>
        </div>

        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            @click.self="closeDeleteModal">
            <div class="bg-white rounded-lg max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-900">Удалить товар?</h3>
                    <button @click="closeDeleteModal" class="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <svg class="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p class="text-gray-600 mb-6">Вы уверены, что хотите удалить "{{ selectedProduct?.name }}"?</p>
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