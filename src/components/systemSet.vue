<template>
    <div class="SystemSet">
        <div class="second-menu-container" v-show="downloading">
            <div class="second-menu" id="download-log">
                <div class="second-menu-title">正在下载中，请耐心等待</div>
                <div v-for="message in downloadingStore.messages" class="second-menu-message">{{ message }}</div>
            </div>
        </div>
        <div class="item">
            <div class="label">SteamCMD路径</div>
            <div class="input-container">
                <input v-model="data.steamCMD_path">
            </div>
            <div class="download">
                <div class="submit" @click="handleDownloadingSteamCMD">下载SteamCMD</div>
            </div>
        </div>
        <div class="item">
            <div class="label">专用服务器路径</div>
            <div class="input-container">
                <input v-model="data.exe_path">
            </div>
            <div class="download">
                <div class="submit" @click="handleUpdateGame">更新游戏</div>
            </div>
        </div>
        <div class="item">
            <div class="label">模组路径</div>
            <div class="input-container">
                <input v-model="data.mod_path">
            </div>
        </div>
        <div class="item">
            <div class="label">存档路径</div>
            <div class="input-container">
                <input v-model="data.cluster_path">
            </div>
        </div>
        <div class="item">
            <div class="label">存档备份路径</div>
            <div class="input-container">
                <input>
            </div>
        </div>
        <div class="item">
            <label class="submit" @click="handlePost">保存</label>
        </div>
    </div>
</template>
<script>
import { get,post,downloadingSteamCMD,updateGame } from '../api/systemRequest'
import { useTipStore } from '../store/tipStore'
import { useDownloadStore } from '../store/downloadStore';
export default{
    name:'systemSet',
    data(){
        return{
            data:{
                steamCMD_path:'',
                cluster_path:'',
                exe_path:'',
                mod_path:'',
            },
            downloading:false,
            tipStore:useTipStore(),
            downloadingStore:useDownloadStore(),
        }
    },
    methods:{
        handleGet(){
            get().then(response=>{
                this.data = response.data;
            })
        },
        handlePost(){
            post(this.data).then(response=>{
                if(response.data.status == "ok"){
                    this.tipStore.showTip(response.data.message);
                }
            })
        },
        handleDownloadingSteamCMD(){
            this.downloadingStore.messages = [];
            this.downloading = true;
            downloadingSteamCMD().then(response=>{
                if(response.data.status == "ok"){
                    this.downloading = false;
                    this.tipStore.showTip(response.data.message);
                }
            })
        },
        handleUpdateGame(){
            this.downloadingStore.messages = [];
            this.downloading = true;
            updateGame().then(response=>{
                if(response.data.status == "ok"){
                    this.downloading = false;
                    this.tipStore.showTip(response.data.message);
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
.SystemSet{
    height: 100%;
    width: 100%;

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
    width: 30vw;
    height: 20vh;
    transform: translateX(-50%);
    background-color: rgba(110, 81, 47, 1);
    border: 0.6vh solid rgb(169, 118, 63);
    overflow: auto;
    /* border-radius: 1vh; */
    color: black;
}
.second-menu-title{
    text-align: center;
    font-size: 3vh;
    color: rgb(201,173,117);
    margin-bottom: 1vh;
}
.second-menu-message{
    padding-left: 1vw;
    color: rgb(201,173,117);
}
.item{
    height: 10%;
    margin: 1vh 15%;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(46,37,27);
    position: relative;
}
.download{
    position: absolute;
    left: 100%;
    top: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.label{
    width: 25%;
    font-size: 2vh;
    font-weight: bold;
    color: rgb(201,173,117);
}
.input-container{
    height: 100%;
    width: 65%;
    display: flex;
    align-items: center;
}
input{
    height: calc(60% - 1vh);
    width: calc(100% - 1vw);
    outline: none;
    border-radius: 1vh;
    padding: 0.5vh 0.5vw;
    font-size: 2vh;
    background-color: rgb(247,236,211);
    border: 0.3vh solid rgb(118,82,44);
}
input:invalid {
  box-shadow: none;
  border-color: inherit;
  background-color: inherit;
}
input:hover{
    background-color: rgb(206,173,104);
}
input:focus{
    background-color: rgb(231,203,145);
}
.submit{
    padding: 0.5vh 2vw;
    font-size: 2.5vh;
    font-weight: bold;
    background-color: rgb(228,196,118);
    margin: 0 auto;
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
}
.submit:hover{
    background-color: rgb(242,222,155);
}
</style>