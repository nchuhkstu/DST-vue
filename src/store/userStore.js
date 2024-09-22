import { defineStore } from 'pinia'
import { getUsers } from '../api/userRequest';
import { useClusterStore } from './clusterStore';
export const useUserStore = defineStore('user', {
  state: () => ({
    users:[],
    index:0,
    clusterStore:useClusterStore(),
  }),
  actions: {
    setIndex(index){
      this.index = index;
      this.refreshIndex();
    },
    handleGetUsers(){
      getUsers(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
        this.users = response.data
      })
    },

  },
  getters: {

  }
})