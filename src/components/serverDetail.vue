<template>
    <div class="serverDetail">
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
        <div class="detail-left">
            <div class="top">
                <div class="room">
                    <div class="information">
                        <div class="item">存档名称：{{ server.cluster_name }}</div>
                        <div class="item">房间名称：{{ server.server_name }}</div>
                        <div class="item">游戏模式：{{ server.game_mode }}</div>
                        <div class="item">当前天数：{{ server.days }}</div>
                        <div class="item">游玩人数：{{ server.current_players + '/' + server.max_players }}</div>
                        <div class="item">占用端口：{{ server.port }}</div>
                        <div class="item status" :id="'status' + server.cluster_name">游戏状态：{{ server.status }}<i class="ri-alarm-warning-line"></i></div>
                    </div>
                    <div class="operation-container">
                        <div class="operation" @click="handleStart">启动</div>
                        <div class="operation" @click="showMenu('stop' + server.cluster_name)">停止</div>
                        <div class="operation" @click="handleSave">存档</div>
                        <div class="operation" @click="showMenu('backTrack' + server.cluster_name)">回档</div>
                        <div class="operation">备份</div>
                        <div class="operation">下载</div>
                        <div class="operation" @click="showMenu('delete' + server.cluster_name)">删除</div>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-title">聊天记录</div>
                    <div class="chat-content"></div>
                </div>
            </div>
            <div class="bottom">
                <div class="user">
                    <div class="user-online">
                        <div class="user-online-title">在线玩家</div>
                        <div class="user-online-content">
                            <div class="user-card" v-for="(value,key) in userStore.users">
                                <img class="user-role" :src="'/static/avatar/' + value.role + '_true.png'">
                                <div class="user-name">{{ value.name }}</div>
                                <div class="user-days">{{ (value.survivalTime / 480).toFixed(1) }}天</div>
                            </div>
                        </div>
                    </div>
                    <div class="user-chart">
                        <div class="user-chart-title">活跃概况</div>
                        <div class="user-chart-content"></div>
                    </div>
                </div>
                <div class="rank">
                    <div class="rank-title">生存排行榜</div>
                    <div class="rank-title-content">
                        <div class="user-card" v-for="(value,key) in userStore.users">
                            <img class="user-role" :src="'/static/avatar/' + value.role + '_true.png'">
                            <div class="user-name">{{ value.name }}</div>
                            <div class="user-days">{{ (value.survivalTime / 480).toFixed(1) }}天</div>
                        </div>
                    </div>
                </div>
                <div class="log">
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
                        <input class="log-input" placeholder="...自定义远程命令" v-model="command" @keyup.enter="customCommand"></input>
                        <div class="log-button" @click="customCommand">发送</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="resource-container">
                <div class="resource-container-item">
                    <div class="resource-item-title">CPU占用率(单核心)</div>
                    <div class="resource-item">
                        <cpuUsage :text="'地面'" :progress="Number(parseFloat(systemStore.process_cpu_usage[clusterStore.clusters[clusterStore.index]?.cluster_name]?.['master'] ?? 0).toFixed(0))"></cpuUsage>
                    </div>
                    <div class="resource-item">
                        <cpuUsage :text="'洞穴'" :progress="Number(parseFloat(systemStore.process_cpu_usage[clusterStore.clusters[clusterStore.index]?.cluster_name]?.['caves'] ?? 0).toFixed(0))"></cpuUsage>
                    </div>
                </div>
                <div class="resource-container-item">
                    <div class="resource-item-title">内存占用</div>
                    <div class="resource-item">
                        <memoryUsage :text="'地面'" :progress="Number(parseFloat(systemStore.process_memory_usage[clusterStore.clusters[clusterStore.index]?.cluster_name]?.['master'] ?? 0).toFixed(0))"></memoryUsage>
                    </div>
                    <div class="resource-item">
                        <memoryUsage :text="'洞穴'" :progress="Number(parseFloat(systemStore.process_memory_usage[clusterStore.clusters[clusterStore.index]?.cluster_name]?.['caves'] ?? 0).toFixed(0))"></memoryUsage>
                    </div>
                </div>
                <div class="resource-container-item">
                    <div class="resource-item-title">网络占用</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { start,stop,save,backtrack } from '../api/serverRequest'
