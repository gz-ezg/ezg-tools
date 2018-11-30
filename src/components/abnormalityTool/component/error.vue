<template>
    <div>
        <div v-if="useNumberNull">
            <center style="padding:5px;font-weight:600">
            <h3>你的查询次数已耗尽！</h3>
            </center>
            <center ><Button type="primary" long style="width:80%" @click="open_check_more">查询更多</Button></center>
        </div>
        <!-- <div v-else>
            <center style="padding:5px">
                <h4>很抱歉，暂时查无此公司相关资料！</h4>
            </center>
            <center ><Button type="primary" long style="width:80%">重新查询</Button></center>
        </div> -->
    </div>
</template>

<script>
import { Button, Loading, Toast, Dialog  } from 'vant';
import common from '../common.js'


export default {
    mixins: [common],
    components: {
        Button,
        Loading,
        Toast,
        Dialog
    },
    data(){
        return {
            useNumberNull: true
        }
    },
    methods: {
        open_check_more(){
            Dialog.alert({
                title: '点击右上角分享可以获得查询机会哦！',
            }).then(() => {
                // on close
            });
        }
    },
    created(){
        // this.useNumberNull = this.$route.params.status
    }
}
</script>
