<template>
    <div id="admin" class="admin">
        <div class="tip" id="tip">{{tipStore.tip}}</div>
        <div class="admin-left">
            <div class="logo">
                饥荒联机版服务器看板
            </div>
            <div class="navigation-container">
                <div class="navigation selected" id="serverList" @click="changeComponent('serverList')">
                    <div class="navigation-icon"><i class="ri-server-line"></i></div>
                    <div class="navigation-font">服务器列表</div>
                </div>
                <div class="navigation" id="runningSituation" @click="changeComponent('runningSituation')">
                    <div class="navigation-icon"><i class="ri-computer-line"></i></div>
                    <div class="navigation-font">运行概况</div>
                </div>
                <div class="navigation" id="roomSet" @click="changeComponent('roomSet')">
                    <div class="navigation-icon"><i class="ri-home-4-line"></i></div>
                    <div class="navigation-font">房间设置</div>
                </div>
                <!-- <div class="navigation" id="worldSet" @click="changeComponent('worldSet')">
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
                </div> -->
                <div class="navigation" id="systemSet" @click="changeComponent('systemSet')">
                    <div class="navigation-icon"><i class="ri-settings-line"></i></div>
                    <div class="navigation-font">系统设置</div>
                </div>
            </div>
        </div>
        <div class="admin-right">
            <div class="attention-container">
                <div class="attention">未经授权,禁止商用</div>
                <div class="attention">面板版本 : 1.1.0</div>
                <div class="attention">游戏版本:624447</div>
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
import runningSituation from '../components/runningSituation.vue'
import roomSet from '../components/roomSet.vue'
import worldSet from '../components/worldSet.vue'
import modSet from '../components/modSet.vue'
import resourceUsage from '../components/resourceUsage.vue'
import systemSet from '../components/systemSet.vue'
import 'remixicon/fonts/remixicon.css'
import io from 'socket.io-client';
import { useLogStore } from '../store/logStore'
import { useTipStore } from '../store/tipStore'
export default{
    components:{
        serverList,
        runningSituation,
        roomSet,
        worldSet,
        modSet,
        resourceUsage,
        systemSet
    },
    data(){
        return{
            activeComponent:'serverList',
            socketio:io('http://127.0.0.1:5000',{transports:['websocket']}),
            logStore:useLogStore(),
            tipStore:useTipStore(),
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
        init(){
            this.socketio.on('log',(data)=>{
                this.logStore.addLog(data);
            })
        },
    },
    mounted(){
        this.init();
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
    top: 20%;
    font-size: 2vh;
    border-radius: 1vh;
    left: 50%;
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

.attention-container{
    height: 10vh;
    width: 100%;
    /* background-color: aqua; */
    display: flex;
}
.attention{
    height: calc(100% - 4vh);
    width: calc(11vw - 3vw);
    margin: 2vh 0.5vw;
    padding: 0 1vw;
    display: flex;
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