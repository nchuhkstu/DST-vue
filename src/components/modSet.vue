<template>
    <div class="modSet">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="set-container">
            <div class="navigation">
                <div class="navigation-button" @click="changeActive('set')">模组设置</div>
                <div class="navigation-button" @click="changeActive('focus')">模组订阅</div>
            </div>
            <div class="set-body" v-show="active=='set'">
                <div class="set-left">
                    <div class="set-left-top"></div>
                    <div class="set-left-body">
                        <div class="left-mod" v-for="mod in mods_focus">
                            <div class="left-mod-img-container"><img class="left-mod-img" :src="mod.img"></div>
                            <div class="left-mod-message">
                                <div class="left-mod-message-top">{{ mod.title }}</div>
                                <div class="left-mod-message-body"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="set-right">
                    <div class="set-top"></div>
                    <div class="set-bottom"></div>
                </div>
            </div>
            <div class="focus-body" v-show="active=='focus'">
                <div class="mod-container">
                    <div class="mod" v-for="mod in mods[currentPage]">
                        <div class="img" @click="information(mod.href)"><img :src="mod.img"></div>
                        <div class="mod-title">{{mod.title}}</div>
                        <div class="mod-author">{{'作者：' + mod.author}}</div>
                        <div class="focus" :id="mod.mod_id" @click="focusMod(mod)"><label v-show="mod.focus">已</label>订阅</div>
                    </div>
                </div>
                
                <div class="pages">
                    <div class="page-button" @click="Page1">首页</div>
                    <div class="page-button" @click="lastPage">上一页</div>
                    <div class="page-button">{{ currentPage }}</div>
                    <div class="page-button" @click="nextPage">下一页</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useClusterStore} from '../store/clusterStore'
import { useTipStore } from '../store/tipStore';
import { get_mods,focus_mod,get } from '../api/modRequest';
export default{
    name:'modSet',
    data(){
        return{
            clusterStore:useClusterStore(),
            pageSize:18,
            currentPage:1,
            mods:{},
            mods_focus:[],
            tipStore:useTipStore(),
            active:'set',
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
        handleGetMods(pageSize,currentPage){
            return new Promise((resolve,reject)=>{
                get_mods(pageSize,currentPage).then(response=>{
                    const array=[];
                    Object.keys(response.data).forEach(key=>{
                        array.push(response.data[key])
                        this.mods[currentPage]=array;
                    })
                    console.log(this.mods);
                    resolve();
                })
            })

        },
        changeActive(active){
            this.active = active;
        },
        handleGet(){
            get().then(response=>{
                console.log(response.data)
                for(let i=0;i<response.data.length;i++){
                    this.mods_focus.push(response.data[i]);
                }
                console.log(this.mods_focus);
            })
        },
        nextPage(){
            let num = this.currentPage + 1;
            if(!(num in this.mods)){
                this.handleGetMods(this.pageSize,this.currentPage+1)
            }
            this.currentPage++;
        },
        lastPage(){
            if(this.currentPage==1){
                return
            }
            let num = this.currentPage - 1;
            if(!(num in this.mods)){
                this.handleGetMods(this.pageSize,this.currentPage-1)
            }
            this.currentPage--;
        },
        Page1(){
            this.currentPage = 1;
        },
        information(url){
            window.open(url,'_blank');
        },
        focusMod(mod){
            if(mod.focus){
                this.tipStore.showTip("已经订阅过了");
                return;
            }
            focus_mod(mod).then(response=>{
                if(response.data.status=="ok"){
                    document.getElementById(mod.mod_id).textContent = "已订阅"
                }
                this.tipStore.showTip(response.data.message);
            })
        }
    },
    mounted(){
        this.handleGet();
        this.handleGetMods(this.pageSize, this.currentPage);
    },
    activated(){
        if(!this.clusterStore.clusters[this.clusterStore.index])
            return;
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.modSet{
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
.set-container{
    width: 83%;
    height: calc(92% + 5.5vh);
    margin-left: 15%;
}
.navigation{
    width: 100%;
    height: 5%;
    display: flex;
}
.navigation-button{
    cursor: pointer;
}
.set-body{
    width: calc(100% - 1.2vh);
    height: calc(95% - 1.2vh);
    border: 0.6vh solid rgb(118,82,44);
    position: relative;
    display: flex;
}
.set-left{
    height: 100%;
    width: calc(42% - 0.3vh);
    border-right: 0.3vh solid orange;
    overflow: auto
}
.set-left-top{
    width: 100%;
    height: 10%;
}
.set-left-body{
    width: 100%;
    height: 90%;
}
.left-mod{
    border: 0.3vh solid black;
    /* background-color: rgb(98, 83, 66); */
    height: 20%;
    width: calc(100% - 6% - 0.6vh);
    display: flex;
    margin-bottom: 2%;
    border-radius: 1vh;
    margin-left: 3%;
    margin-right: 3%;
}
.left-mod-img-container{
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left-mod-img{
    height: 95%;
    width: 95%;
}
.left-mod-message{
    height: 100%;
    width: 68%;
    margin-left: 2%;
}
.left-mod-message-top{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 40%;
    font-size: 2.5vh;
}
.left-mod-message-body{
    width: 100%;
    height: 60%;
}
.set-right{
    height: 100%;
    width: 58%;
}
.set-top{
    height: calc(22% - 0.3vh);
    width: 100%;
    border-bottom: 0.3vh solid orange;
}
.set-bottom{
    height: 78%;
    width: 100%;
}
.focus-body{
    width: calc(100% - 1.2vh);
    height: calc(95% - 1.2vh);
    border: 0.6vh solid rgb(118,82,44);
    position: relative;
}
.mod-container{
    height: 95%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0 1vw;
}
.mod{
    padding: 0 0.1vw;
    height: 33.3%;
    width: calc(16.6% - 0.835vw - 0.2vw);
}
.img{
    width: 100%;
    height: 65%;
    cursor: pointer;
}
img{
    height: 100%;
    width: 100%;
}
.mod-title{
    height: 10%;
    font-size: 1.5vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
}
.mod-author{
    height: 10%;
    color: rgb(201, 191, 191);
    font-size: 1.5vh;
}
.focus{
    font-size: 2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1vh;
    height: calc(10% - 0.6vh);
    width: calc(100% - 0.6vh);
    border: 0.3vh solid rgb(118,82,44);
    background-color: rgb(110,81,47);
    cursor: pointer;
}
.pages{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page-button{
    margin: 0 0.5vw;
    cursor: pointer;
}
</style>