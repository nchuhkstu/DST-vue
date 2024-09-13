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
                    <div class="set-left-top">
                        <i class="ri-checkbox-multiple-blank-line filter" v-show="!filter"></i>
                        <i class="ri-checkbox-multiple-line filter" v-show="filter"></i>
                        <input class="filter-input" placeholder="搜索">
                    </div>
                    <div class="set-left-body">
                        <div class="left-mod" v-for="(mod,index) in mods_focus" @click="showMod(index)">
                            <div class="left-mod-img-container"><img class="left-mod-img" :src="mod.img"></div>
                            <div class="left-mod-message">
                                <div class="left-mod-message-top">{{ mod.title }}</div>
                                <div class="left-mod-message-body">
                                    <div class="mod-status">禁用</div>
                                    <i class="ri-checkbox-blank-line mod-status-button"></i>
                                    <i class="ri-checkbox-line mod-status-button"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="set-right" v-if="mods_focus[index]">
                    <div class="set-top">
                        <div class="set-top-left"><img :src="mods_focus[index].img"></div>
                        <div class="set-top-right">
                            <div class="set-top-right-head">{{ mods_focus[index].title }}</div>
                            <div class="set-top-right-body">{{ '作者：' + mods_focus[index].author }}</div>
                            <div class="set-top-right-foot">与《饥荒：联机版》 兼容。</div>
                        </div>
                    </div>
                    <div class="set-bottom">
                        <div class="mod-content" v-html="mods_focus[index].content"></div>
                        <div class="mod-content-bottom">
                            <i class="ri-delete-bin-5-line mod-option" @click="deleteMod(index)"></i>
                            <i class="ri-tools-fill mod-option"></i>
                            <i class="ri-download-fill mod-option"></i>
                            <i class="ri-global-line mod-option" @click="information(mods_focus[index].href)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="focus-body" v-show="active=='focus'">
                <div class="focus-search">
                    <div class="sorted">排序依据：最热门</div>
                    <div class="sorted">时间：有史以来</div>
                    <input class="focus-search-input" v-model="searchContent" placeholder="搜索：饥荒联机版">
                    <div class="focus-search-button">搜索</div>
                </div>
                <div class="loading-container" v-show="loading">
                    <div class="loading">
                        <div class="loading-img"><i class="ri-refresh-line"></i></div>
                        <div class="loading-message">正在加载中，请耐心等待</div>
                    </div>
                </div>
                <div class="mod-container" v-show="!loading">
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
import { get_mods,focus_mod,get,delete_mod } from '../api/modRequest';
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
            index:0,
            filter:true,
            searchContent:"",
            loading:false,
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
        handleGetMods(){
            return new Promise((resolve,reject)=>{
                const formData = new FormData();
                formData.append('pageSize', this.pageSize);
                formData.append('currentPage', this.currentPage);
                formData.append('content', this.searchContent);
                this.loading = true;
                get_mods(formData).then(response=>{
                    this.loading = false;
                    const array=[];
                    Object.keys(response.data).forEach(key=>{
                        array.push(response.data[key])
                        this.mods[this.currentPage]=array;
                    })
                    console.log(this.mods);
                    resolve();
                })
            })

        },
        changeActive(active){
            this.active = active;
        },
        showMod(index){
            this.index = index;
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
            this.currentPage++;
            if(!(num in this.mods)){
                this.handleGetMods()
            }
        },
        lastPage(){
            if(this.currentPage==1){
                return
            }
            let num = this.currentPage - 1;
            this.currentPage--;
            if(!(num in this.mods)){
                this.handleGetMods()
            }
        },
        Page1(){
            this.currentPage = 1;
        },
        information(url){
            window.open(url,'_blank');
        },
        focusMod(mod){
            if(mod.focus){

                return;
            }
            if(mod.focusing ==true){
                this.tipStore.showTip("正在订阅中");
                return;
            }
            mod.focusing = true;
            document.getElementById(mod.mod_id).textContent = "订阅中"
            focus_mod(mod).then(response=>{
                this.mods_focus.push(mod);
                if(response.data.status=="ok"){
                    document.getElementById(mod.mod_id).textContent = "已订阅"
                    mod.focusing = false;
                }
                this.tipStore.showTip(response.data.message);
            })
        },
        deleteMod(index){
            delete_mod(this.mods_focus[index].mod_id).then(response=>{
                if(response.data.status=="ok"){
                    this.mods_focus.splice(index,1);
                    this.tipStore.showTip(response.data.message);
                }
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
    width: calc(100% - 1.2vh);
    height: calc(7% - 1.2vh);
    margin-bottom: 1.5vh;
    display: flex;
    align-items: center;
    border: 0.6vh solid rgb(118,82,44);
}
.navigation-button{
    height: 80%;
    width: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1vw;
    margin-right: 1vw;
    cursor: pointer;
    background-color: rgb(228,196,118);
    color: black;
    font-weight: bolder;
    border-radius: 1vh;
}
.set-body{
    width: calc(100% - 1.2vh);
    height: calc(93% - 1.2vh - 1.5vh);
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
    margin: 0 3%;
    width: 94%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.filter{
    text-align: center;
    height: 70%;
    width: calc(15% - 0.6vw);
    margin-right: 7.5%;
    padding: 0 0.3vw;
    border-radius: 1vh;
    font-size: 4vh;
    /* margin-right: 1vw; */
    cursor: pointer;
    color: black;
    background-color: rgb(228,196,118);
}
.filter-input{
    height: calc(60% - 2vh);
    width: calc(70% - 1vw);
    padding: 1vh 0.5vw;
    border-radius: 1vh;
    border: none;
    background-color: rgb(247,236,211);
}
.set-left-body{
    width: 100%;
    height: 90%;
}
.left-mod{
    border: 0.3vh solid black;
    background-color: rgb(40,30,20);
    height: 14%;
    width: calc(100% - 6% - 0.6vh);
    display: flex;
    margin-bottom: 1%;
    border-radius: 1vh;
    margin-left: 3%;
    margin-right: 3%;
    cursor: pointer;
}
.left-mod-img-container{
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.left-mod-img{
    height: 90%;
    width: 90%;
}
.left-mod-message{
    height: 100%;
    width: 78%;
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
    display: flex;
    align-items: center;
}
.mod-status{
    height: 4vh;
    font-size: 3vh;
}
.mod-status-button{
    height: 4vh;
    padding-top: 1vh;
    margin-left: auto;
    margin-right: 1vw;
    font-size: 3.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.set-right{
    height: 100%;
    width: 58%;
    color:rgb(200, 200, 200);
}
.set-top-left{
    height: 100%;
    width:22%;
}
.set-top-right{
    height: 100%;
    margin-left: 1%;
    width: 77%;
}
.set-top-right-head{
    width: 100%;
    height: 40%;
    font-size: 3.5vh;
    font-weight:bolder;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.set-top-right-body{
    width: 100%;
    height: 30%;
    font-size: 3vh;
    color: rgb(224,173,71);
}
.set-top-right-foot{
    width: 100%;
    height: 30%;
}
.set-top{
    height: calc(20% - 0.3vh);
    width: 100%;
    border-bottom: 0.3vh solid orange;
    display: flex;
}
.set-bottom{
    height: 80%;
    width: 100%;
}
.mod-content{
    width: 100%;
    height: 85%;
    overflow: auto;
}
.mod-content-bottom{
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
}
.mod-option{
    height: 60%;
    padding: 0 0.3vw;
    border-radius: 1vh;
    font-size: 4vh;
    margin-right: 1vw;
    cursor: pointer;
    color: black;
    background-color: rgb(228,196,118);
}
.mod-option:first-of-type{
    margin-left: auto;
}
.mod-option:last-of-type{
    margin-right: 0.5vw;
}
.focus-body{
    width: calc(100% - 1.2vh);
    height: calc(93% - 1.2vh - 1.5vh);
    border: 0.6vh solid rgb(118,82,44);
    position: relative;
}
.focus-search{
    height: 7%;
    width: 100%;
    display: flex;
    align-items: center;
}
.sorted{
    color: white;
    margin-right: 1vw;
}
.focus-search-input{
    height: 70%;
    width: 13vw;
    border: none;
    padding: 0 0.5vw;
    /* margin-left: auto; */
    margin-right: 1vw;
    background-color: rgb(247,236,211);
    border-radius: 0.75vh;
}
.focus-search-button{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    padding: 0 0.5vw;
    border-radius: 0.5vh;
    background-color: rgb(228,196,118);
    color: black;
    margin-right: 1vw;
}
.loading-container{
    height: 88%;
    width: 100%;
    position: relative;
}
.loading{
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    height: 60%;
    width: 45%;
}
.loading-img{
    width: 100%;
    height: 80%;
    font-size: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spin 3s linear infinite;
}
@keyframes 
spin {
    0% {
        transform: rotate(0deg); /* 起始状态 */
    }
    50% {
        transform: rotate(360deg); /* 旋转到360度 */
    }
    100% {
        transform: rotate(360deg); /* 结束状态（保持在360度） */
    }
}
.loading-message{
    width: 100%;
    height: 20%;
    font-size: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mod-container{
    height: 88%;
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