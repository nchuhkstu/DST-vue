<template>
    <div class="server">
        <div class="item">{{ server.cluster_name }}</div>
        <div class="item">{{ server.server_name }}</div>
        <div class="item">{{ server.game_mode }}</div>
        <div class="item">{{ server.days }}</div>
        <div class="item">{{ server.current_players + '/' + server.max_players }}</div>
        <div class="item">{{ server.status }}</div>
        <div class="item">{{ server.port }}</div>
        <div class="operation-container">
            <div class="operation" @click="handleStart">启动</div>
            <div class="operation" @click="handleStop">停止</div>
            <div class="operation" @click="handleSave">存档</div>
            <div class="operation">回档</div>
            <div class="operation">备份</div>
            <div class="operation">重置</div>
            <div class="operation" @click="handleDelete">删除</div>
        </div>
    </div>
</template>
<script>
import { start,stop,save,backtrack } from '../api/serverRequest'
import { useTipStore } from '../store/tipStore';
import { useClusterStore } from '../store/clusterStore';
export default{
    name:'server',
    props:{
        index:Number,
        server:Object
    },
    data(){
        return{
            tipStore:useTipStore(),
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        handleStart(){
            if(this.clusterStore.clusters[this.index].status == "运行中"){
                this.tipStore.showTip("服务器正在运行中");
                return;
            }
            start(this.server.cluster_name).then(response=>{
                this.tipStore.showTip(response.data.message);
                if(response.data.status=="ok"){
                    this.clusterStore.clusters[this.index].status = "运行中";
                }
                else{
                    this.clusterStore.clusters[this.index].status = "启动失败";
                }
            })
        },
        handleStop(){
            stop(this.server.cluster_name).then(response=>{
                this.tipStore.showTip(response.data.message);
            })
        },
        handleSave(){
            if(this.clusterStore.clusters[this.index].status != "运行中"){
                this.tipStore.showTip("服务器尚未运行");
                return;
            }
            save(this.server.cluster_name).then(response=>{
                this.tipStore.showTip(response.data.message);
            })
        },
        handleDelete(){
            this.$emit('delete',this.server.cluster_name);
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.server{
    height: 11.11%;
    width: 100%;
    display: flex;
    border-top: 0.3vh solid rgb(118,82,44);
}
.server:first-child{
    border-top: none;
}
.item{
    font-size: 2vh;
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.operation-container{
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.operation{
    margin: 0 0.75vw;
    cursor: pointer;
}
</style>