import { Delete } from '../api/cluserRequest';
import { useTipStore } from '../store/tipStore';
import { useClusterStore } from '../store/clusterStore';
import { useSystemStore } from '../store/systemStore';
import { getLog } from '../api/cluserRequest';
import { customCommand } from '../api/serverRequest';
import cpuUsage from './cpuUsage.vue'
import memoryUsage from './memoryUsage.vue'
import { useLogStore } from '../store/logStore';
import { useUserStore } from '../store/userStore';
import { getUsers } from '../api/userRequest';
export default{
    name:'serverDetail',
    props:{
        index:Number,
        server:Object,
    },
    components:{
        cpuUsage,
        memoryUsage,
    },
    data(){
        return{
            tipStore:useTipStore(),
            clusterStore:useClusterStore(),
            systemStore:useSystemStore(),
            logStore:useLogStore(),
            userStore:useUserStore(),
            days:1,
            command:"",
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
                this.clusterStore.is_detail = false;
            })
        },
        handleRemake(){
            this.tipStore.showTip('功能正在开发中，尽情期待');
        },
        handleBackUp(){
            this.tipStore.showTip('功能正在开发中，尽情期待');
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
        },
        handleGetUsers(){
            getUsers(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                this.userStore.users = response.data
            })
        },
    },
    mounted(){
        if(this.server.status == '运行中' || this.server.status == '启动中'){
            document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
        }
        this.handleGetUsers();
        this.getLog();
    },
    updated(){
        // if(this.server.status == '运行中' || this.server.status == '启动中'){
        //     document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
        // }
    }
}
</script>
<style scoped>
.serverDetail{
    height: calc(100%);
    width: calc(100%);
    border-radius: 1vh;
    display: flex;
}

