import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductsStore } from '@/stores/productsStore'

export interface OrderItem {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  date: string
  time: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusClass: string
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])

  const totalOrders = computed(() => orders.value.length)

  const totalRevenue = computed(() => {
    return orders.value.filter((o) => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0)
  })

  const monthlyRevenue = computed(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return orders.value
      .filter((o) => {
        const parts = o.date.split('.')
        const month = Number(parts[1]) - 1
        const year = Number(parts[2])
        return month === currentMonth && year === currentYear && o.status === 'delivered'
      })
      .reduce((sum, o) => sum + o.total, 0)
  })

  const recentOrders = computed(() => {
    return orders.value.slice(0, 5)
  })

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'shipped':
        return 'bg-yellow-100 text-yellow-700'
      case 'processing':
        return 'bg-blue-100 text-blue-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'time' | 'status' | 'statusClass'>) => {
    const now = new Date()
    const newOrder: Order = {
      ...orderData,
      id: `#${Date.now().toString().slice(-6)}`,
      date: now.toLocaleDateString('ru-RU'),
      time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'processing',
      statusClass: 'bg-blue-100 text-blue-700',
    }
    orders.value.unshift(newOrder)
    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const order = orders.value.find((o) => o.id === orderId)
    if (order) {
      if (status === 'delivered' && order.status !== 'delivered') {
        const productsStore = useProductsStore()
        order.items.forEach((item) => {
          const product = productsStore.products.find((p) => p.id === item.id)
          if (product) {
            product.stock -= item.quantity
            product.sold += item.quantity
          }
        })
      }
      order.status = status
      order.statusClass = getStatusClass(status)
    }
  }

  const deleteOrder = (orderId: string) => {
    orders.value = orders.value.filter((o) => o.id !== orderId)
  }

  const getUniqueCustomers = computed(() => {
    const emails = new Set(orders.value.map((o) => o.customer.email))
    return emails.size
  })

  const getCustomers = computed(() => {
    const customersMap = new Map<
      string,
      {
        id: number
        name: string
        email: string
        phone: string
        orders: number
        totalSpent: number
        registered: string
      }
    >()

    const sortedOrders = [...orders.value].sort((a, b) => {
      const dateA = a.date.split('.').reverse().join('')
      const dateB = b.date.split('.').reverse().join('')
      return dateA.localeCompare(dateB)
    })

    sortedOrders.forEach((order) => {
      const email = order.customer.email
      if (!customersMap.has(email)) {
        customersMap.set(email, {
          id: customersMap.size + 1,
          name: `${order.customer.firstName} ${order.customer.lastName}`,
          email: email,
          phone: order.customer.phone,
          orders: 0,
          totalSpent: 0,
          registered: order.date,
        })
      }
      const customer = customersMap.get(email)!
      customer.orders += 1
      customer.totalSpent += order.total
    })

    return Array.from(customersMap.values())
  })

  return {
    orders,
    totalOrders,
    totalRevenue,
    monthlyRevenue,
    recentOrders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    getUniqueCustomers,
    getCustomers,
  }
})
