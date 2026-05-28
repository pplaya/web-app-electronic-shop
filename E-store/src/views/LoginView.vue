<script setup lang="ts">
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthTitle from '@/components/auth/AuthTitle.vue'
import AuthFooter from '@/components/auth/AuthFooter.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
    <AuthCard>
        <AuthTitle>Вход в аккаунт</AuthTitle>

        <div class="mt-7">
            <LoginForm />
            <AuthFooter text="Нет аккаунта?" linkText="Зарегистрироваться" linkTo="/register" />
        </div>
    </AuthCard>
</template>
