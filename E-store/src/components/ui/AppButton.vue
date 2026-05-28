<script setup lang="ts">
interface Props {
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

withDefaults(defineProps<Props>(), {
    type: 'button',
    disabled: false
})
</script>

<template>
    <button :type="type" :class="[
        'flex justify-center w-full rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 cursor-pointer transition-colors',
        { 'opacity-50 cursor-not-allowed hover:bg-cyan-600': disabled }
    ]" :disabled="disabled">
        <slot />
    </button>
</template>
