<template>
    <div class="resourceUsage">
        <div class="left" id="left">
            <div class="left-item" @click="changeActive('cpu')">
                <div class="chart-container">
                    <chart :ref="'cpu_' + (Object.keys(systemStore.system.cpuData.usage).length-1)" :name="'cpu_' + (Object.keys(systemStore.system.cpuData.usage).length-1)"></chart>
                </div>
                <div class="information-container">
                    <div class="title">CPU</div>
                    <div class="information">{{ parseFloat(systemStore.system.cpuData.usage[Object.keys(systemStore.system.cpuData.usage).length-1]).toFixed(0) + '%' }} {{ parseFloat(systemStore.system.cpuData.frequency).toFixed(2) + ' GHZ' }}</div>
                </div>
            </div>
            <div class="left-item" @click="changeActive('memory')">
                <div class="chart-container">
                    <chart ref="memory" :name="'memory_'"></chart>
                </div>
                <div class="information-container">
                    <div class="title">内存</div>
                    <div class="information">{{ parseFloat((systemStore.system.memoryData.total - systemStore.system.memoryData.available)/1024).toFixed(1) + '/' + parseFloat(systemStore.system.memoryData.total/1024).toFixed(1) + ' GB (' + parseFloat((systemStore.system.memoryData.total - systemStore.system.memoryData.available) / systemStore.system.memoryData.total * 100).toFixed(0) + '%)' }}</div>
                </div>
            </div>
            <div class="left-item">
                <div class="chart-container"></div>
                <div class="information-container">
                    <div class="title">网络</div>
                    <div class="information">{{ '发送:' + systemStore.system.networkData.sent + '接受:' + systemStore.system.networkData.receive }}</div>
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
                    <div class="cpu-title-right">{{ systemStore.cpu_information_static.name }}</div>
                </div>
                <div class="cpu-description">
                    <div class="cpu-description-left">60秒内的利用率 %</div>
                    <div class="cpu-description-right">100%</div>
                </div>
                <div class="cpu-charts">
                    <div class="cpu-chart" v-if="Object.keys(this.systemStore.system.cpuData.usage)" v-for="index in Object.keys(this.systemStore.system.cpuData.usage).length-1">
                        <chart :ref="'cpu_' + (index-1)" :name="'cpu_' + (index -1)" :xline="true" :yline="true"></chart>
                    </div>
                </div>
                <div class="cpu-bottom">
                    <div class="cpu-bottom-left">
                        <div class="cpu-bottom-left-line">
                            <div class="cpu-bottom-left-line-item">
                                <div class="item-top">利用率</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.cpuData.usage[Object.keys(systemStore.system.cpuData.usage).length-1]).toFixed(0) }}%</div>
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
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.basic_frequency }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">插槽:</div>
                            <div class="cpu-bottom-right-line-right">1</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">内核:</div>
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.core_num }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">逻辑处理器:</div>
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.core_num_logical }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">虚拟化:</div>
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.cpu_virtual }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">L2缓存:</div>
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.l2_cache_size }}</div>
                        </div>
                        <div class="cpu-bottom-right-line">
                            <div class="cpu-bottom-right-line-left">L3缓存:</div>
                            <div class="cpu-bottom-right-line-right">{{ systemStore.cpu_information_static.l3_cache_size }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="memory" v-if="active=='memory'">
                <div class="memory-title">
                    <div class="memory-title-left">内存</div>
                    <div class="memory-title-right">32G</div>
                </div>
                <div class="memory-description">
                    <div class="memory-description-left">内存使用量</div>
                    <div class="memory-description-right">{{ parseFloat(systemStore.system.memoryData.total / 1024).toFixed(1) + 'GB' }}</div>
                </div>
                <div class="memory-charts">
                    <div class="memory-charts-top">
                        <chart ref="memory2" :name="'memory_2'" :xline="true" :yline="true"></chart>
                    </div>
                    <div class="memory-charts-mid">
                        <div class="memory-charts-mid-line" style="display: flex;">
                            <div>60秒</div>
                            <div style="margin-left: auto;">0</div>
                        </div>
                        <div class="memory-charts-mid-line" style="display: flex;">内存组合</div>
                    </div>
                    <div class="memory-charts-bottom"></div>
                </div>
                <div class="memory-bottom">
                    <div class="memory-bottom-left">
                        <div class="memory-bottom-left-line">
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">使用中(已压缩)</div>
                                <div class="item-bottom">{{ parseFloat((systemStore.system.memoryData.total - systemStore.system.memoryData.available)/1024).toFixed(1) + ' GB(' + parseFloat(systemStore.system.memoryData.available_2 /1024).toFixed(1) + ' GB)'}}</div>
                            </div>
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">可用</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.memoryData.available / 1024).toFixed(1) + 'GB' }}</div>
                            </div>
                        </div>
                        <div class="memory-bottom-left-line">
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">已提交</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.memoryData.commited / 1024).toFixed(1) +'/' + parseFloat(systemStore.system.memoryData.commited /1024 / systemStore.system.memoryData.commited_percent * 100).toFixed(1) + 'GB' }}</div>
                            </div>
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">已缓存</div>
                                <div class="item-bottom"></div>
                            </div>
                        </div>
                        <div class="memory-bottom-left-line">
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">分页缓冲池</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.memoryData.pool_paged).toFixed(0) + 'MB' }}</div>
                            </div>
                            <div class="memory-bottom-left-line-item">
                                <div class="item-top">非分页缓冲池</div>
                                <div class="item-bottom">{{ parseFloat(systemStore.system.memoryData.pool_not_paged).toFixed(0) + 'MB' }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="memory-bottom-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
            systemStore:useSystemStore(),
            active:'cpu',
        }
    },
    methods:{
        changeActive(data){
            this.active = data;
            requestAnimationFrame(()=>{
                this.systemStore.charts_dom["memory2"] = this.$refs.memory2;
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
        },
    },
    mounted(){
        this.systemStore.charts_dom["memory"] = this.$refs.memory;
        const length = Object.keys(this.systemStore.system.cpuData.usage).length;
        for(let i=0;i<length;i++){
            this.systemStore.charts_dom["cpu_" + i] = this.$refs["cpu_" + i];
        }
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
    height: calc(92% + 5.5vh - 1.2vh - 2vh);
    margin-left: 1%;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-right: none;
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
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
    background-color: rgb(110,81,47);
}
.chart-container{
    height: 80%;
    width: 6vw;
    margin-left: 1vw;
    background-color: black;
}
.information-container{
    height: 80%;
    width: calc(100% - 7vw);
    margin-left: 0.5vw;
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
    line-height: 100%;
    font-size: 1.75vh;
    overflow:hidden;
}
.mid{
    width: 0.4vh;
    border-top: 0.6vh solid rgb(118,82,44);
    border-bottom: 0.6vh solid rgb(118,82,44);
    height: calc(92% + 5.5vh - 1.2vh);
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
    width: calc(78.5% - 1.2vh);
    height: calc(92% + 5.5vh - 1.2vh - 2vh);
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-left: none;
    padding: 1vh 0;
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
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
    display: flex;
}
.cpu-description-right{
    margin-left: auto;
}
.cpu-charts{
    padding-top: 0.5%;
    padding-bottom: 2.5%;
    height: 54%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5vh;
}
.cpu-bottom{
    height: 30%;
    width: 100%;
    display: flex;
}
.cpu-bottom-left{
    height: 100%;
    width: 35%;
}
.cpu-bottom-left-line{
    display: flex;
    height: 33.3%;
    width: 100%;
}
.cpu-bottom-left-line-item{
    height: 100%;
    margin-right: 2vw;
}
.item-top{
    font-size: 2vh;
    font-weight: lighter;
}
.item-bottom{
    font-size: 3vh;
    font-weight: 550;
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
    font-size: 2vh;
    font-weight: lighter;
}
.cpu-bottom-right-line-right{
    height: 100%;
    width: 60%;
    font-size: 2vh;
}
.memory{
    height: calc(100% - 2vh);
    width: calc(100% - 2vw);
    padding: 1vh 1vw;
}
.memory-title{
    display: flex;
    height: 10%;
    width: 100%;
}
.memory-title-left{
    font-size: 5vh;
    height: 100%;
}
.memory-title-right{
    font-size: 3vh;
    height: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: column-reverse;
}
.memory-description{
    height: 3%;
    width: 100%;
    display: flex;
}
.memory-description-right{
    margin-left: auto;
}
.memory-charts{
    padding-top: 0.5%;
    padding-bottom: 2.5%;
    height: 54%;
    width: 100%;
}
.memory-charts-top{
    height: 70%;
    width: 100%;
}
.memory-bottom{
    height: 30%;
    width: 100%;
    display: flex;
}
.memory-bottom-left{
    height: 100%;
    width: 40%;
}
.memory-bottom-left-line{
    display: flex;
    height: 33.3%;
    width: 100%;
}
.memory-bottom-left-line-item{
    height: 100%;
    margin-right: 2vw;
}
</style>