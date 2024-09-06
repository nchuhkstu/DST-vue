<template>
    <div class="userManage">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="users">
            <div class="users-head">
                <div class="item">角色</div>
                <div class="item">KLei ID</div>
                <div class="item" style="width: 15%;">玩家名称</div>
                <div class="item">归属</div>
                <div class="item">生存时间</div>
                <div class="item">在线状态</div>
                <div class="item2">操作</div>
            </div>
            <div class="user-container">
                <div class="user" v-for="(value,key) in userStore.users">
                    <div class="user-item"><img class="user-avatar" :src="fromatRole(value.role)"></div>
                    <div class="user-item">{{ key }}</div>
                    <div class="user-item" style="width: calc(15% - 2vw);justify-content: start;padding-left: 2vw;">玩家名称</div>
                    <div class="user-item">{{ value.player }}</div>
                    <div class="user-item">{{ fromatSurvivalTime(value.survivalTime) }}</div>
                    <div class="user-item">{{ fromatOnline(value.online) }}</div>
                    <div class="user-item2">
                        <div class="operation" @click="handleSetAdmin(key)">设置管理员</div>
                        <div class="operation" @click="handleDeleteAdmin(key)">取消管理员</div>
                        <div class="operation" @click="handleKick(key)">踢出服务器</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getUsers,setAdmin,deleteAdmin,kick } from '../api/userRequest';
import { useClusterStore} from '../store/clusterStore'
import { useUserStore } from '../store/userStore';
import { useTipStore } from '../store/tipStore';
export default{
    name:'userManage',
    data(){
        return{
            clusterStore:useClusterStore(),
            userStore:useUserStore(),
            tipStore:useTipStore(),
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            this.handleGetUsers();
        },
        handleGetUsers(){
            getUsers(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                this.userStore.users = response.data
                console.log(response.data)
            })
        },
        handleSetAdmin(userid){
            setAdmin(this.clusterStore.clusters[this.clusterStore.index].cluster_name,userid).then(response=>{
                if(response.data.status=="ok"){
                    this.tipStore.showTip(response.data.message)
                }
            })
        },
        handleDeleteAdmin(userid){
            deleteAdmin(this.clusterStore.clusters[this.clusterStore.index].cluster_name,userid).then(response=>{
                if(response.data.status=="ok"){
                    this.tipStore.showTip(response.data.message)
                }
            })
        },
        handleKick(userid){
            kick(this.clusterStore.clusters[this.clusterStore.index].cluster_name,userid).then(response=>{
                if(response.data.status=="ok"){
                    this.tipStore.showTip(response.data.message)
                }
            })
        },
        fromatRole(role){
            return "../../public/avatar/" + role + "_true.png";
        },
        fromatSurvivalTime(survivalTime){
            return (survivalTime / 480).toFixed(1) + '天';
        },
        fromatOnline(online){
            if (online == "outline")
                return "离线";
            return "在线";
        }
    },
    mounted(){
        this.handleGetUsers();
    },
    activated(){
        if(!this.clusterStore.clusters[this.clusterStore.index])
            return;
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.userManage{
    height: 100%;
    width: 100%;
    position: relative;
}
.list{
    position: absolute;
    width: calc(13% - 1.2vh);
    height: calc(92% + 5.5vh - 1.2vh);
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
.users{
    margin-left: 15%;
    height: calc(92% + 5vh);
    width: 85%;
}
.users-head{
    width: 100%;
    height: 10%;
    background-color: rgb(212,171,66);
    display: flex;
    align-items: center;
}
.user-container{
    width: 100%;
    height: 90%;
    overflow-y: auto;
}
.user{
    width: 100%;
    height: calc(12% - 0.3vh);
    display: flex;
    align-items: center;
    border-bottom: 0.3vh solid rgb(118, 82, 44);
}
.item{
    height: 50%;
    width: calc(10% - 0.3vh);
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.3vh solid black;
    color: black;
    font-size: 2vh;
    font-weight: bolder;
}
.item2{
    height: 50%;
    width: calc(35%);
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-right: 0.3vh solid black; */
    color: black;
    font-size: 2vh;
    font-weight: bolder;
}
.user-item{
    height: 50%;
    width: calc(10%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(201, 173, 117);
    font-size: 2vh;
    font-weight: bolder;
}
.user-item2{
    height: 50%;
    width: calc(35%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(201, 173, 117);
    font-size: 2vh;
    font-weight: bolder;
}
.user-avatar{
    height: 80%;
    width: 30%;
}
.operation{
    width: 33%;
    text-align: center;
    cursor: pointer;
}
</style>