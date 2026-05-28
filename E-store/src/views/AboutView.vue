<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import apple from '@/assets/apple.png'
import samsung from '@/assets/samsung.png'
import amd from '@/assets/amd.png'
import sony from '@/assets/sony.png'
import tefal from '@/assets/tefal.png'
import LG from '@/assets/LG.png'
import JBL from '@/assets/JBL.png'
import intel from '@/assets/intel.png'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <AppHeader />

        <main class="flex-1">
            <div class="bg-cyan-600">
                <div class="mx-auto max-w-7xl px-6 py-10">
                    <h1 class="text-4xl font-bold text-white">ENavar - №1 В БЕЛАРУСИ ПО ПРОДАЖЕ ЭЛЕКТРОНИКИ</h1>
                    <p class="mt-4 text-xl text-cyan-100 max-w-3xl">
                        Мы уверены, что качественная электроника должна быть доступна каждому.
                        Поэтому мы тщательно отбираем товары, напрямую работаем с производителями и предлагаем лучшие
                        цены на рынке.
                    </p>
                </div>
            </div>


            <div class="mx-auto max-w-7xl px-6 py-16">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Почему стоит выбрать нас?</h2>

                <div class="max-w-3xl mx-auto space-y-4">

                    <div class="flex items-center gap-x-4 p-5 bg-gray-50 rounded-xl">
                        <span class="text-cyan-600 font-bold text-xl">01</span>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Более 10 лет на рынке</h3>
                            <p class="text-sm text-gray-600">Работаем с 2015 года, знаем всё об электронике!</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-x-4 p-5 bg-gray-50 rounded-xl">
                        <span class="text-cyan-600 font-bold text-xl">02</span>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Более 50 тысяч довольных клиентов</h3>
                            <p class="text-sm text-gray-600">Довольные покупатели рекомендуют нас!</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-x-4 p-5 bg-gray-50 rounded-xl">
                        <span class="text-cyan-600 font-bold text-xl">03</span>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Официальная гарантия</h3>
                            <p class="text-sm text-gray-600">Гарантия от 1 года на любые товары!</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-x-4 p-5 bg-gray-50 rounded-xl">
                        <span class="text-cyan-600 font-bold text-xl">04</span>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Удобная оплата</h3>
                            <p class="text-sm text-gray-600">Карты, наличные, рассрочка без переплат!</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-x-4 p-5 bg-gray-50 rounded-xl">
                        <span class="text-cyan-600 font-bold text-xl">05</span>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Поддержка 24/7</h3>
                            <p class="text-sm text-gray-600">Всегда на связи, поможем с выбором!</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="mx-auto max-w-7xl px-6 py-16">
                <h2 class="text-3xl font-bold text-black text-center mb-12">Наши партнёры</h2>

                <div class="grid grid-cols-4 gap-10 items-center">

                    <div class="flex justify-center items-center h-24">
                        <img :src="apple" alt="Apple" class="h-22 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="samsung" alt="Samsung" class="h-24 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="sony" alt="Sony" class="h-11 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="LG" alt="LG" class="h-20 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="amd" alt="AMD" class="h-8 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="intel" alt="Intel" class="h-10 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="JBL" alt="JBL" class="h-18 w-auto object-contain" />
                    </div>

                    <div class="flex justify-center items-center h-24">
                        <img :src="tefal" alt="Tefal" class="h-24 w-auto object-contain" />
                    </div>

                </div>
            </div>

        </main>

        <AppFooter />
    </div>
</template>