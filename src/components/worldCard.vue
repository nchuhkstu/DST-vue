<template>
    <div :id="'worldCard'+worldCardId" class="worldCard">
        <img class="worldCard-icon" :src="src">
        <div class="worldCard-message">
            <div class="worldCard-title">{{ title }}</div>
            <div class="worldCard-value">{{ display }}</div>
        </div>
    </div>    
</template>
<script>
export default {
    name:'worldCard',
    props:{
        worldCardId:Number,
        title:String,
        value:String,
        display:String,
        world:String,
    },
    computed:{
        src(){
            return `../../public/world/${this.world}/${this.title}.png`;
        },
    },
    data(){
        return{
            display2:"",
        }
    },
    methods:{
        CE(){
            if(this.value=='default')
                this.display = '默认';
            else if(this.value=='longseason')
                this.display = '长';
            else if(this.value=='verylongseason')
                this.display = '极长';
            else if(this.value=='random')
                this.display = '随机';
            else if(this.value=='shortseason')
                this.display = '短'
            else if(this.value=='veryshortseason')
                this.display = '极短'
            else if(this.value=='noseason')
                this.display = '无'
            else if(this.value=='longday')
                this.display = '长 白天';
            else if(this.value=='longdusk')
                this.display = '长 黄昏';
            else if(this.value=='longnight')
                this.display = '长 夜晚';
            else if(this.value=='noday')
                this.display = '无 白天';
            else if(this.value=='nodusk')
                this.display = '无 黄昏';
            else if(this.value=='nonight')
                this.display = '无 夜晚';
            else if(this.value=='onlyday')
                this.display = '仅 白天';
            else if(this.value=='onlydusk')
                this.display = '仅 黄昏';
            else if(this.value=='onlynight')
                this.display = '仅 夜晚';
            else if(this.value=='fixed')
                this.display = '绚丽之门';
            else if(this.value=='scatter')
                this.display = '随机';
            else if(this.value=='never')
                this.display = '无';
            else if(this.value=='rare')
                this.display = '很少';
            else if(this.value=='uncommon')
                this.display = '较少';
            else if(this.value=='often')
                this.display = '较多';
            else if(this.value=='mostly')
                this.display = '很多';
            else if(this.value=='always')
                this.display = '大量';
            else if(this.value=='insane')
                this.display = '疯狂';
            else if(this.value=='ocean_never')
                this.display = '无';
            else if(this.value=='ocean_rare')
                this.display = '很少';
            else if(this.value=='ocean_uncommon')
                this.display = '较少';
            else if(this.value=='ocean_often')
                this.display = '较多';
            else if(this.value=='ocean_mostly')
                this.display = '很多';
            else if(this.value=='ocean_always')
                this.display = '大量';
            else if(this.value=='ocean_insane')
                this.display = '疯狂';
            else if(this.value=='enabled')
                this.display = '总是';
            else if(this.value=='none')
                this.display = '禁用';
            else if(this.value=='few')
                this.display = '慢';
            else if(this.value=='many')
                this.display = '快';
            else if(this.value=='max')
                this.display = '极快';
            else if(this.value=='classic')
                this.display = '经典';
            else if(this.value=='highly random')
                this.display = '非常随机';
            else if(this.value=='small')
                this.display = '小';
            else if(this.value=='medium')
                this.display = '中';
            else if(this.value=='huge')
                this.display = '巨大';
            else if(this.value=='cave_default')
                this.display = '地下';
            else if(this.value=='caves')
                this.display = '洞穴';
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
.worldCard{
    display: flex;
    height: 6vh;
    width: 100%;
    background-color: rgb(40,30,20);
    border-radius: 1vh;
}
.worldCard-icon{
    height: 5vh;
    width: 5vh;
    margin: 0.5vh 0.5vw;
}
.worldCard-message{
    height: 100%;
    width: calc(100% - 5vh - 1vw);
}
.worldCard-title{
    font-size: 1.8vh;
    line-height: 3vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    color: ghostwhite;
    align-items: center;
}
.worldCard-value{
    font-size: 1.5vh;
    line-height: 3vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    color: orange;
    align-items: center;
}
</style>