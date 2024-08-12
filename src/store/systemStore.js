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
    cpu_Usage:null
  }),
  actions: {
    refreshRunningInformation(data) {
        this.system.cpuData = data.cpuData;
        this.system.memoryData = data.memoryData;
        if(!this.cpu_Usage){
          this.cpu_Usage = {};
          for(let i=0;i<Object.keys(this.system.cpuData.usage).length;i++){
            this.cpu_Usage[`${i}`] = Array(59).fill(null).concat(0);
          }
        }
        else{
          for(let i=0;i<Object.keys(this.system.cpuData.usage).length;i++){
            this.cpu_Usage[`${i}`].push(data.cpuData.usage[`${i}`]);
            this.cpu_Usage[`${i}`].shift();
          }
        }
        console.log(this.cpu_Usage)
    },

  },
  getters: {

  }
})