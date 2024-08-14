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
            total:'',
            commited:'',
            commited_percent:'',
            pool_paged:'',
            pool_not_paged:'',
        }
    },
    charts_data:{},
    charts_dom:{},
    cpu_information_static:{},
  }),
  actions: {
    refreshRunningInformation(data) {
        this.system.cpuData = data.cpuData;
        this.system.memoryData = data.memoryData;
        if(Object.keys(this.charts_data).length==0){
          for(let i=0;i<Object.keys(this.system.cpuData.usage).length;i++){
            this.charts_data['cpu_' + `${i}`] = Array(60).fill(null).concat(0);
          }
          this.charts_data['memory_'] = Array(59).fill(null).concat(0);
          this.charts_data['memory_2'] = Array(59).fill(null).concat(0);
        }
        else{
          const cpuDataLength = Object.keys(this.system.cpuData.usage).length;
          for (let i = 0; i < cpuDataLength-1; i++) {
            const cpuKey = 'cpu_' + i;            
            this.charts_data[cpuKey].push(data.cpuData.usage[i]);
            this.charts_data[cpuKey].shift();
            if (this.charts_dom[cpuKey]!= null&&this.charts_dom[cpuKey][0]!= null) {
              this.charts_dom[cpuKey][0].draw();
            }
          }
          this.charts_data["cpu_" + (cpuDataLength-1)].push(data.cpuData.usage[cpuDataLength-1]);
          this.charts_data["cpu_" + (cpuDataLength-1)].shift();
          if(this.charts_dom["cpu_" + (cpuDataLength-1)]!=null){
            this.charts_dom["cpu_" + (cpuDataLength-1)].draw();
          }

          this.charts_data['memory_'].push((data.memoryData.total - data.memoryData.available)/data.memoryData.total * 100);
          this.charts_data['memory_'].shift();
          if(this.charts_dom["memory"]!=null){
            this.charts_dom["memory"].draw();
          }
          this.charts_data['memory_2'].push((data.memoryData.total - data.memoryData.available)/data.memoryData.total * 100);
          this.charts_data['memory_2'].shift();
          if(this.charts_dom["memory2"]!=null){
            this.charts_dom["memory2"].draw();
          }
        }
    },

  },
  getters: {

  }
})