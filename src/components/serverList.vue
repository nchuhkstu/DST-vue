<template>
    <div class="head">
        <div class="item">存档名</div>
        <div class="item">房间名</div>
        <div class="item">模式</div>
        <div class="item">天数</div>
        <div class="item">当前人数</div>
        <div class="item">状态</div>
        <div class="item">占用端口</div>
        <div class="item">操作</div>
    </div>
    <div class="container">
        <server v-for="(server,index) in clusterStore.clusters" :index="index" :server="server" @delete="handleDelete"></server>
        <div class="add" >
            <div class="add-item" @click="handleAdd">
                新建<i class="ri-add-circle-line icon"></i>
            </div>
            <div class="add-item">
                上传<i class="ri-upload-cloud-line icon"></i>
            </div>
        </div>
    </div>
</template>
<script>
import server from '../components/server.vue'
import { get,add,Delete } from '../api/cluserRequest'
import { useClusterStore} from '../store/clusterStore'
export default{
    name:'serverList',
    components:{
        server,
    },
    data(){
        return{
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        handleGet(){
            get().then(response=>{
                if(response.data!="false"){
                    this.clusterStore.clusters = response.data;
                }
            })
        },
        handleAdd(){
            add().then(response=>{
                this.clusterStore.clusters.push(response.data)
            })
        },
        handleDelete(cluster_name){
            Delete(cluster_name).then(response=>{
                for(let i=0;i<this.clusterStore.clusters.length;i++){
                    if(this.clusterStore.clusters[i].cluster_name==cluster_name){
                        this.clusterStore.clusters.splice(i, 1);
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
    background-color: rgb(212, 171, 66);
    font-weight: 600;
    font-size: 2.5vh;
    color: black;
}
.item{
    height: 50%;
    width: calc(10% - 0.3vh);
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.3vh solid black;
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
    align-items: center;
    font-size: 3vh;
    border-top: 0.3vh solid rgb(118,82,44);
    border-bottom: 0.3vh solid rgb(118,82,44);
}
.add-item{
    height: calc(60% - 1vh - 0.6vh);
    width: calc(15% - 4vw - 0.6vh);
    padding: 0.5vh 2vw;
    font-size: 2.5vh;
    font-weight: bold;
    background-color: rgb(228,196,118);
    margin: 0 2vw;
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
    display: flex;
    align-items: center;
    justify-content: center;
}
.add-item:hover{
    background-color: rgb(242,222,155);
}
.icon{
    margin-left: 0.5vw;
    font-size: 3vh;
}
</style>