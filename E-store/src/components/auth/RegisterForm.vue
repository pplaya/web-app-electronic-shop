<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirmation = ref('')
</script>

<template>
    <form @submit.prevent class="space-y-5">

        <AppInput v-model="name" label="Имя" type="text" name="name" id="name" autocomplete="name" />

        <AppInput v-model="email" label="Почта" type="email" name="email" id="email" autocomplete="email" />

        <AppInput v-model="phone" label="Телефон" type="tel" name="phone" id="phone" autocomplete="tel" />

        <AppInput v-model="password" label="Пароль" type="password" name="password" id="password"
            autocomplete="new-password" />

        <AppInput v-model="passwordConfirmation" label="Подтверждение пароля" type="password"
            name="passwordConfirmation" id="passwordConfirmation" autocomplete="new-password" />

        <AppButton type="submit">
            Зарегистрироваться
        </AppButton>

    </form>
</template>
