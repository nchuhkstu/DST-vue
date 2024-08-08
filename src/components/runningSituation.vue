<template>
    <div class="runninSituation">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="log-container">
            <div class="log-top">
                <div>运行日志</div>
                <div @click="getLog" style="margin-left: auto;cursor: pointer;">
                    刷新<i class="ri-refresh-line"></i>
                </div>
            </div>
            <div class="log-mid" id="log">
                <div class="log-line" v-if="clusterStore.clusters[clusterStore.index]" v-for="text in logStore.log[clusterStore.clusters[clusterStore.index].cluster_name]">
                    [<label class="log-time">{{ text.time }}</label>]:
                    <label class="log-message">{{ text.message }}</label>
                </div>
            </div>
            <div class="log-bottom">
                <input class="log-input" placeholder="...自定义远程命令" v-model="command"></input>
                <div class="log-button" @click="customCommand">发送</div>
            </div>
        </div>
        <div class="resource-container">
            <div class="cpu-container">
                <div class="cpu">
                    <cpuUsage :text="'地面cpu占用率'" :progress="60"></cpuUsage>
                </div>
                <div class="cpu">
                    <cpuUsage :text="'洞穴cpu占用率'"></cpuUsage>
                </div>
            </div>
            <div class="memory-container">

            </div>
            <div class="network-container">

            </div>
        </div>
    </div>
</template>
<script>
import cpuUsage from './cpuUsage.vue'
import { useLogStore } from '../store/logStore'
import { useClusterStore} from '../store/clusterStore'
import { getLog } from '../api/cluserRequest';
import { customCommand } from '../api/serverRequest';
import { useTipStore } from '../store/tipStore';
export default{
    name:'runningSituation',
    components:{
        cpuUsage,
    },
    data(){
        return{
            texts:[],
            logStore:useLogStore(),
            clusterStore:useClusterStore(),
            tipStore:useTipStore(),
            command:"",
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            const cluster_name = this.clusterStore.clusters[this.clusterStore.index].cluster_name;
            if(this.logStore.log[cluster_name] == null){
                this.getLog();
            }

        },
        goBottom(){
            var container = document.getElementById('log');
            if (container) {
                container.scrollTop = container.scrollHeight - container.clientHeight;
            }
        },
        getLog(){
            if(!this.clusterStore.clusters[this.clusterStore.index])
                return;
            const cluster_name = this.clusterStore.clusters[this.clusterStore.index].cluster_name;
            getLog(cluster_name).then(response=>{
                this.logStore.setLog(cluster_name,response.data);
                this.$nextTick(()=>{
                    this.clusterStore.refreshIndex();
                })
            })
        },
        customCommand(){
            if(this.clusterStore.clusters[this.clusterStore.index]==null||this.clusterStore.clusters[this.clusterStore.index].status != "运行中"){
                this.tipStore.showTip("服务器尚未运行");
                return;
            }
            const cluster_name = this.clusterStore.clusters[this.clusterStore.index].cluster_name;
            customCommand(cluster_name,this.command).then(response=>{
                this.tipStore.showTip("命令已发送");
                this.clusterStore.refreshIndex();
                this.command = "";
            })
        }
    },
    mounted(){
        this.goBottom();
        this.getLog();
    },
    activated(){
        if(!this.clusterStore.clusters[this.clusterStore.index])
            return;
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.runninSituation{
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
}
.list{
    position: absolute;
    width: calc(13% - 1.2vh);
    height: calc(90% + 5.5vh - 1.2vh);
    left: 1%;
    top: 0vh;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    overflow: auto;
}
.list-item{
    width: 90%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vh;
    margin: 1vh 5%;
    cursor: pointer;
    border-radius: 1vh;
}
.list-item.selected{
    background-color: rgb(110,81,47);
    color: rgb(224,173,71);
}
.list-item:hover{
    background-color: rgb(110,81,47);
    color: rgb(224,173,71);
}
.log-container{
    height: calc(90% + 5vh);
    margin-left: 15%;
    margin-top: 0vh;
    width: 60%;
}
.log-top{
    height: calc(5% - 0.6vh);
    width: calc(100% - 1.2vh - 1vw);
    padding: 0% 0.5vw;
    display: flex;
    align-items: center;
    font-size: 2vh;
    background-color: rgba(110, 81, 47, 0.3);
    color: black;
    font-weight: bold;
    border: 0.6vh solid rgb(118,82,44);
    border-bottom: none;
    color: rgb(224,173,71);
}
.log-mid{
    height: calc(86% - 0.6vh);
    width: calc(100% - 1.2vh - 1vw);
    padding: 0 0.5vw;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-top: none;
    font-size: 1.5vh;
    overflow: auto;
}
.log-line{
    width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgb(255,215,0);
}
.log-time{
    color: rgb(181,206,168);
}
.log-message{
    color: white;
}
.log-bottom{
    margin-top: 2%;
    height: 7%;
    width: 100%;
    display: flex;
}
.log-input{
    height: calc(100% - 1.2vh);
    padding: 0 0.5vw;
    width: calc(85% - 1vw - 1.2vh);
    background-color: rgba(110, 81, 47, 0.6);
    color: white;
    border: 0.6vh solid rgb(118,82,44);
    outline: none;
    font-size: 2.5vh;
}
.log-button{
    height: calc(100% - 1vh -0.6vh);
    width: calc(15% - 4vw - 0.6vh);
    margin-left: 3%;
    background-color: rgb(228,196,118);
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
    padding: 0.5vh 2vw;
    display: flex;
    font-size: 2.5vh;
    font-weight: bold;
    align-items: center;
    justify-content: center;
}
.log-button:hover{
    background-color: rgb(242,222,155);
}
.resource-container{
    height: calc(90% + 5vh);
    width: 22%;
    margin-left: 1%;
    margin-top: 0vh;
}
.cpu-container{
    width: 100%;
    height: 30%;
    margin-bottom: 11.1%;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
}
.cpu{
    height: 8vh;
    margin-top: 2vh;
    width: 100%;
}
.memory-container{
    width: 100%;
    height: 30%;
    margin-bottom: 11.1%;
}
.network-container{
    width: 100%;
    height: 30%;
}

</style>