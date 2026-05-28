<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()

const phone = ref('')
const password = ref('')
const remember = ref(false)
const error = ref('')

const ADMIN_PHONE = 'admin'
const ADMIN_PASSWORD = 'admin'

const login = () => {
    error.value = ''

    if (phone.value === ADMIN_PHONE && password.value === ADMIN_PASSWORD) {
        localStorage.setItem('userRole', 'admin')
        localStorage.setItem('userName', 'Администратор')
        router.push('/admin/dashboard')
    } else if (phone.value && password.value) {
        localStorage.setItem('userRole', 'user')
        localStorage.setItem('userName', 'Глеб Пашкевич')
        router.push('/')
    } else {
        error.value = 'Введите логин и пароль'
    }
}
</script>

<template>
    <form @submit.prevent="login" class="space-y-5">

        <AppInput v-model="phone" label="Телефон" type="text" name="phone" id="phone" autocomplete="tel" />

        <div>
            <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">
                    Пароль
                </label>
            </div>
            <div class="mt-1">
                <input v-model="password" type="password" id="password" name="password" autocomplete="current-password"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600" />
            </div>
        </div>

        <div v-if="error" class="text-sm text-red-600 text-center">
            {{ error }}
        </div>

        <div class="flex items-center justify-between">

            <div class="flex items-center gap-x-2">
                <input v-model="remember" type="checkbox" id="remember" name="remember"
                    class="size-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600" />
                <label for="remember" class="text-sm/6 text-gray-700">
                    Запомнить меня
                </label>
            </div>

            <AppButton type="submit" class="w-auto!">
                Войти
            </AppButton>
        </div>

    </form>
</template>