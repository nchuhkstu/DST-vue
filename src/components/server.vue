<template>
    <div class="server">
        <div class="second-menu-container" v-show="tipStore.menu=='backTrack' + server.cluster_name">
            <div class="second-menu">
                <div class="second-menu-body">
                    <div class="second-menu-close" @click="showMenu('')">X</div>
                    回档:<input class="second-menu-input" v-model="days">快照
                </div>
                <div class="second-menu-submit" @click="handleBackTrack()">确定</div>
            </div>
        </div>
        <div class="second-menu-container" v-show="tipStore.menu=='stop' + server.cluster_name">
            <div class="second-menu">
                <div class="second-menu-body">
                    <div class="second-menu-close" @click="showMenu('')">X</div>
                    确定要停止此服务器吗
                </div>
                <div class="second-menu-submit" @click="handleStop">确定</div>
            </div>
        </div>
        <div class="second-menu-container" v-show="tipStore.menu=='delete' + server.cluster_name">
            <div class="second-menu">
                <div class="second-menu-body">
                    <div class="second-menu-close" @click="showMenu('')">X</div>
                    确定要删除此存档吗
                </div>
                <div class="second-menu-submit" @click="handleDelete">确定</div>
            </div>
        </div>
        <div class="item">存档名称：{{ server.cluster_name }}</div>
        <div class="item">房间名称：{{ server.server_name }}</div>
        <div class="item">游戏模式：{{ server.game_mode }}</div>
        <div class="item">当前天数：{{ server.days }}</div>
        <div class="item">游玩人数：{{ server.current_players + '/' + server.max_players }}</div>
        <div class="item">占用端口：{{ server.port }}</div>
        <div class="item status" :id="'status' + server.cluster_name">游戏状态：{{ server.status }}<i class="ri-alarm-warning-line"></i></div>
    </div>
</template>
<script>
import { start,stop,save,backtrack } from '../api/serverRequest'
import { Delete } from '../api/cluserRequest';
import { useTipStore } from '../store/tipStore';
import { useClusterStore } from '../store/clusterStore';
export default{
    name:'server',
    props:{
        index:Number,
        server:Object,
    },
    data(){
        return{
            tipStore:useTipStore(),
            clusterStore:useClusterStore(),
            days:1,
        }
    },
    methods:{
        handleStart(){
            if(this.clusterStore.clusters[this.index].status == "运行中" || this.clusterStore.clusters[this.index].status == "启动中"){
                this.tipStore.showTip("服务器正在" + this.clusterStore.clusters[this.index].status);
                return;
            }
            start(this.server.cluster_name).then(response=>{
                this.tipStore.showTip(response.data.message);
                if(response.data.status=="ok"){
                    this.clusterStore.clusters[this.index].status = "启动中";
                    document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
                }
                else{
                    this.clusterStore.clusters[this.index].status = "启动失败";
                }
            })
        },
        handleStop(){
            stop(this.server.cluster_name).then(response=>{
                this.showMenu('');
                this.tipStore.showTip(response.data.message);
                this.clusterStore.clusters[this.index].status = "未启动";
                document.getElementById("status" + this.server.cluster_name).style.color = 'red';
            })
        },
        handleSave(){
            save(this.server.cluster_name).then(response=>{
                this.tipStore.showTip(response.data.message);
            })
        },
        showMenu(data){
            this.tipStore.menu = data;
        },
        handleBackTrack(){
            backtrack(this.server.cluster_name,this.days).then(response=>{
                this.showMenu('');
                this.tipStore.showTip(response.data.message);
            })
        },
        handleDelete(){
            if(this.clusterStore.clusters[this.index].status == "运行中" || this.clusterStore.clusters[this.index].status == "启动中"){
                this.tipStore.showTip("服务器正在" + this.clusterStore.clusters[this.index].status + ",无法删除");
                this.showMenu('');
                return;
            }
            Delete(this.server.cluster_name).then(response=>{
                if(response.data.status == 'ok')
                    this.clusterStore.clusters.splice(this.index, 1);
                this.tipStore.showTip(response.data.message);
                this.showMenu('');
            })
        },
        handleRemake(){
            this.tipStore.showTip('功能正在开发中，尽情期待');
        },
        handleBackUp(){
            this.tipStore.showTip('功能正在开发中，尽情期待');
        }
    },
    mounted(){
        if(this.server.status == '运行中' || this.server.status == '启动中'){
            document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
        }
    },
    updated(){
        // if(this.server.status == '运行中' || this.server.status == '启动中'){
        //     document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
        // }
    }
}
</script>
<style scoped>
.server{
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1vh 0.5vw;
    cursor: pointer;
}
.item{
    font-size: 2vh;
    width: 100%;
    display: flex;
    align-items: center;
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
    margin-top: 3vh;
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
    width: 5.5vw;
    margin: 2vh auto;
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
.status{
    color:rgb(116, 210, 39);
    font-weight: bold;
    color: red;
}
</style>