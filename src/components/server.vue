<template>
    <div class="server">
        <div class="item">{{ server.cluster_name }}</div>
        <div class="item">{{ server.server_name }}</div>
        <div class="item">{{ server.game_mode }}</div>
        <div class="item">{{ server.days }}</div>
        <div class="item">{{ server.people_num }}</div>
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
export default{
    name:'server',
    props:{
        server:Object
    },
    data(){
        return{

        }
    },
    methods:{
        handleStart(){
            start(this.server.cluster_name).then()
        },
        handleStop(){
            stop(this.server.cluster_name).then()
        },
        handleSave(){
            save(this.server.cluster_name).then()
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
    border-top: 0.1vh solid black;
}
.server:first-child{
    border-top: 0.1vh solid black;
}
.item{
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
}
</style>