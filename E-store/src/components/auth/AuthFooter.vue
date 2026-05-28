<script setup lang="ts">
interface Props {
    text: string
    linkText: string
    linkTo: string
}

defineProps<Props>()
</script>

<template>
    <p class="mt-8 text-center text-sm/6 text-gray-500">
        {{ text }}
        {{ ' ' }}
        <router-link :to="linkTo" class="font-semibold text-cyan-600 hover:text-cyan-500">
            {{ linkText }}
        </router-link>
    </p>
</template>
