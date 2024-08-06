<template>
    <div class="cpuUsage">
        <div class="introduce">{{ text }}</div>
        <div class="cpuUsage-container">
            <div class="progress-bar">
                <div class="progress" :style="{ width: `${progress}%` }"></div>
            </div>
            <div class="text">{{ progress }}%</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
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
    transition: width 0.5s ease-in-out;
}
.text{
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>