<template>
    <div style="background-color:#f64a42;height:1070px;">
        <panel title="计算结果" id="panel-title">
            <field label="应纳个税" input-align="right" readonly></field>
            <field label="应纳税所得额" input-align="right" readonly></field>
            <!-- <field label="税率" input-align="right"></field> -->
            <field label="速算扣除数" input-align="right" readonly></field>
            <field label="税后工资" input-align="right" readonly></field>
            <canvas id="mountNode" ></canvas>
        </panel>
        <panel id="panel-content">
            <cell title="工资个人所得税计算公式"></cell>
            <div style="padding:5px 10px;font-size:14px">应纳税所得额=（月收入-五险一金-起征点-依法确定的其他扣除-专项附加扣除）*适用税率-速算扣除数</div>
        </panel>
        
    </div>  
</template>

<script>
import { Panel, Field, Cell, CellGroup, Icon, Dialog, RadioGroup, Radio, Col, Row, Button } from 'vant';


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
    components:{
        Panel,
        Field,
        Cell,
        CellGroup,
        Icon,
        Dialog,
        RadioGroup,
        Radio,
        Col,
        Row,
        Button
    },
    data(){
        return {
            map: {
                '税后工资：': '',
                '五险一金和个税：': '',
            },
            data: [
                {
                    name: '税后工资',
                    percent: 0.88,
                    a: '12000'
                }, 
                {
                    name: '五险一金和个税',
                    percent: 0.12,
                    a: '12000'
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
                // itemFormatter: function itemFormatter(val) {
                //     return val + '  ' + _self.map[val];
                // }
            });
            //  信息提示
            // chart.tooltip(false);
            //  绘制饼图
            chart.coord('polar', {
                transposed: true,
                radius: 1
            });
            chart.axis(false);
            chart.interval().position('a*percent').color('name', ['#F04864', '#8543E0']).adjust('stack').style({
                lineWidth: 2,
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

<style scoped>
#panel-title{
    height: 400px;
    top: 15px;
    margin:15px;
    margin-top: 0px;
    /* border: 2px solid #cccccc; */
    border-radius: 10px;
}
#panel-title>.van-panel__header>.van-cell__title{
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #f64a42;
}
#panel-title .van-cell{
    background-color: rgba(0,0,0,0);
}
#panel-title .van-field{
    margin-bottom: 0;
    margin-top: 0;
    border-radius: 0;
    border-top: 0;
    border-left: 0;
    border-right:0;
    box-shadow: none;
}
#panel-content{
    height: 200px;
}
</style>

