<template>
    <div class="container">
        <div class="list">
            <div class="list-title">存档列表</div>
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="map-container">
            <img class="map" :src="mapx1">
            <div class="refresh-button" @click="handleRefreshMap">刷新地图</div>
        </div>
    </div>
</template>
<script>
import { getMap,refreshMap } from '../api/cluserRequest';
import { useClusterStore } from '../store/clusterStore';
import { useTipStore } from '../store/tipStore';
export default{
    data(){
        return{
            mapx1:null,
            mapx2:null,
            mapx4:null,
            clusterStore:useClusterStore(),
            tipStore:useTipStore(),
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        handleGetMap(){
            getMap(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                console.log(response.data)
                if(response.data.byteLength<100){
                    this.tipStore.showTip("世界尚未生成地图数据");
                    this.mapx1 = null;
                    return;
                }
                const blob = new Blob([response.data], { type: 'image/png' });
                this.mapx1 = URL.createObjectURL(blob)
            })
        },
        handleRefreshMap(){
            refreshMap(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                if(this.clusterStore.clusters[this.clusterStore.index].status!="运行中"){
                    this.tipStore.showTip('服务器未在运行中,刷新地图失败');
                    return;
                }
                else{
                    const blob = new Blob([response.data], { type: 'image/png' });
                    this.mapx1 = URL.createObjectURL(blob)
                    this.tipStore.showTip('刷新地图成功');
                }
            })
        },
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            this.handleGetMap();
        },
    },
    mounted(){

    },
    activated(){
        if(!this.clusterStore.clusters[this.clusterStore.index])
            return;
        this.handleGetMap();
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.container{
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
    border-radius: 1vh;
}
.list-title{
    border-top-left-radius: 0.5vh;
    border-top-right-radius: 0.5vh;
    height: calc(5% - 0.6vh);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    font-weight: bold;
    background-color: rgb(75,56,34);
    color: rgb(224,173,71);
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
.map-container{
    height: calc(92% + 5.5vh - 1.2vh);
    width: calc(84% - 1.2vh);
    margin-left: 15%;
    border: 0.6vh solid rgb(118, 82, 44);
    display: flex;
    border-radius: 1vh;
}
.map{
    height: 80vh;
    width: 80vh;
    margin: auto 0;
    margin-left: 1vw;
}
.refresh-button{
    background-color: rgb(228, 196, 118);
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118, 82, 44);
    padding: 0.5vh 1vw;
    display: flex;
    font-size: 2vh;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    height: 3vh;
    margin-top: 1vh;
    margin-left: 1vw;
}
.refresh-button:hover{
    background-color: rgb(242,222,155);
}
</style>