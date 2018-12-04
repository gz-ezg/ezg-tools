<template>
    <div style="margin-top:10px">
        <Row><center><h4 style="font-weight:600">您的企业共<span style="color:red;padding:0px 6px">{{errorNum}}</span>个异常记录</h4></center></Row>
        <div>
            <div v-if="loading">
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">税务异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>税务异常</h4></center>
                <div v-if="taxation">
                    <div style="margin:auto;width:90%">
                        <table class="table table-striped table-bordered" style="font-size:12px">
                        <thead>
                            <tr>
                                <td>税所</td>
                                <td>税种</td>
                                <td>所属期始</td>
                                <td>所属期止</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detail.tax" :key="index">
                                <td>{{item.gdslx}}</td>
                                <td>{{item.zsxmmc}}</td>
                                <td>{{item.skssqq}}</td>
                                <td>{{item.skssqz}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <div style="margin-top:20px">
            <div v-if="loading">  
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">工商异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>工商异常</h4></center>
                <div v-if="commerce">
                    <template v-for="(item, index ) in detail.business">
                        <cell-group style="margin:auto;width:95%" :key="index">
                            <cell class="labelem" :title="item.result" :url="item.url" value="详情" is-link></cell>
                            <cell class="labelem" title="法定代表人" :value="item.name1"></cell>
                            <cell class="labelem" title="统一社会信用代码" :value="item.taxno"></cell>
                        </cell-group>
                    </template>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <div style="margin:auto;width:80%;margin-top:10px">
            <p>* <span style="color:red;font-size:14px">以上结果仅供参考</span>，最终结果以税务局及工商局公示为准！</p>
        </div>
        <Row style="margin-top:20px;padding-bottom:20px">
            <Col span="12">
                <Button type="default" style="margin-left:20px;width:80%" @click="$router.go(-1)">返回</Button>
            </Col>
            <Col span="12">
                <Button type="primary" style="margin-left:20px;width:80%" @click="open_check_more">获取更多查询次数</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import abnormalCommon from '../common.js'
import { mapState } from 'vuex'
import { Panel, Field, Cell, CellGroup, Icon, Col, Row, Button, Loading, Dialog, Toast } from 'vant'
import { setTimeout } from 'timers';
// import VConsole from 'vconsole/dist/vconsole.min.js'

export default {
    mixins: [abnormalCommon],
    components: {
        Col,
        Row,
        Button,
        Loading,
        CellGroup,
        Cell,
        Dialog,
        Toast
    },
    data(){
        return {
            taxation: true,
            commerce: true,
            errorNum: 0,
            loading: false
        }
    },
    computed: {
        ...mapState({
            detail: state => state.abnormality.detail,
            companyname: state => state.abnormality.companyname
        }),
    },
    methods: {
        // share(){
        //     console.log("12345")
        //     WeixinJSBridge.on('menu:share:appmessage', function(argv){ alert("发送给好友"); });
        // },
        open_check_more(){
            Dialog.alert({
                title: '点击右上角分享可以获得查询机会哦！',
            }).then(() => {
                // on close
            });
        }
    },
    mounted(){
        let _self = this
        if(!this.companyname){
            Toast.fail("没有填写公司名称！正在返回首页！")
            setTimeout(()=>{
                _self.$router.push({
                    name: "abnormalityLogin"
                })
            },500)
        }
        this.taxation = this.detail.tax.length ? true : false
        this.commerce = this.detail.business.length ? true : false
        this.errorNum = this.detail.tax.length + this.detail.business.length
    }
}
</script>

<style>
.labelem .van-cell__title{
    font-size:12px!important;
}

.labelem .van-cell__value{
    font-size: 12px
}
</style>


