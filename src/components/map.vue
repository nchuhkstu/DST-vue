<template>
    <div class="map">
        <div class="line" v-for="line in mapx1">
            <label class="point" v-for="point in line">{{ point }}</label>
        </div>
    </div>
</template>
<script>
import { getMap } from '../api/cluserRequest';
import { useClusterStore } from '../store/clusterStore';
export default{
    data(){
        return{
            mapx1:[],
            mapx2:[],
            mapx4:[],
            clusterStore:useClusterStore(),
        }
    },
    methods:{
        handleGetMap(){
            getMap(this.clusterStore.clusters[this.clusterStore.index].cluster_name).then(response=>{
                for(let i=0;i<response.data.length;i++){
                    this.mapx1.push(response.data[i])
                }
                for(let i=0;i<response.data.length;){
                    const array = [];
                    for(let j=0;j<response.data[i].length;){
                        array.push(response.data[i][j])
                        j=j+4;
                    }
                    this.mapx2.push(array)
                    i=i+4;
                }
            })
        }
    },
    mounted(){
        this.handleGetMap();
    }
}
</script>
<style scoped>
.map{
    height: 100%;
    width: 100%;
}
.line{
    display: flex;
}
.point{
    font-size: 0.4vh;
    height: 0.4vh;
    width: 0.4vh;
}
</style>