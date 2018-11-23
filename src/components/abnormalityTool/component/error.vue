<template>
    <div>
        <div v-if="useNumberNull">
            <center style="padding:5px;font-weight:600">
            <h3>你的查询次数已耗尽！</h3>
            </center>
            <center ><Button type="primary" long style="width:80%">分享获得更多查询次数</Button></center>
        </div>
        <div v-else>
            <center style="padding:5px">
                <h4>很抱歉，暂时查无此公司相关资料！</h4>
            </center>
            <center ><Button type="primary" long style="width:80%">重新查询</Button></center>
        </div>
    </div>
</template>

<script>
import { Button, Loading, Toast } from 'vant';

export default {
    components: {
        Button,
        Loading,
        Toast,
    },
    data(){
        return {
            useNumberNull: true
        }
    }
}
</script>
