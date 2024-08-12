<template>
    <div class="resourceUsage">
        <div class="left" id="left">
            <div class="left-item">
                <div class="chart-container">
                    <chart :name="'cpu_' + Object.keys(this.systemStore.cpuData.usage.length-1)"></chart>
                </div>
                <div class="information-container">
                    <div class="title">CPU</div>
                    <div class="information">{{ systemStore.system.cpuData.usage[Object.keys(systemStore.system.cpuData.usage).length-1] }}</div>
                </div>
            </div>
            <div class="left-item">
                <div class="chart-container"></div>
                <div class="information-container">
                    <div class="title">内存</div>
                    <div class="information"></div>
                </div>
            </div>
            <div class="left-item">
                <div class="chart-container"></div>
                <div class="information-container">
                    <div class="title">网络</div>
                    <div class="information"></div>
                </div>
            </div>
        </div>
        <div class="mid" id="mid">
            <div class="mid-item" @mousedown="stopResize" @mouseup="startResize" @mousemove="resize"></div>
        </div>
        <div class="right" id="right">
            <div class="cpu" v-if="active=='cpu'">
                <div class="cpu-title">
                    <div class="cpu-title-left">CPU</div>
                    <div class="cpu-title-right">{{ cpu_information_static.name }}</div>
                </div>
                <div class="cpu-description">60秒内的利用率 %</div>
                <div class="cpu-charts">
                    <chart v-for="index in Object.keys(this.systemStore.cpuData.usage).length-1" :name="'cpu_' + index"></chart>
                </div>
                <div class="cpu-bottom">
                    <div class="cpu-bottom-left">
                        <div class="cpu-bottom-left-line">
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">利用率</div>
                                <div class="item-bottom">{{ systemStore.system.cpuData.usage[Object.keys(systemStore.system.cpuData.usage).length-1] }}%</div>
                            </div>
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">速度</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.cpuData.frequency).toFixed(2) + ' GHZ' }}</div>
                            </div>
                        </div>
                        <div class="cpu-bottom-left-line">
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">进程</div>
                                <div class="item-bottom">{{ systemStore.system.cpuData.process_count }}</div>
                            </div>
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">线程</div>
                                <div class="item-bottom">{{ systemStore.system.cpuData.thread_count }}</div>
                            </div>
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">句柄</div>
                                <div class="item-bottom">{{ systemStore.system.cpuData.handle_count }}</div>
                            </div>
                        </div>
                        <div class="cpu-bottom-left-line">
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">正常运行时间</div>
                                <div class="item-bottom">{{ systemStore.system.cpuData.running_time }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cpu-bottom-right">
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">基准速度:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.basic_frequency }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">插槽:</div>
                            <div class="cpu-bottom-right-line-right">1</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">内核:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.core_num }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">逻辑处理器:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.core_num_logical }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">虚拟化:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.cpu_virtual }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">L2缓存:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.l2_cache_size }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">L3缓存:</div>
                            <div class="cpu-bottom-right-line-right">{{ cpu_information_static.l3_cache_size }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSystemInfo } from '../api/systemRequest';
import { useSystemStore } from '../store/systemStore'
import chart from './chart.vue'
export default{
    name:'resourceUsage',
    components:{
        chart,
    },
    data(){
        return{
            is_resize:false,
            cpu_information_static:{
                basic_frequency:null,
                core_num:null,
                core_num_logical:null,
                cpu_virtual:null,
                l2_cache_size:null,
                l3_cache_size:null,
                name:null,
            },
            systemStore:useSystemStore(),
            active:'cpu',
        }
    },
    methods:{
        handleGetSystemInfo(){
            getSystemInfo().then(response=>{
                this.cpu_information_static = response.data;
                console.log(this.cpu_information_static)
            })
        },
        startResize(){
            this.is_resize = false;
        },
        stopResize(){
            this.is_resize = true;
        },
        resize(e){
            const mid = document.getElementById("mid");
            if(this.is_resize){
                mid.style.width = (e.clientX + mid.style.width) + 'px';
            }
        }
    },
    mounted(){
        this.handleGetSystemInfo();
    }
}
</script>
<style>
.resourceUsage{
    height: 100%;
    width: 100%;
    display: flex;
}
.left{
    width: calc(20% - 1.2vh);
    height: calc(90% + 5.5vh - 1.2vh - 2vh);
    margin-left: 1%;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-right: none;
    padding: 1vh 0;
}
.left-item{
    height: 10vh;
    width: calc(100% - 1vw);
    margin: 0 0.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left-item:hover{
    background-color: rgb(217,217,217);
}
.chart-container{
    height: 80%;
    width: 6vw;
    background-color: black;
}
.information-container{
    height: 80%;
    width: 8vw;
    margin-left: 1vw;
}
.title{
    height: 50%;
    width: 100%;
    font-size: 2.5vh;
    font-weight: bold;
}
.information{
    height: 50%;
    width: 100%;
}
.mid{
    width: 0.4vh;
    border-top: 0.6vh solid rgb(118,82,44);
    border-bottom: 0.6vh solid rgb(118,82,44);
    height: calc(90% + 5.5vh - 1.2vh);
    display: flex;
    align-items: center;
    background-color: rgba(110, 81, 47, 0.6);
}
.mid-item{
    height: 95%;
    width: 100%;
    background-color: rgb(118,82,44);
}
.right{
    width: calc(75% - 1.2vh);
    height: calc(90% + 5.5vh - 1.2vh - 2vh);
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-left: none;
    padding: 1vh 0;
}
.cpu{
    height: calc(100% - 2vh);
    width: calc(100% - 2vw);
    padding: 1vh 1vw;
}
.cpu-title{
    display: flex;
    height: 10%;
    width: 100%;
}
.cpu-title-left{
    font-size: 5vh;
    height: 100%;
}
.cpu-title-right{
    font-size: 3vh;
    height: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: column-reverse;
}
.cpu-description{
    height: 3%;
    width: 100%;
}
.cpu-charts{
    height: 57%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.cpu-bottom{
    height: 30%;
    width: 100%;
    display: flex;
}
.cpu-bottom-left{
    height: 100%;
    width: 40%;
}
.cpu-bottom-left-line{
    display: flex;
    height: 33.3%;
    width: 100%;
}
.cpu-bottom-left-line-item{
    height: 100%;
    width: 100%;
}
.cpu-bottom-right{
    height: 100%;
    width: 40%;
}
.cpu-bottom-right-line{
    height: 14.2%;
    width: 100%;
    display: flex;
}
.cpu-bottom-right-line-left{
    height: 100%;
    width: 40%;
}
.cpu-bottom-right-line-right{
    height: 100%;
    width: 60%;
}

</style>