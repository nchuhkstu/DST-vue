<template>
    <div class="cpuUsage">
        <div class="cpuUsage-title">
            <div class="cpuUsage-title-left">{{ text }}</div>
            <div class="cpuUsage-title-right">{{ progress }}%</div>
        </div>
        <div class="cpuUsage-body">
            <div class="progress-bar">
                <div class="progress" :style="{ width: `${progress}%` }"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cpuUsage',
    props: {
        progress:{
            type:Number,
            default:0
        },
        text:String,
    }
}
</script>
<style scoped>
.cpuUsage{
    height: 100%;
    width: 100%;
}
.cpuUsage-title{
    width: 90%;
    margin: 0 5%;
    display: flex;
}
.cpuUsage-title-left{

}
.cpuUsage-title-right{
    margin-left: auto;
}
.cpuUsage-body{
    height: 60%;
    width: 90%;
    margin: 0 5%;
    display: flex;
}
.progress-bar {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: hidden;
}
.progress {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0s ease-in-out;
}
</style>