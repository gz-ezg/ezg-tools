<template>
    <div>
        <nav-bar title="发票查验" />
        <div @click="scan" type="flex" align="center" justify="center" style="margin:20px;padiing:20px">
            <Row>
                <Col span="24"><center><img src="./scan.png" width=200></center></Col>
            </Row>
            <Row><center id="check">点击查验</center></Row>
        </div>
        <div style="height:370px;margin:20px;border:1px solid #cc3300;box-shadow: 5px 5px 5px #ccc;border-radius:10px">
            <div style="width:100%;margin:auto" v-if="result">
                <p><center id="check" style="margin-top:20px">查询结果</center></p>
                <cell-group>
                    <cell title="发票状态" :value="data.invoiceStatus"></cell>
                    <cell title="发票代码" :value="data.invoiceCode"></cell>
                    <cell title="发票号码" :value="data.invoiceNum"></cell>
                    <cell title="开票时间" :value="data.invoiceTime"></cell>
                    <cell title="校验码(后六位)" :value="data.moneyOrCode"></cell>
                    <cell title="销方名称" :value="data.saleName"></cell>
                </cell-group>
            </div>
            <div v-else>
                <p id="check" style="margin-top:20vh"><center>{{errorMessage}}</center></p>
            </div>
        </div>
        <div style="margin:auto;width:90%;margin-top:10px">
            <p>* <span style="color:red;font-size:14px">以上结果仅供参考</span>，最终结果以税务局信息为准！</p>
        </div>
    </div>
</template>

<script>
import common from './common.js'
import {NavBar, Row, Col, Icon, Toast, Cell, CellGroup} from 'vant'
export default {
    mixins: [common],
    components: {
        NavBar,
        Row,
        Col,
        Icon,
        Toast,
        Cell,
        CellGroup
    },
    data(){
        return {
            loading: false,
            data: {},
            result: false,
            errorMessage: "暂无结果！"
        }
    },
    methods: {
        scan(){
            console.log("12345")
            let _self = this
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    _self.get_info(result)
                }
            });
        },
        get_info(e){
            let _self = this
            let url = `api/customer/company/invoice/queryInvoiceInfo`
            const toast = Toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中'
            });
            let formdata = new FormData()
            // formdata.append("qrCode", "01,04,4400174310,23694994,1886.79,20181106,11071422101072409016,8EAF,")
            formdata.append("qrCode", e)

            function success(res){
                let temp = JSON.parse(res.data.data.replace(/<[^>]+>/g,""))
                if(temp.status == 200){
                    console.log(temp)
                    _self.data = temp.data
                    if(_self.data.invoiceStatus == 1){
                        _self.data.invoiceStatus = "正常"
                    }else if( _self.data.invoiceStatus == 3){
                        _self.data.invoiceStatus = "无效"
                    }else{
                        _self.data.invoiceStatus = "无效"
                    }
                    _self.result = true
                    _self.loading = false
                    Toast.clear();
                }else{
                    console.log(temp.message)
                    fail(temp.message)
                }
                
            }

            function fail(err){
                _self.loading = false
                _self.result = false
                Toast.clear();
                // Toast.fail(err)
                _self.errorMessage = err
            }

            this.$Post(url, formdata, success, fail)
        }
    },
    created(){
        // this.data = JSON.parse('{"cycs":"5","invoiceCode":"4400163160","invoiceNum":"01858748","invoiceStatus":1,"invoiceTime":"2018-07-19","moneyOrCode":"27691.91","saleName":"广州******家税务局"}')
        
    }
}
</script>

<style scoped>
.van-nav-bar{
    background-color: #CC3300;
    color: white;
}
#check{
    color: #cc3300;
    font-size: 20px;
    font-weight: 700;
}
</style>
