<template>
    <div>
        123123123
    </div>
</template>
<script>
import io from 'socket.io-client';
export default{
    name:'runningSituation',
    data(){
        return{
            socketio:io('http://127.0.0.1:5000',{transports:['websocket']}),
        }
    },
    methods:{
        init(){
            this.socketio.on('log',(data)=>{
                console.log(data);
            })
        }
    },
    mounted(){
        
    }
}
</script>
<style>

</style>