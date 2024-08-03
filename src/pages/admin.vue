<template>
    <div id="admin" class="admin">
        <div class="admin-left">
            <div class="logo">
                logo
            </div>
            <div class="navigation-container">
                <div class="navigation">
                    <div></div>
                    <div class="navigation-font">服务器列表</div>
                </div>
                <div class="navigation">
                    <div></div>
                    <div class="navigation-font">运行概况</div>
                </div>
                <div class="navigation">
                    <div></div>
                    <div class="navigation-font">房间设置</div>
                </div>
                <div class="navigation">
                    <div></div>
                    <div class="navigation-font">世界设置</div>
                </div>
                <div class="navigation">
                    <div></div>
                    <div class="navigation-font">模组设置</div>
                </div>
            </div>
        </div>
        <div class="admin-right">
            <div class="attention-container">
                <div class="attention">禁止商用</div>
                <div class="attention">面板版本:0.0.1</div>
                <div class="attention">游戏版本:624447</div>
                <div class="link"></div>
            </div>
            <div class="function">
                <KeepAlive>
                    <component :is="activeComponent" class="component"></component>
                </KeepAlive>
            </div>
        </div>
    </div>
</template>
<script>
import serverList from '../components/serverList.vue'
export default{
    components:{
        serverList
    },
    data(){
        return{
            activeComponent:'serverList'
        }
    },
    methods:{

    },
    mounted(){
        //this.handleAdd();
    }
}
</script>
<style scoped>
.admin{
    display: flex;
    height: 94.8vh;
    width: 94.8vw;
    margin: 2vh 2vw;
    border: 0.6vh solid black;
    border-radius: 1vh;
}
.admin-left{
    height: 100%;
    width: 20%;
    background-color: rgb(249,240,251);
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
}
.admin-right{
    height: 100%;
    width:80%;
    /* background-color: aqua; */
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
}
.logo{
    height: 20vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.navigation-container{
    width: 100%;
}
.navigation{
    display: flex;
    height: 10vh;
    width: calc(100% - 2vw);
    margin: 0vh 1vw;
    align-items: center;
    /* justify-content: center; */
    border-radius: 1vh;
    
}
.navigation:hover{
    background-color: aqua;
}
.navigation-font{
    font-size: 3vh;
}

.attention-container{
    height: 10vh;
    width: 100%;
    /* background-color: aqua; */
    display: flex;
}
.attention{
    height: calc(100% - 6vh);
    width: calc(9vw - 1vw);
    margin: 3vh 0.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    background-color:rgb(39,132,255);
    border-radius: 1vh;
    color: white;
}
.attention:first-child{
    background-color: rgb(255,85,0);
    margin-left: 0.5vw;
}
.function{
    height: calc(100% - 10vh);
    width: 100%;
}
.component{
    height: 100%;
    width: 100%;
}
</style>