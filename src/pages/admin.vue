<template>
    <div id="admin" class="admin">
        <div class="tip" id="tip">{{tipStore.tip}}</div>
        <div class="admin-left">
            <div class="logo">
                鱼神饥荒开服面板
            </div>
            <div class="navigation-container">
                <div class="navigation selected" id="serverList" @click="changeComponent('serverList')">
                    <div class="navigation-icon"><i class="ri-server-line"></i></div>
                    <div class="navigation-font">控制台</div>
                    <div class="change-button" v-if="clusterStore.is_detail && activeComponent == 'serverList'" @click="back"><i class="ri-arrow-go-back-line"></i></div>
                </div>
                <div class="navigation" id="map" @click="changeComponent('map')">
                    <div class="navigation-icon"><i class="ri-map-2-line"></i></div>
                    <div class="navigation-font">地图数据</div>
                </div>
                <div class="navigation" id="userManage" @click="changeComponent('userManage')">
                    <div class="navigation-icon"><i class="ri-user-line"></i></div>
                    <div class="navigation-font">玩家管理</div>
                </div>
                <div class="navigation" id="roomSet" @click="changeComponent('roomSet')">
                    <div class="navigation-icon"><i class="ri-home-4-line"></i></div>
                    <div class="navigation-font">房间设置</div>
                </div>
                <div class="navigation" id="worldSet" @click="changeComponent('worldSet')">
                    <div class="navigation-icon"><i class="ri-earth-line"></i></div>
                    <div class="navigation-font">世界设置</div>
                </div>
                <div class="navigation" id="modSet" @click="changeComponent('modSet')">
                    <div class="navigation-icon"><i class="ri-box-3-line"></i></div>
                    <div class="navigation-font">模组设置</div>
                </div>
                <div class="navigation" id="resourceUsage" @click="changeComponent('resourceUsage')">
                    <div class="navigation-icon"><i class="ri-line-chart-line"></i></div>
                    <div class="navigation-font">资源占用</div>
                </div>
                <div class="navigation" id="systemSet" @click="changeComponent('systemSet')">
                    <div class="navigation-icon"><i class="ri-settings-line"></i></div>
                    <div class="navigation-font">系统设置</div>
                </div>
            </div>
        </div>
        <div class="admin-right">
            <div class="attention-container">
                <div class="attention">未经授权,禁止商用</div>
                <div class="attention">面板版本 : 1.5.0</div>
                <div class="attention">游戏版本:{{version}}</div>
                <div class="link"></div>
            </div>
            <div class="function">
                <KeepAlive>
                    <component :is="activeComponent"></component>
                </KeepAlive>
            </div>
        </div>
    </div>
