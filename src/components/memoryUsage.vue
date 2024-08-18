<template>
    <div class="cpuUsage">
        <div class="introduce">{{ text }}{{ progress + 'MB' }}</div>
        <div class="cpuUsage-container">
            <div class="progress-bar">
                <div class="progress" :style="{ width: `${format(progress)}%` }"></div>
            </div>
            <div class="text">2GB</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'memoryUsage',
    props: {
        progress:{
            type:Number,
            default:0
        },
        text:String,
    },
    methods:{
        format(data){
            return data / (1024 * 2) * 100; 
        }
    }
}
</script>
<style scoped>
.cpuUsage{
    height: 100%;
    width: 100%;
}
.introduce{
    height: 40%;
    width: 90%;
    margin: 0 5%;
}
.cpuUsage-container{
    height: 60%;
    width: 90%;
    margin: 0 5%;
    display: flex;
}
.progress-bar {
    width: 85%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: hidden;
}
.progress {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0s ease-in-out;
}
.text{
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>