<template>
    <div class="userManage">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="users">
            <div class="users-head">
                <div class="item"></div>
                <div class="item">KLei ID</div>
                <div class="item">玩家名称</div>
                <div class="item">角色</div>
                <div class="item">生存时间</div>
                <div class="item">在线状态</div>
                <div class="item2">操作</div>
            </div>
            <div class="user" >
                <div class="item"></div>
                <div class="item">KLei ID</div>
                <div class="item">玩家名称</div>
                <div class="item">角色</div>
                <div class="item">生存时间</div>
                <div class="item">在线状态</div>
                <div class="item2">操作</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getUsers } from '../api/userRequest';
import { useClusterStore} from '../store/clusterStore'
import { useUserStore } from '../store/userStore';
export default{
    name:'userManage',
    data(){
        return{
            clusterStore:useClusterStore(),
            userStore:useUserStore(),
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
        handleGetUsers(){
            getUsers(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                this.userStore.users = response.data
                console.log(response.data)
            })
        }
    },
    mounted(){
        this.handleGetUsers();
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
    width: 80%;
}
.users-head{
    width: 100%;
    height: 10%;
    background-color: rgb(212,171,66);
    display: flex;
    align-items: center;
}
.user{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
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
    width: calc(40%);
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-right: 0.3vh solid black; */
    color: black;
    font-size: 2vh;
    font-weight: bolder;
}
</style>