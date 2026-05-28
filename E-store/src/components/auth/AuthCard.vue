<script setup lang="ts">
</script>
<template>
    <div class="min-h-screen flex items-center bg-gray-50">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="mx-auto w-full max-w-sm bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <slot />
            </div>
        </div>
    </div>
</template>
