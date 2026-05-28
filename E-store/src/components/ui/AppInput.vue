<script setup lang="ts">
interface Props {
    label: string
    type: string
    name: string
    id: string
    modelValue?: string
    autocomplete?: string
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
    autocomplete: 'off'
})

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <div>
        <label :for="id" class="block text-sm/6 font-medium text-gray-900">
            {{ label }}
        </label>
        <div class="mt-1">
            <input :type="type" :name="name" :id="id" :value="modelValue" :autocomplete="autocomplete"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
        </div>
    </div>
</template>