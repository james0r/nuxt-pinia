import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter-store',
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  },
  getters: {
    get: state => state.count
  }
})