.detail-left{
    height: 100%;
    width: 80%;
}
.top{
    height: 35%;
    width: 100%;
    display: flex;
}
.room{
    height: calc(100% - 1.2vh - 2vh);
    width: calc(45% - 1.2vh - 1vw);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    display: flex;
    padding: 1vh 0.5vw;
    background-color: rgba(110, 81, 47, 0.6);
}
.bottom{
    height: calc(65% - 1%);
    width: 100%;
    display: flex;
    margin-top: 1%;
}
.user{
    height: calc(100%);
    width: calc(30%);
    border-radius: 1vh;
}
.user-online{
    height: calc(50% - 1.2vh);
    width: calc(100% - 1.2vh);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
}
.user-online-title{
    height: 3.5vh;
    width: calc(100% - 1vw);
    padding: 0 0.5vw;
    display: flex;
    align-items: center;
    font-size: 2vh;
    background-color: rgba(110, 81, 47, 0.3);
    font-weight: bold;
    color: rgb(224,173,71);
}
.user-online-content{
    height: calc(100% - 3.5vh);
    width: 100%;
    background-color: rgba(110, 81, 47, 0.6);
    overflow: auto;
}
.user-card{
    width: 100%;
    height: 5vh;
    display: flex;
    margin-bottom: 0.5vh;
}
.user-role{
    height: 4vh;
    width: 4vh;
    margin: 0.5vh 0.5vh;
}
.user-name{
    font-size: 2.5vh;
    display: flex;
    align-items: center;
}
.user-days{
    font-size: 2vh;
    margin-left: auto;
    margin-right: 1.5vw;
    display: flex;
    align-items: center;
}
.user-chart{
    height: calc(50% - 1vh - 1.2vh);
    width: calc(100% - 1.2vh);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    margin-top: 1vh;
}
.user-chart-title{
    height: 3.5vh;
    width: calc(100% - 1vw);
    padding: 0 0.5vw;
    display: flex;
    align-items: center;
    font-size: 2vh;
    background-color: rgba(110, 81, 47, 0.3);
    font-weight: bold;
    color: rgb(224,173,71);
}
.user-chart-content{
    height: calc(100% - 3.5vh);
    width: 100%;
    background-color: rgba(110, 81, 47, 0.6);
}
.rank{
    height: calc(100% - 1.2vh);
    width: calc(20% - 1.2vh - 1%);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    margin-left: 1%;
}
.rank-title{
    height: 3.5vh;
    width: calc(100% - 1vw);
    padding: 0 0.5vw;
    display: flex;
    align-items: center;
    font-size: 2vh;
    background-color: rgba(110, 81, 47, 0.3);
    font-weight: bold;
    color: rgb(224,173,71);
}
.rank-title-content{
    height: calc(100% - 3.5vh);
    width: 100%;
    background-color: rgba(110, 81, 47, 0.6);
}
.log{
    height: calc(100%);
    width: calc(50% - 1%);
    border-radius: 1vh;
    margin-left: 1%;
}
.log-top{
    height: calc(4.1vh - 0.6vh);
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
    height: calc(91% - 4.2vh - 0.6vh);
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
    word-break:break-all;
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
    width: calc(15% - 2vw - 0.6vh);
    margin-left: 3%;
    background-color: rgb(228,196,118);
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
    padding: 0.5vh 1vw;
    display: flex;
    font-size: 2vh;
    font-weight: bold;
    align-items: center;
    justify-content: center;
}
.log-button:hover{
    background-color: rgb(242,222,155);
}
.information{
    height: calc(100%);
    width: calc(66.66%);
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.item{
    font-size: 2vh;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
}
.operation-container{
    height: calc(100%);
    width: calc(33.33% - 1vw);
    margin-left: 1vw;
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.operation{
    margin: 0 0.75vw;
    cursor: pointer;
    background-color: rgb(228,196,118);
    border-radius: 1vh;
    color: black;
    border: 0.3vh solid rgb(118,82,44);
    padding: 0vh 1vw;
    display: flex;
    font-size: 2vh;
    font-weight: bold;
    align-items: center;
    justify-content: center;
}
.operation:hover{
    background-color: rgb(242,222,155);
}
.chat-container{
    height: calc(100% - 1.2vh);
    width: calc(55% - 1.2vh - 1%);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    margin-left: 1%;
}
.chat-title{
    height: 3.5vh;
    width: calc(100% - 1vw);
    padding: 0 0.5vw;
    display: flex;
    align-items: center;
    font-size: 2vh;
    background-color: rgba(110, 81, 47, 0.3);
    font-weight: bold;
    color: rgb(224,173,71);
}
.chat-content{
    height: calc(100% - 3.5vh);
    width: 100%;
    background-color: rgba(110, 81, 47, 0.6);
}
.bottom{

}
.detail-right{
    width: calc(20% - 1%);
    height: 100%;
    margin-left: 1%;
}
.resource-container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
.resource-container-item{
    height: calc(33.3% - 1.33vh - 1.2vh);
    width: calc(100% - 1.2vh);
    background-color: rgba(110, 81, 47, 0.6);
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
}
.resource-item{
    height: calc(50% - 1.75vh - 4vh);
    padding: 2vh 0;
    width: 100%;
}
.resource-item-title{
    border-top-left-radius: 0.5vh;
    border-top-right-radius: 0.5vh;
    padding-left: 0.5vw;
    width: calc(100% - 0.5vw);
    height: 3.5vh;
    display: flex;
    align-items: center;
    font-size: 2vh;
    font-weight: bold;
    background-color: rgb(75,56,34);
    color: rgb(224,173,71);
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