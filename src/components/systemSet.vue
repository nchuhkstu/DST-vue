<template>
    <div class="systemSet">
        <div class="item">
            <div class="label">专用服务器可执行文件路径</div>
            <div class="input-container">
                <input v-model="data.exe_path">
            </div>
        </div>
        <div class="item">
            <div class="label">存档路径</div>
            <div class="input-container">
                <input v-model="data.cluster_path">
            </div>
        </div>
        <div class="item">
            <div class="label">存档备份路径</div>
            <div class="input-container">
                <input>
            </div>
        </div>
        <div class="item">
            <label class="submit" @click="handlePost">保存</label>
        </div>
    </div>
</template>
<script>
import { get,post } from '../api/systemRequest'
export default{
    name:'systemSet',
    data(){
        return{
            data:{
                cluster_path:'',
                exe_path:''
            }
        }
    },
    methods:{
        handleGet(){
            get().then(response=>{
                this.data = response.data;
            })
        },
        handlePost(){
            post(this.data).then(response=>{

            })
        }
    },
    mounted(){
        this.handleGet()
    }
}
</script>
<style scoped>
.SystemSet{
    height: 100%;
    width: 100%;

}
.item{
    height: 10%;
    margin: 1vh 15%;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(46,37,27);
}
.label{
    width: 25%;
    font-size: 2vh;
    font-weight: bold;
    color: rgb(201,173,117);
}
.input-container{
    height: 100%;
    width: 65%;
    display: flex;
    align-items: center;
}
input{
    height: calc(60% - 1vh);
    width: calc(100% - 1vw);
    outline: none;
    border-radius: 1vh;
    padding: 0.5vh 0.5vw;
    font-size: 2vh;
    background-color: rgb(247,236,211);
    border: 0.3vh solid rgb(118,82,44);
}
input:invalid {
  box-shadow: none;
  border-color: inherit;
  background-color: inherit;
}
input:hover{
    background-color: rgb(206,173,104);
}
input:focus{
    background-color: rgb(231,203,145);
}
.submit{
    padding: 0.5vh 2vw;
    font-size: 2.5vh;
    font-weight: bold;
    background-color: rgb(228,196,118);
    margin: 0 auto;
    border-radius: 1vh;
    color: black;
    cursor: pointer;
    border: 0.3vh solid rgb(118,82,44);
}
.submit:hover{
    background-color: rgb(242,222,155);
}
</style>