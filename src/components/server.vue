<template>
    <div class="server">
        <div class="item">存档名称：{{ server.cluster_name }}</div>
        <div class="item">房间名称：{{ server.server_name }}</div>
        <div class="item">游戏模式：{{ server.game_mode }}</div>
        <!-- <div class="item">当前天数：{{ server.days }}</div> -->
        <div class="item">当前天数：xxx</div>
        <div class="item">游玩人数：{{ server.current_players + '/' + server.max_players }}</div>
        <div class="item">占用端口：{{ server.port }}</div>
        <div class="item status" :id="'status' + server.cluster_name">游戏状态：{{ server.status }}<i class="ri-alarm-warning-line"></i></div>
    </div>
</template>
<script>
export default{
    name:'server',
    props:{
        index:Number,
        server:Object,
    },
    data(){
        return{
            days:1,
        }
    },
    methods:{

    },
    mounted(){
        if(this.server.status == '运行中' || this.server.status == '启动中'){
            document.getElementById("status" + this.server.cluster_name).style.color = 'rgb(116, 210, 39)';
        }
    }
}
</script>
<style scoped>
.server{
    border: 0.6vh solid rgb(118,82,44);
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1vh 0.5vw;
    cursor: pointer;
    background-color: rgba(110, 81, 47, 0.6);
}
.item{
    font-size: 2vh;
    width: 100%;
    display: flex;
    align-items: center;
}
.status{
    color:rgb(116, 210, 39);
    font-weight: bold;
    color: red;
}
</style>