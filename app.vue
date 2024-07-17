<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <div class="max-w-md mx-auto w-full px-6 sm:px-8">
      <nav :class="cn([
        'flex',
        'mx-auto',
        'w-full',
        'flex',
        'justify-center',
        'space-x-4',
        'text-xl',
        'font-bold',
        'py-12'
      ])">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/todos">Todo</NuxtLink>
        <NuxtLink to="/counter">Counter</NuxtLink>
      </nav>
      <NuxtPage />
    </div>
  </v-app>
</template>

<script setup>
import { cn } from '~/utils/index'

</script>
