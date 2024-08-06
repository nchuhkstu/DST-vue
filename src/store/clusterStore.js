import { defineStore } from 'pinia'

export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters:[],
    index:0,
  }),
  actions: {
    setIndex(index){
        this.index = index;
    },
    decrement() {
      this.count--
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})