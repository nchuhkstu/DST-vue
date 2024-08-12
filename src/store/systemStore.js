import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
  state: () => ({
    system:{ 
        cpuData:{
            frequency:'',
            process_count:'',
            thread_count:'',
            handle_count:'',
            usage:{},
            running_time:'',
        },
        memoryData:{
            available:'',
            available_2:'',
            commited:'',
            pool_paged:'',
            pool_not_paged:'',
        }
    },
    charts_data:null
  }),
  actions: {
    refreshRunningInformation(data) {
        this.system.cpuData = data.cpuData;
        this.system.memoryData = data.memoryData;
        if(!this.charts_data){
          this.charts_data = {};
          for(let i=0;i<Object.keys(this.system.cpuData.usage).length;i++){
            this.charts_data[`cpu_ + ${i}`] = Array(59).fill(null).concat(0);
            this.charts_data[`cpu_new_ + ${i}`] = false;
          }
        }
        else{
          for(let i=0;i<Object.keys(this.system.cpuData.usage).length;i++){
            this.charts_data[`cpu_ + ${i}`].push(data.cpuData.usage[`${i}`]);
            this.charts_data[`cpu_ + ${i}`].shift();
            this.charts_data[`cpu_new_ + ${i}`] = true;
          }
        }
        console.log(this.charts_data)
    },

  },
  getters: {

  }
})