</template>
<script>
import serverList from '../components/serverList.vue'
import userManage from '../components/userManage.vue'
import roomSet from '../components/roomSet.vue'
import worldSet from '../components/worldSet.vue'
import modSet from '../components/modSet.vue'
import resourceUsage from '../components/resourceUsage.vue'
import systemSet from '../components/systemSet.vue'
import 'remixicon/fonts/remixicon.css'
import io from 'socket.io-client';
import { useLogStore } from '../store/logStore'
import { useTipStore } from '../store/tipStore'
import { useSystemStore } from '../store/systemStore'
import { getSystemInfo,gameVersion } from '../api/systemRequest';
import { backtrack } from '../api/serverRequest'
import { useClusterStore } from '../store/clusterStore'
import { useDownloadStore } from '../store/downloadStore'
import { useChatStore } from '../store/chatStore'
import { useUserStore } from '../store/userStore'
import { version } from 'vue'
import map from '../components/map.vue'
export default{
    components:{
        serverList,
        userManage,
        roomSet,
        worldSet,
        modSet,
        resourceUsage,
        systemSet,
        map,
    },
    data(){
        return{
            activeComponent:'serverList',
            // socketio:io('http://192.168.1.4:8081',{transports:['websocket']}),
            // socketio:io('http://127.0.0.1:5000',{transports:['websocket']}),
            socketio:io(window.location.host,{transports:['websocket']}),
            logStore:useLogStore(),
            tipStore:useTipStore(),
            systemStore:useSystemStore(),
            clusterStore:useClusterStore(),
            downloadStore:useDownloadStore(),
            chatStore:useChatStore(),
            userStore:useUserStore(),
            version:'XXXXXX'
        }
    },
    methods:{
        changeComponent(component){
            this.activeComponent = component;
            document.querySelectorAll('.navigation').forEach(item => {
                item.classList.remove('selected');
            });
            document.getElementById(component).classList.add('selected');
        },
        handleGetSystemInfo(){
            getSystemInfo().then(response=>{
                this.systemStore.cpu_information_static = response.data;
                const dynamicStyle = document.createElement('style');
                if(response.data.core_num_logical==12){
                    dynamicStyle.textContent = `
                        .cpu-chart {
                            height: calc(33% - 0.33vh);
                            width: calc(25% - 0.375vh);
                        }
                    `;
                }
                else if(response.data.core_num_logical==16){
                    dynamicStyle.textContent = `
                        .cpu-chart {
                            height: calc(25% - 0.375vh);
                            width: calc(25% - 0.375vh);
                        }
                    `;
                }
                else if(response.data.core_num_logical==4){
                    dynamicStyle.textContent = `
                        .cpu-chart {
                            height: calc(50% - 0.75vh);
                            width: calc(50% - 0.75vh);
                        }
                    `;
                }
                else if(response.data.core_num_logical==8){
                    dynamicStyle.textContent = `
                        .cpu-chart {
                            height: calc(50% - 0.75vh);
                            width: calc(25% - 0.375vh);
                        }
                    `;
                }
                document.head.appendChild(dynamicStyle);
            })
        },
        handleGetGameVersion(){
            gameVersion().then(response=>{
                if(response.data.status == "ok")
                    this.version = response.data.message;
            })
        },
        back(){
            this.clusterStore.is_detail = false;
        },
        init(){
            this.socketio.on('log',(data)=>{
                this.logStore.addLog(data);
            })
            this.socketio.on('system_information',(data)=>{
                this.systemStore.refreshRunningInformation(data);
            })
            this.socketio.on('process_cpu_usage',(data)=>{
                this.systemStore.refreshProcessCpuUsage(data);
            })
            this.socketio.on('server_update_current_players',(data)=>{
                for(let i=0;i<this.clusterStore.clusters.length;i++){
                    if(this.clusterStore.clusters[i].cluster_name == data.cluster_name){
                        this.clusterStore.clusters[i].current_players = data.current_players;
                    }
                }
                this.userStore.handleGetUsers();
            })
            this.socketio.on('server_update_status',(data)=>{
                for(let i=0;i<this.clusterStore.clusters.length;i++){
                    if(this.clusterStore.clusters[i].cluster_name == data.cluster_name){
                        this.clusterStore.clusters[i].status = data.status;
                        // if(data.status == "令牌错误" || data.status == "端口错误"){
                        //     document.getElementById("status"+this.clusterStore.clusters[i].cluster_name).style.color = "red";
                        // }
                    }
                }
            })
            this.socketio.on('downloading',(data)=>{
                this.downloadStore.addMessage(data);
            })
            this.socketio.on('chat',(data)=>{
                this.chatStore.addNewMessage(data);
            })
        },
    },
    mounted(){
        this.init();
        this.handleGetSystemInfo();
        this.handleGetGameVersion();
    }
}
</script>
<style scoped>
.admin{
    display: flex;
    height: 94.8vh;
    width: 94.8vw;
    margin: 2vh 2vw;
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    background-color: rgba(87, 65, 40, 0.6);
    color: rgb(201,173,117);
}
.tip{
    display: flex;
    position: fixed;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1vh 1vw;
    z-index: 9999;
    color: black;
    background-color: rgb(242,222,155);
    top: 10%;
    font-size: 2vh;
    border-radius: 1vh;
    left: 50%;
    z-index: 9999;
    /* transform: translateX(-50%); */
}
.admin-left{
    height: 100%;
    width: 15%;
    background-color: rgba(110, 81, 47, 0.6);
    border-top-left-radius: 0.5vh;
    border-bottom-left-radius: 0.5vh;
}
.admin-right{
    height: 100%;
    width:85%;
    /* background-color: aqua; */
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
}
.logo{
    height: calc(10vh - 3vh);
    width: calc(100% - 3vw);
    margin: 1.5vh 1.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(110,81,47);
    border-radius: 1vh;
    color: rgb(224, 173, 71);
    position: relative;
    font-weight: bolder;
    font-size: 2.5vh;
}
.navigation-container{
    width: 100%;
}
.navigation{
    display: flex;
    height: calc(10vh - 2vh);
    width: calc(100% - 2vw);
    margin: 1vh 1vw;
    align-items: center;
    /* justify-content: center; */
    border-radius: 1vh;
    cursor: pointer;
    position: relative;
}
.navigation:hover{
    background-color: rgba(110, 81, 47, 1);
    color: rgb(224, 173, 71);
}
.navigation.selected{
    background-color: rgba(110, 81, 47, 1);
    color: rgb(224, 173, 71);
}
.navigation-icon{
    font-size: 6vh;
    margin: 0vh 0.75vw;
}
.navigation-font{
    font-size: 3vh;
}
.change-button{
    position: absolute;
    right: 1vw;
    font-size: 3vh;
    z-index: 999;
}
.change-button:hover{
    color: rgb(255, 170, 0);
}
.attention-container{
    height: 10vh;
    width: 100%;
    /* background-color: aqua; */
    display: flex;
}
.attention{
    height: calc(100% - 4vh);
    width: calc(11vw - 2vw);
    margin: 2vh 0.5vw;
    padding: 0 0.6vw;
    display: flex;
    font-weight: bolder;
    align-items: center;
    justify-content: center;
    font-size: 1.75vh;
    background-color:rgb(228,196,118);
    border-radius: 1vh;
    color: black;
}
.attention:first-child{
    background-color: rgb(228,196,118);
    margin-left: 1%;
}
.function{
    height: calc(100% - 10vh);
    width: 100%;
}
@keyframes slideOutTop {
    0% {
        transform: translateY(-400%);
    }
    100% {
        transform: translateY(0%);
    }
}
.slide-out-top {
    animation: slideOutTop 1s ease forwards;
}
</style>