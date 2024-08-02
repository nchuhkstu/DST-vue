<template>
    主页
    <button @click="goAdmin">管理员页面</button>
</template>
<script>
import router from '../router';
export default{
    data(){
        return{

        }
    },
    methods:{
        goAdmin(){
            router.push({path:'/admin'});
        }
    },
    mounted(){

    },
}
</script>