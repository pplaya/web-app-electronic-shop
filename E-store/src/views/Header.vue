<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import NewProducts from '@/components/home/NewProducts.vue'
import PopularPhones from '@/components/home/PopularPhones.vue'
import PopularHeadphones from '@/components/home/PopularHeadphones.vue'
import PopularAirFryers from '@/components/home/PopularAirFryers.vue'
import PopularLaptops from '@/components/home/PopularLaptops.vue'
import PopularPC from '@/components/home/PopularPC.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />
        <main class="flex-1">
            <CategorySection />
            <NewProducts />
            <PopularPhones />
            <PopularHeadphones />
            <PopularAirFryers />
            <PopularLaptops />
            <PopularPC />
        </main>
        <AppFooter />
    </div>
</template>