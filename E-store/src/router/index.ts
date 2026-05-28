import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Header.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },

    {
      path: '/admin',
      redirect: '/admin/dashboard',
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('@/views/admin/ProductView.vue'),
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('@/views/admin/OrdersView.vue'),
    },
    {
      path: '/admin/customers',
      name: 'admin-customers',
      component: () => import('@/views/admin/CustomersView.vue'),
    },
    {
      path: '/catalog/phones',
      name: 'catalog-phones',
      component: () => import('@/views/catalog/PhonesView.vue'),
    },
    {
      path: '/catalog/laptops',
      name: 'catalog-laptops',
      component: () => import('@/views/catalog/LaptopsView.vue'),
    },
    {
      path: '/catalog/headphones',
      name: 'catalog-headphones',
      component: () => import('@/views/catalog/HeadphonesView.vue'),
    },
    {
      path: '/catalog/pc',
      name: 'catalog-pc',
      component: () => import('@/views/catalog/PCView.vue'),
    },
    {
      path: '/catalog/airfryers',
      name: 'catalog-airfryers',
      component: () => import('@/views/catalog/AirFryersView.vue'),
    },
    {
      path: '/catalog/tablets',
      name: 'catalog-tablets',
      component: () => import('@/views/catalog/TabletsView.vue'),
    },
    {
      path: '/catalog/tvs',
      name: 'catalog-tvs',
      component: () => import('@/views/catalog/TVsView.vue'),
    },
    {
      path: '/catalog/watches',
      name: 'catalog-watches',
      component: () => import('@/views/catalog/WatchesView.vue'),
    },
  ],
})

export default router
