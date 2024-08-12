<template>
    <div :id="'chart-' + name" class="chart"></div>
</template>
<script>
import * as echarts from 'echarts';
import { useSystemStore } from '../store/systemStore';
export default{
    name:'chart',
    props:{
        name:String,
        lineColor:String,
        itemColor:String,
        borderColor:String,
        xline:Boolean,
        yline:Boolean,
    },
    data(){
        return{
            totalCpu: useSystemStore().charts_data[`${this.name}`],
            chart:null,
            init:false,
            systemStore:useSystemStore(),
        }
    },
    methods:{
        initChart(){
            var chartContainer = document.getElementById('chart-'+this.name);
            this.chart = echarts.init(chartContainer);
            chartContainer.style.borderColor = this.borderColor;
        },
        draw() {
            if(this.chart!=null){
                var option;
                option = {
                    grid:{ // 让图表占满容器
                        top:"0px",
                        left:"0px",
                        right:"0px",
                        bottom:"0px",
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine:{ 
                            show: this.xline,
                            lineStyle: {
                                width: 1, // 设置网格线的宽度
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        max:100,
                        splitLine: { 
                            show: this.yline,
                            lineStyle: {
                                width: 1, // 设置网格线的宽度
                            }
                        },
                    },
                    series: [
                        {
                            data: this.totalCpu,
                            type: 'line',
                            areaStyle: {},
                            symbol: 'none',
                            lineStyle: {
                                width: 1,
                                color:this.lineColor,
                            },
                            itemStyle:{
                                color:this.itemColor,
                            }
                        }
                    ],
                    animation:false,
                };
                this.chart.setOption(option);
            }
            this.systemStore.charts_data[`cpu_new_ + ${this.name}`] == false;
        },
    },
    mounted(){
        this.initChart();
        this.draw();
        this.intervalId = setInterval(() => {
            if(this.systemStore.charts_data[`cpu_new_ + ${this.name}`] == true)
            this.draw();
        }, 1000); // 每秒执行一次 draw
    },
    activated(){
        window.addEventListener('resize', this.chart.resize);
        if(this.init==true)
            this.chart.resize();
        this.init=true;
    },
    deactivated(){
        window.removeEventListener('resize', this.chart.resize);
    },
}
</script>
<style scoped>
.chart{
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    border: 1px solid rgb(17,125,187);
    background-color: rgb(200,200,200);
}
</style>