<template>
    <div class="worldSet">
        <div class="list">
            <div class="list-title">存档列表</div>
            <div class="list-item" :id="`list-item-${index}`" v-for="(cluster,index) in clusterStore.clusters"@click=changeIndex(index)>{{ cluster.cluster_name }}</div>
        </div>
        <div class="set-container">
            <div class="set">
                <world ref="worldRef"></world>
            </div>
        </div>
    </div>
</template>
<script>
import {useClusterStore} from '../store/clusterStore'
import world from './world.vue'
import {get} from '../api/worldRequest'
export default{
    name:'worldSet',
    components:{
        world
    },
    data(){
        return{
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        changeIndex(index){
            this.clusterStore.setIndex(Number(index));
            this.getWorld();
        },
        getWorld(){
            get(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                this.$refs.worldRef.cards.slice(0,176).forEach(card => {
                    if (response.data["overrides1"][card.name_en] !== undefined) {
                        card.value = response.data["overrides1"][card.name_en];
                        if(card.value != card.origin){
                            card.changed = true;
                        }
                        else{
                            card.changed = false;
                        }
                    }
                });
                this.$refs.worldRef.cards.slice(176,250).forEach(card => {
                    if (response.data["overrides2"][card.name_en] !== undefined) {
                        card.value = response.data["overrides2"][card.name_en];
                        if(card.value != card.origin){
                            card.changed = true;
                        }
                        else{
                            card.changed = false;
                        }
                        card.value = response.data["overrides2"][card.name_en];
                    }
                });
            })
        },

    },
    mounted(){
        this.getWorld();
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
.set-container{
    width: calc(84% - 1.2vh);
    height: calc(92% + 5.5vh - 1.2vh);
    margin-left: 15%;
    border: 0.6vh solid rgb(118,82,44);
}
.set{
    height: 100%;
    width: 100%;
}
</style>