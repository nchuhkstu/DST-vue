<template>
    <div class="roomSet">
        <div class="item">
            <div class="label">名称 :</div>
            <div class="input-container">
                <input v-model="cluster.cluster_name">
            </div>
        </div>
        <div class="item">
            <div class="label">描述 :</div>
            <div class="input-container">
                <input v-model="cluster.cluster_description">
            </div>
        </div>
        <div class="item">
            <div class="radio-container">
                <input type="radio" name="options" value="endless" v-model="cluster.game_mode"> 无尽 
            </div>
            <div class="radio-container">
                <input type="radio" name="options" value="survival" v-model="cluster.game_mode"> 生存 
            </div>
            <div class="radio-container">
                <input type="radio" name="options" value="wilderness" v-model="cluster.game_mode"> 荒野 
            </div>
            <div class="radio-container">
                <input type="radio" name="options" value="dark" v-model="cluster.game_mode"> 暗无天日 
            </div>
        </div>
        <div class="item">
            <div class="label">玩家 :</div>
            <div class="count-container">
                <div class="icon"><i class="ri-arrow-left-wide-line"></i></div>
                <div class="count">{{ cluster.max_players }}</div>
                <div class="icon"><i class="ri-arrow-right-wide-line"></i></div>
            </div>
        </div>
        <div class="item">
            <div class="label">快照 :</div>
            <div class="count-container">
                <div class="icon"><i class="ri-arrow-left-wide-line"></i></div>
                <div class="count">{{ cluster.max_snapshots }}</div>
                <div class="icon"><i class="ri-arrow-right-wide-line"></i></div>
            </div>
        </div>
        <div class="item">
            <div class="label">密码 :</div>
            <div class="input-container">
                <input v-model="cluster.cluster_password">
            </div>
        </div>
        <div class="item">
            <div class="radio-container">
                <input type="checkbox" name="options1" value="endless" v-model="cluster.pvp"> 玩家对战 
            </div>
            <div class="radio-container">
                <input type="checkbox" name="options2" value="survival" v-model="cluster.pause_when_empty"> 无人时暂停
            </div>
            <div class="radio-container">
                <input type="checkbox" name="options3" value="survival" v-model="cluster.vote_enabled"> 投票重置
            </div>
            <div class="radio-container">
                <input type="checkbox" name="options4" value="survival" v-model="cluster.vote_kick_enabled"> 投票踢人
            </div>
        </div>
        <div class="item">
            <label class="submit" @click="handlePost">保存</label>
        </div>
    </div>
</template>
<script>
import { get,post } from '../api/systemRequest'
import 'remixicon/fonts/remixicon.css'
export default{
    name:'roomSet',
    data(){
        return{
            cluster:{
                cluster_name:"",
                cluster_description:"",
                game_mode:"endless",
                max_players:8,
                max_snapshots:6,
                cluster_password:"",
                pvp:false,
                pause_when_empty:true,
                vote_enabled:true,
                vote_kick_enabled:true
            }
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

            })
        }
    },
    mounted(){
        this.handleGet()
    }
}
</script>
<style scoped>
.roomSet{
    height: 100%;
    width: 100%;

}
.item{
    height: 10%;
    margin: 1vh 15%;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(46,37,27);
}
.label{
    margin-right: 2vw;
    font-size: 2vh;
    font-weight: bold;
    color: rgb(201,173,117);
}
.input-container{
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    font-size: 2vh;
}
.radio-container{
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    font-size: 2vh;
}
input[type="radio"] {
    height: 3.5vh;
    width: 3.5vh;
    margin-right: 1vw;
    background-color: rgb(46,37,27);
}
input[type="checkbox"] {
    height: 3.5vh;
    width: 3.5vh;
    margin-right: 1vw;
    background-color: rgb(46,37,27);
}
input:not([type="radio"]):not([type="checkbox"]) {
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
.count-container{
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 3vh;
}
.icon{
    font-size: 6vh;
    color: rgb(228,203,121);
}
.count{
    margin: 0 6vw;
}
</style>