import { defineStore } from 'pinia'
export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters:[],
    index:0,
  }),
  actions: {
    setIndex(index){
      this.index = index;
      this.refreshIndex();
    },
    refreshIndex(){
      document.querySelectorAll('.list-item').forEach(function(item) {
        item.classList.remove('selected');
      });
      document.getElementById("list-item-" + this.index).classList.add("selected");
      requestAnimationFrame(()=>{
        var container = document.getElementById('log');
        if (container) {
            container.scrollTop = container.scrollHeight - container.clientHeight;
        }
      })
    },
  },
  getters: {

  }
})