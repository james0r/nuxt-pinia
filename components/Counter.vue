<template>
  <h2 :class="cn([
    'text-2xl',
    'font-bold',
    'text-gray-800',
    'mb-4',
    'text-center',
  ])">
    Counter
  </h2>
  <div :class="cn([
    'flex',
    'items-center',
    'justify-center',
    'space-x-4',
    'py-12'
  ])">
    <button
    :class="cn([
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded'
    ])"
    @click="decrement"
    >
    -</button>
    <span>{{ count }}</span>
    <button
    :class="cn([
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded'
    ])"
    @click="increment"
    >
    +</button>
  </div>
</template>

<script setup>
import { cn } from '~/utils/index.ts'
import { useCounterStore } from '~/store/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

const { increment, decrement } = counterStore
const { count } = storeToRefs(counterStore)

</script>