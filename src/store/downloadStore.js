import { defineStore } from 'pinia'
export const useDownloadStore = defineStore('download', {
  state: () => ({
    messages:[]
  }),
  actions: {
    addMessage(data) {
        this.messages.push(data);
        var container = document.getElementById('download-log');
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
})