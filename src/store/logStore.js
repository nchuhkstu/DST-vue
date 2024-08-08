import { defineStore } from 'pinia'
export const useLogStore = defineStore('log', {
  state: () => ({
    log:{ }
  }),
  actions: {
    addLog(data) {
        if(this.log[data.cluster_name] == null)
            this.log[data.cluster_name] = [];
        this.log[data.cluster_name].push({"time":data.time,"message":data.message});
        var container = document.getElementById('log');
        if (container) {
            container.scrollTop = container.scrollHeight - container.clientHeight;
        }
    },
    setLog(cluster_name,data){
      if(this.log[cluster_name] == null)
        this.log[cluster_name] = [];
      this.log[cluster_name] = data;
    },

  },
  getters: {

  }
})