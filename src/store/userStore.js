import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    users:[],
    index:0,
  }),
  actions: {
    setIndex(index){
      this.index = index;
      this.refreshIndex();
    },
  },
  getters: {

  }
})