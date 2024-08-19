<template>
    <div class="worldSet">
        <div class="list">
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="set-container">
            <div class="world-type"></div>
            <div class="rule-type"></div>
            <div class="set">
                <div class="set-line">全局</div>
                <div class="set-item-container">
                    <div class="set-item" v-for="category in categorys">
                        <div class=""></div>
                    </div>
                </div>
                <div class="set-line">活动</div>
                <div class="set-item-container"></div>
                <div class="set-line">冒险家</div>
                <div class="set-item-container"></div>
                <div class="set-line">世界</div>
                <div class="set-item-container"></div>
                <div class="set-line">资源再生</div>
                <div class="set-item-container"></div>
                <div class="set-line">非自然传送门资源</div>
                <div class="set-item-container"></div>
                <div class="set-line">生物</div>
                <div class="set-item-container"></div>
                <div class="set-line">敌对生物</div>
                <div class="set-item-container"></div>
                <div class="set-line">巨兽</div>
                <div class="set-item-container"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {useClusterStore} from '../store/clusterStore'
export default{
    name:'worldSet',
    data(){
        return{
            clusterStore:useClusterStore(),
            categorys:{
                全局:{
                    活动:'自动',
                    秋:'',
                    冬:'',
                    春:'',
                    夏:'',
                    昼夜选项:'',
                    出生模式:'',
                    冒险家死亡:'',
                    在绚丽之门复活:'',
                    鬼魂理智惩罚:'',
                    死亡重置倒计时:'',
                }
            }
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
        },
    },
    mounted(){
        
    },
    activated(){
        if(!this.clusterStore.clusters[this.clusterStore.index])
            return;
        this.clusterStore.refreshIndex();
    }
}
</script>
<style scoped>
.worldSet{
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
    width: 80%;
    height: calc(90% + 5.5vh);
    margin-left: 15%;
}
.world-type{
    height: 4.4vh;
    width: 100%;
    border-bottom: 0.6vh solid rgb(118,82,44);
}
.rule-type{
    height: 4.4vh;
    border-bottom: 0.6vh solid rgb(118,82,44);
}
.set{
    height: calc(100% - 10vh - 0.6vh);
    width: calc(100% - 1.2vh);
    border: 0.6vh solid rgb(118,82,44);
    border-top: none;
}
.set-line{
    height: 5vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.set-item-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5vh;
}
.set-item{
    width: calc(33.33% - 0.5vh);
}
</style>