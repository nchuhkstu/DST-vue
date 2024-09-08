<template>
    <div :id="'worldCard'+worldCardId" class="worldCard">
        <img class="worldCard-icon" :src="`/static/assets/${world}/${title}.png`">
        <div class="worldCard-message">
            <div class="worldCard-title">{{ title }}</div>
            <div class="worldCard-value">{{ display2 }}</div>
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
    data(){
        return{
            display2:"",
        }
    },
    methods:{
        CE(){
            if(this.value=='default')
                this.display2 = '默认';
            else if(this.value=='longseason')
                this.display2 = '长';
            else if(this.value=='verylongseason')
                this.display2 = '极长';
            else if(this.value=='random')
                this.display2 = '随机';
            else if(this.value=='shortseason')
                this.display2 = '短'
            else if(this.value=='veryshortseason')
                this.display2 = '极短'
            else if(this.value=='noseason')
                this.display2 = '无'
            else if(this.value=='longday')
                this.display2 = '长 白天';
            else if(this.value=='longdusk')
                this.display2 = '长 黄昏';
            else if(this.value=='longnight')
                this.display2 = '长 夜晚';
            else if(this.value=='noday')
                this.display2 = '无 白天';
            else if(this.value=='nodusk')
                this.display2 = '无 黄昏';
            else if(this.value=='nonight')
                this.display2 = '无 夜晚';
            else if(this.value=='onlyday')
                this.display2 = '仅 白天';
            else if(this.value=='onlydusk')
                this.display2 = '仅 黄昏';
            else if(this.value=='onlynight')
                this.display2 = '仅 夜晚';
            else if(this.value=='fixed')
                this.display2 = '绚丽之门';
            else if(this.value=='scatter')
                this.display2 = '随机';
            else if(this.value=='never')
                this.display2 = '无';
            else if(this.value=='rare')
                this.display2 = '很少';
            else if(this.value=='uncommon')
                this.display2 = '较少';
            else if(this.value=='often')
                this.display2 = '较多';
            else if(this.value=='mostly')
                this.display2 = '很多';
            else if(this.value=='always')
                this.display2 = '大量';
            else if(this.value=='insane')
                this.display2 = '疯狂';
            else if(this.value=='ocean_never')
                this.display2 = '无';
            else if(this.value=='ocean_rare')
                this.display2 = '很少';
            else if(this.value=='ocean_uncommon')
                this.display2 = '较少';
            else if(this.value=='ocean_often')
                this.display2 = '较多';
            else if(this.value=='ocean_mostly')
                this.display2 = '很多';
            else if(this.value=='ocean_always')
                this.display2 = '大量';
            else if(this.value=='ocean_insane')
                this.display2 = '疯狂';
            else if(this.value=='enabled')
                this.display2 = '总是';
            else if(this.value=='none')
                this.display2 = '禁用';
            else if(this.value=='few')
                this.display2 = '慢';
            else if(this.value=='many')
                this.display2 = '快';
            else if(this.value=='max')
                this.display2 = '极快';
            else if(this.value=='classic')
                this.display2 = '经典';
            else if(this.value=='highly random')
                this.display2 = '非常随机';
            else if(this.value=='small')
                this.display2 = '小';
            else if(this.value=='medium')
                this.display2 = '中';
            else if(this.value=='huge')
                this.display2 = '巨大';
            else if(this.value=='cave_default')
                this.display2 = '地下';
            else if(this.value=='caves')
                this.display2 = '洞穴';
            else
                this.display2 = this.display1;
        },
    },
    mounted(){
        this.CE();
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