<template>
    <div>
        <canvas id="mountNode"></canvas>
    </div>  
</template>

<script>
import F2 from '@antv/f2/lib/core'// 必须引入
import '@antv/f2/lib/geom/interval'// 引入 interval 几何标记
import '@antv/f2/lib/coord/polar' // 引入 极坐标
import '@antv/f2/lib/geom/adjust/stack' // 引入数据层叠调整类型
// import F2 from '@antv/f2'
import Tooltip from '@antv/f2/lib/plugin/tooltip'
import Legend from '@antv/f2/lib/plugin/legend'
F2.Chart.plugins.register(Legend);
F2.Chart.plugins.register(Tooltip);
export default {
    data(){
        return {
            map: {
                '芳华': '80%',
                '妖猫传': '20%',
            },
            data: [
                {
                    name: '芳华',
                    percent: 0.8,
                    a: '1'
                }, 
                {
                    name: '妖猫传',
                    percent: 0.2,
                    a: '1'
                },
            ]
        }
    },
    methods:{
        init(){
            let _self = this
            //  创建图标实例
            var chart = new F2.Chart({
                id: 'mountNode',
                pixelRatio: window.devicePixelRatio
            });
            // chart.plugins.register(Tooltip);
            // chart.plugins.register(Legend);
            //  挂载数据
            chart.source(_self.data, {
                percent: {
                    formatter: function formatter(val) {
                    return val * 100 + '%';
                    }
                }
            });
            //  内容项标签
            chart.legend({
                position: 'right',
                itemFormatter: function itemFormatter(val) {
                    return val + '  ' + _self.map[val];
                }
            });
            //  信息提示
            chart.tooltip(false);
            //  绘制饼图
            chart.coord('polar', {
                transposed: true,
                radius: 0.85
            });
            chart.axis(false);
            chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
                lineWidth: 1,
                stroke: '#fff',
                lineJoin: 'round',
                lineCap: 'round'
            }).animate({
                appear: {
                    duration: 1200,
                    easing: 'bounceOut'
                }
            });

            chart.render();
        }
    },
    mounted(){
        this.init()
    }
}
</script>
