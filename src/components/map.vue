<template>
    <div class="container">
        <div class="list">
            <div class="list-title">存档列表</div>
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="map-container">
            <div class="map-detail-container" id="map-detail-container">
                <img class="map-detail" id="map-detail" @wheel="wheel" :src="mapx1" draggable="false">
            </div>
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
            scale:1,
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
        wheel(event){
            const element = document.getElementById('map-detail');
            if (event.deltaY < 0) {
                this.scale += 0.5;
                element.style.transform = `scale(${this.scale})`;
            }
            else{
                if(this.scale == 1){
                    element.style.left = 0 + "px";
                    element.style.top = 0 + "px";
                }
                if(this.scale > 1){
                    this.scale -= 0.5;
                    element.style.transform = `scale(${this.scale})`;
                }
            }
        },
    },
    mounted(){
        const img = document.getElementById('map-detail');
        const imgBox = document.getElementById('map-detail-container');
        document.addEventListener("mouseup", () => {
            imgBox.onmousemove = null; // 清除move事件
        })
        img.onmousedown = function (e) {
            // 获取鼠标按下时的值
            let left = this.offsetLeft;
            let top = this.offsetTop;
            let startX = e.clientX;
            let startY = e.clientY;
            // 给盒子添加鼠标移动事件，获取移动后视口的值
            imgBox.onmousemove = function (event) {
                // 获取鼠标移动时的值，并更新图片绝对定位的值
                img.style.left = event.clientX - startX + left + "px";
                img.style.top = event.clientY - startY + top + "px";
            }
        }
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
    overflow: hidden;
}
.map-detail-container{
    height: 82vh;
    width: 82vh;
    margin: auto 0;
    margin-left: 0vw;
    overflow: hidden;
    position: relative;
    background-color: black;
}
.map-detail{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
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