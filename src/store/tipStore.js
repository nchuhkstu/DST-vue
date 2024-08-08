import { defineStore } from 'pinia'
export const useTipStore = defineStore('tip', {
  state: () => ({
    tip:"",
  }),
  actions: {
    showTip(data){
        var tip = document.getElementById('tip');
        var admin = document.getElementById('admin');
        this.tip = data;
        requestAnimationFrame(()=>{
            tip.style.display = 'flex';
            tip.style.left =(0.5-(tip.clientWidth/admin.clientWidth)/2)*100 + "%";
        })
        tip.classList.add('slide-out-top');
        setTimeout(function() {
          tip.style.display = 'none';
          tip.classList.remove('slide-out-top');
        }, 3000);
    }
  },
  getters: {

  }
})