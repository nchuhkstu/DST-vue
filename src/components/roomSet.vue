<template>
    <div class="roomSet">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="set-container">
            <div class="item">
                <div class="label">名称 :</div>
                <div class="input-container">
                    <input type="text" v-model="cluster.cluster_name">
                </div>
            </div>
            <div class="item">
                <div class="label">描述 :</div>
                <div class="input-container">
                    <input type="text" v-model="cluster.cluster_description">
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
                    <div class="icon" @click="changePlayers(-1)"><i class="ri-arrow-left-wide-line"></i></div>
                    <div class="count">{{ cluster.max_players }}</div>
                    <div class="icon" @click="changePlayers(1)"><i class="ri-arrow-right-wide-line"></i></div>
                </div>
            </div>
            <div class="item">
                <div class="label">快照 :</div>
                <div class="count-container">
                    <div class="icon" @click="changeSnapshots(-1)"><i class="ri-arrow-left-wide-line"></i></div>
                    <div class="count">{{ cluster.max_snapshots }}</div>
                    <div class="icon" @click="changeSnapshots(1)"><i class="ri-arrow-right-wide-line"></i></div>
                </div>
            </div>
            <div class="item">
                <div class="label">密码 :</div>
                <div class="input-container">
                    <input type="text" v-model="cluster.cluster_password">
                </div>
            </div>
            <div class="item">
                <div class="radio-container">
                    <input type="checkbox" name="options1" :true-value="true" :false-value="false"  v-model="cluster.pvp"> 玩家对战
                </div>
                <div class="radio-container">
                    <input type="checkbox" name="options3" :true-value="true" :false-value="false" v-model="cluster.vote_enabled"> 投票重置
                </div>
                <div class="radio-container">
                    <input type="checkbox" name="options4" :true-value="true" :false-value="false" v-model="cluster.vote_kick_enabled"> 投票踢人
                </div>
                <div class="radio-container">
                    <input type="checkbox" name="options2" :true-value="true" :false-value="false" v-model="cluster.pause_when_empty"> 无人时暂停
                </div>
            </div>
            <div class="item">
                <div class="port-container">
                    <div class="label">地面端口 :</div>
                    <div class="input-container">
                        <input type="text" v-model="cluster.master_server_port">
                    </div>
                </div>
                <div class="port-container">
                    <div class="label">洞穴端口 :</div>
                    <div class="input-container">
                        <input type="text" v-model="cluster.caves_server_port">
                    </div>
                </div>
            </div>
            <div class="item">
                <label class="submit" @click="handleSetRoom">保存</label>
            </div>
        </div>
        
    </div>
</template>
<script>
import { getRoom,setRoom } from '../api/cluserRequest'
import { useClusterStore} from '../store/clusterStore'
import 'remixicon/fonts/remixicon.css'
export default{
    name:'roomSet',
    data(){
        return{
            cluster:{
                cluster_index:null,
                cluster_name:null,
                cluster_description:null,
                game_mode:"endless",
                max_players:Number(8),
                max_snapshots:6,
                cluster_password:null,
                pvp:false,
                pause_when_empty:true,
                vote_enabled:true,
                vote_kick_enabled:true,
                master_server_port:null,
                caves_server_port:null,
            },
            clusters:null,
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        handleGetRoom(){
            getRoom(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                this.cluster = response.data;
            })
        },
        handleSetRoom(){
            setRoom({"cluster":this.cluster}).then(response=>{
                console.log(response.data)
            })  
        },
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            this.handleGetRoom();
        },
        changePlayers(num){
            if(Number(this.cluster.max_players) + Number(num) == 0)
                return;
            else{
                console.log(typeof this.cluster.max_players)
                this.cluster.max_players = Number(this.cluster.max_players) + Number(num);
            }
        },
        changeSnapshots(num){
            if(Number(this.cluster.max_snapshots) + Number(num) == -1)
                return;
            else{
                this.cluster.max_snapshots = Number(this.cluster.max_snapshots) + Number(num);
            }
        }
    },
    mounted(){
        this.handleGetRoom();
    },
    activated(){
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.roomSet{
    height: 100%;
    width: 100%;
    position: relative;
}
.list{
    position: absolute;
    width: calc(13% - 1.2vh);
    height: calc(90% + 5.5vh - 1.2vh);
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
.set-container{
    height: calc(100% - 3vh);
    padding-top: 0vh;
    width: 100%;
}
.item{
    height: 10%;
    margin: 0 15%;
    margin-bottom: 1vh;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(46,37,27);
}
.label{
    margin-right: 2vw;
    font-size: 3vh;
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
    font-size: 3vh;
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
input[type="text"] {
    height: calc(60% - 1vh);
    width: calc(100% - 1vw);
    outline: none;
    border-radius: 1vh;
    padding: 0.5vh 0.5vw;
    font-size: 2.5vh;
    background-color: rgb(247,236,211);
    border: 0.3vh solid rgb(118,82,44);
}
input[type="text"]:hover {
    background-color: rgb(206,173,104);
}

input[type="text"]:focus {
    background-color: rgb(231,203,145);
}
input:invalid {
    box-shadow: none;
    border-color: inherit;
    background-color: inherit;
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
    font-size: 3.5vh;
}
.port-container{
    display: flex;
    align-items: center;
    /* justify-content: center; */
    height: 100%;
    width: 40%;
}
</style>