<template>
    <div class="second-menu-container" v-show="tipStore.menu=='add'">
        <div class="second-menu">
            <div class="second-menu-title">选择存档模板</div>
            <div class="second-menu-body">
                <div class="second-menu-close" @click="showMenu('')">X</div>
                <div class="modes">
                    <div class="mode" id="mode-1" @click="changeAddClusterMode('经典模式')">
                        <i class="ri-checkbox-blank-circle-line icon2" v-show="add_cluster_mode!='经典模式'"></i>
                        <i class="ri-checkbox-circle-line icon2" v-show="add_cluster_mode=='经典模式'"></i>
                        <div class="mode-description">经典模式</div>
                    </div>
                    <div class="mode" id="mode-2" @click="changeAddClusterMode('岛屿冒险')">
                        <i class="ri-checkbox-blank-circle-line icon2" v-show="add_cluster_mode!='岛屿冒险'"></i>
                        <i class="ri-checkbox-circle-line icon2" v-show="add_cluster_mode=='岛屿冒险'"></i>
                        <div class="mode-description">岛屿冒险</div>
                    </div>
                    <div class="mode" id="mode-3" @click="changeAddClusterMode('熔炉')">
                        <i class="ri-checkbox-blank-circle-line icon2" v-show="add_cluster_mode!='熔炉'"></i>
                        <i class="ri-checkbox-circle-line icon2" v-show="add_cluster_mode=='熔炉'"></i>
                        <div class="mode-description">熔炉</div>
                    </div>
                </div>
            </div>
            <div class="second-menu-submit" @click="handleAdd">确定</div>
        </div>
    </div>
    <div class="serverList" v-if="!clusterStore.is_detail">
        <server v-for="(server,index) in clusterStore.clusters" :index="index" :key="index" :server="server" @click=changeIndex(index)></server>
        <div class="item" @click="showMenu('add')"><i class="ri-add-circle-line icon"></i></div>
        <div class="item" @click="handleUpload"><i class="ri-upload-cloud-line icon"></i></div>
    </div>
    <div class="server-current" v-if="clusterStore.is_detail">
        <serverDetail :index="clusterStore.index" :server="clusterStore.clusters[clusterStore.index]"></serverDetail>
    </div>
</template>
<script>
import server from '../components/server.vue'
import serverDetail from '../components/serverDetail.vue'
// import serverDetail from './serverDetail.vue';
import { get,add } from '../api/cluserRequest'
import { useClusterStore} from '../store/clusterStore'
import { useTipStore } from '../store/tipStore';
export default{
    name:'serverList',
    components:{
        server,
        serverDetail,
    },
    data(){
        return{
            clusterStore:useClusterStore(),
            tipStore:useTipStore(),
            add_cluster_mode:'经典模式',
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
                if(response.data.status=="error"){
                    this.tipStore.showTip(response.data.message);
                    return
                }
                this.clusterStore.clusters.push(response.data.message)
                this.tipStore.showTip("添加成功");
                this.showMenu('');
            })
        },
        handleUpload(){
            this.tipStore.showTip("功能正在开发中");
        },
        showMenu(data){
            this.tipStore.menu = data;
        },
        changeAddClusterMode(data){
            this.add_cluster_mode = data;
        },
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            this.clusterStore.is_detail = true;
        },
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
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    cursor: pointer;
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
    display: flex;
    justify-content: center;
    font-size: 15vh;
}
.second-menu-container{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3); /* 半透明黑色背景 */
    z-index: 9999;
    justify-content: center;
    align-items: center;
}
.second-menu{
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(110, 81, 47, 1);
    border: 0.6vh solid rgb(169, 118, 63);
    border-radius: 1vh;
    color: black;
}
.second-menu-title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vh;
    color: rgb(224, 173, 71);
    margin-top: 2vh;
}
.second-menu-close{
    position: absolute;
    top: -0vh;
    right: -0.5vw;
    transform: translateY(-100%);
    cursor: pointer;
    font-size: 2vh;
}
.second-menu-body{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5vh;
    line-height: 3vh;
    color: rgb(224, 173, 71);
    margin: 0 1vw;
    margin-top: 0.5vh;
}
.modes{
    display: flex;
    justify-content: center;
}
.mode{
    position: relative;
    height: 25vh;
    width: 15vw;
    margin: 1vh 1vw;
    display: flex;
    flex-direction: column;
    padding: none;
    justify-content: flex-end;
    align-items: center;
    background-size:cover;
    background-position: top;
    background-repeat: no-repeat;
    cursor: pointer;
    border: 0.6vh solid rgb(169, 118, 63);
}
#mode-1{
    background-image: url(../assets/经典模式.jpg);
}
#mode-2{
    background-image: url(../assets/岛屿冒险.jpg);
}
#mode-3{
    background-image: url(../assets/熔炉.jpg);
}
.mode-description{
    position: absolute;
    bottom: -4.5vh;
    font-size: 3vh;
}
.icon2{
    position: absolute;
    bottom: 1vh;
    right: 0.3vw;
    font-size: 5vh;
    color: rgb(35, 232, 35);
}
.second-menu-input{
    height: 3vh;
    width: 8vw;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    text-align: center;
    font-size: 2vh;
    outline: none;
    border: none;
}
/* .second-menu-input:focus{
    border: 0.2vh solid black;
    height: 2.6vh;
    width: calc(8vw - 0.4vh);
} */
.second-menu-submit{
    height: 4vh;
    width: 6vw;
    margin: 5vh auto;
    margin-bottom: 1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(228,196,118);
    border-radius: 1vh;
    border: 0.2vh solid rgb(169, 118, 63);
    font-weight: bold;
    cursor: pointer;
}
.second-menu-submit:hover{
    background-color: rgb(242,222,155);
}
.serverList{
    height: calc(92% + 5vh);
    width:98%;
    margin: 0 1%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: calc(33.33% - 1.34vh);
    gap: 2vh 1vw;
    overflow: auto;
}
.server-current{
    height: calc(92% + 5vh);
    width:98%;
    margin: 0 1%;
}
</style>