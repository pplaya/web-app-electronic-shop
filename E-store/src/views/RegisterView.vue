<script setup lang="ts">
import AuthCard from '@/components/auth/AuthCard.vue'
import AuthTitle from '@/components/auth/AuthTitle.vue'
import AuthFooter from '@/components/auth/AuthFooter.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
    <AuthCard>
        <AuthTitle>Регистрация аккаунта</AuthTitle>

        <div class="mt-7">
            <RegisterForm />
            <AuthFooter text="Есть аккаунт?" linkText="Вход" linkTo="/login" />
        </div>
    </AuthCard>
</template>
