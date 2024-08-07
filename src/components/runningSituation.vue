<template>
    <div class="runninSituation">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="log-container">
            <div class="log" id="log">
                <div class="log-line"v-for="text in logStore.log[clusterStore.clusters[clusterStore.index].cluster_name]">
                    [<label class="log-time">{{ text.time }}</label>]:
                    <label class="log-message">{{ text.message }}</label>
                </div>
            </div>
            <div class="log-bottom">
                <input class="log-input"></input>
                <div class="log-button"></div>
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
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
        goBottom(){
            var container = document.getElementById('log');
            if (container) {
                container.scrollTop = container.scrollHeight - container.clientHeight;
            }
        }
    },
    mounted(){
        this.goBottom();
    },
    activated(){
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
    left: 2%;
    top: 0vh;
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    overflow: auto;
}
.list-item{
    width: 90%;

    height: 12.5%;
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
    margin-left: 17%;
    margin-top: 0vh;
    width: 60%;
}
.log{
    height: calc(90% - 1.2vh);
    width: calc(100% - 1.2vh - 1vw);
    padding: 0 0.5vw;
    background-color: rgb(143,120,90);
    border: 0.6vh solid black;
    font-size: 1.5vh;
    overflow: auto;
}
.log-line{
    width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: blue;
}
.log-time{
    color: yellow;
}
.log-message{
    color: white;
}
.log-bottom{
    margin-top: 3%;
    height: 7%;
    width: 100%;
    display: flex;
}
.log-input{
    height: calc(100% - 1.2vh);
    padding: 0 0.5vw;
    width: calc(80% - 1vw - 1.2vh);
    background-color: rgb(143,120,90);
    color: white;
    border: 0.6vh solid black;
    outline: none;
    font-size: 2.5vh;
}
.log-button{
    height: 100%;
    width: 15%;
    margin-left: 5%;
    background-color: yellow;
}
.resource-container{
    height: calc(80% + 5vh);
    width: 20%;
    margin-left: 2%;
    margin-top: 3vh;
    background-color: aquamarine;
}
.cpu-container{
    width: 100%;
    height: 30%;
    margin-bottom: 11.1%;
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