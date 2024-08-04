<template>
    <div class="head">
        <div class="item">存档名</div>
        <div class="item">房间名</div>
        <div class="item">风格</div>
        <div class="item">天数</div>
        <div class="item">当前人数</div>
        <div class="item">状态</div>
        <div class="item">占用端口</div>
        <div class="item">操作</div>
    </div>
    <div class="container">
        <server v-for="server in servers" :server="server" @delete="handleDelete"></server>
        <div class="add" >
            <div class="add-item" @click="handleAdd"><i class="ri-add-circle-line"></i></div>
            <div class="add-item" @click="handleAdd">添加</div>
        </div>
    </div>
</template>
<script>
import server from '../components/server.vue'
import { get,add,Delete } from '../api/cluserRequest'
export default{
    name:'serverList',
    components:{
        server,
    },
    data(){
        return{
            servers:[],
        }
    },
    methods:{
        handleGet(){
            get().then(response=>{
                this.servers = response.data
            })
        },
        handleAdd(){
            add().then(response=>{
                this.servers.push(response.data)
                console.log(response.data)
            })
        },
        handleDelete(cluster_name){
            Delete(cluster_name).then(response=>{
                for(let i=0;i<this.servers.length;i++){
                    if(this.servers[i].cluster_name==cluster_name){
                        this.servers.splice(i, 1);
                        break;
                    }
                }
            })
        }
    },
    mounted(){
        this.handleGet()
    }
}
</script>
<style scoped>
.head{
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(207, 182, 107);
    font-weight: bolder;
    color: black;
}
.item{
    height: 40%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.2vh solid black;
}
.item:last-child{
    width: 30%;
    border: none;
}
.container{
    height: 90%;
    width: 100%;
    overflow: auto;
}
.add{
    height: 11.11%;
    display: flex;
    justify-content: center;
    font-size: 3vh;
    border-top: 0.1vh solid black;
    border-bottom: 0.1vh solid black;
    cursor: pointer;
}
.add:hover{
    color: rgb(224, 173, 71);
    background-color: rgb(83, 64, 41);
}
.add-item{
    height: 100%;
    display: flex;
    align-items: center;
}
</style>