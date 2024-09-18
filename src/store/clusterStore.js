import { defineStore } from 'pinia'
export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters:[],
    index:0,
    is_detail:false,
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
      const list = document.getElementById("list-item-" + this.index)
      if(list){
        list.classList.add("selected");
      }
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