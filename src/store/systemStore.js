import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
  state: () => ({
    system:{ 
        cpuData:{
            frequency:'',
            process_count:'',
            thread_count:'',
            handle_count:'',
            usage:{

            }
        },
        memoryData:{
            available:'',
            available_2:'',
            commited:'',
            pool_paged:'',
            pool_not_paged:'',
        }
    }
  }),
  actions: {
    refreshRunningInformation(data) {
        this.system.cpuData = data.cpuData;
        this.system.memoryData = data.memoryData;
    },

  },
  getters: {

  }
})