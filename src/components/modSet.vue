<template>
    <div class="modSet">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="set-container">
            <div class="set-top">
                <div class="navigation-button">模组设置</div>
                <div class="navigation-button">模组订阅</div>
            </div>
            <div class="set-body">
                <div class="mod" v-for="mod in mods">
                    <div class="img"><img :src="mod.img"></div>
                    <div class="mod-title">{{mod.title}}</div>
                    <div class="mod-author">{{'作者：' + mod.author}}</div>
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
import { get_mods } from '../api/modRequest';
export default{
    name:'modSet',
    data(){
        return{
            clusterStore:useClusterStore(),
            pageSize:18,
            currentPage:1,
            mods:[],
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
        handleGetMods(pageSize,currentPage){
            return new Promise((resolve,reject)=>{
                get_mods(pageSize,currentPage).then(response=>{
                    this.mods = [];
                    Object.keys(response.data).forEach(key=>{
                        this.mods.push(response.data[key])
                    })
                    console.log(this.mods);
                    resolve();
                })
            })

        },
        nextPage(){
            this.handleGetMods(this.pageSize,this.currentPage+1).then(response=>{
                this.currentPage++;
            });
        },
        lastPage(){
            this.handleGetMods(this.pageSize,this.currentPage-1).then(response=>{
                this.currentPage--;
            });
        },
        Page1(){
            this.handleGetMods(this.pageSize,1).then(response=>{
                this.currentPage=1;
            });
        }
    },
    mounted(){
        this.handleGetMods();
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
.set-top{
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
    display: flex;
    flex-wrap: wrap;
    gap: 0 1vw;
}
.mod{
    height: 30%;
    width: calc(16.6% - 0.835vw);
}
.img{
    width: 100%;
    height: 80%;
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
}
.mod-author{
    height: 10%;
    font-size: 1.5vh;
}
.pages{
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