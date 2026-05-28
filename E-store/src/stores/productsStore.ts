import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productsData from '@/data/products.json'

export interface Product {
  id: number
  name: string
  category: string
  specs: string
  price: string
  stock: number
  sold: number
  image: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsData as Product[])

  const totalProducts = computed(() => products.value.length)
  const totalStock = computed(() => products.value.reduce((sum, p) => sum + p.stock, 0))
  const totalSold = computed(() => products.value.reduce((sum, p) => sum + p.sold, 0))

  const getProductsByCategory = (category: string) => {
    return products.value.filter((p) => p.category === category)
  }

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.value.map((p) => p.id), 0) + 1
    products.value.unshift({ ...product, id: newId })
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      const current = products.value[index]
      products.value.splice(index, 1, { ...current, ...updates } as Product)
    }
  }

  const deleteProduct = (id: number) => {
    products.value = products.value.filter((p) => p.id !== id)
  }

  return {
    products,
    totalProducts,
    totalStock,
    totalSold,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
