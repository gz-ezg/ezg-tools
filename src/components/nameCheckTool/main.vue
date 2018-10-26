<template>
    <div style="background-color:#f64a42;height:100vh;overflow-y:hidden">
        <img src="./static/header.png" style="width:100%;height:35vh;">
        <div class="main" style="margin-top:-10px">
            <center>
                <div class="content-border">
                    <div style="width:90%;height:15vh">
                        <div v-if="loading">  
                            <h3 style="font-size:16px;color:white;padding-top:15px">{{result.company_name | html2text}}</h3>
                            <div v-html="result.pass_rate" style="font-size:18px;margin-top:5px;color:white"></div>
                        </div>
                        <div style="height:15vh" v-else>
                            <loading type="spinner" color="white" style="padding-top:5vh"></loading>
                        </div>
                    </div>
                </div>
            </center>
            <div style="margin-top:10px!important;width:80%;margin:auto">
                <img src="./static/inputcpname.png" style="width:50%;margin-top:10px!important;margin-left:25%">
                <field label="城市：" style="margin-bottom:5px;border-radius:6px;margin-top:5px;padding-left:10px;" v-model="city"></field>
                <field label="行业：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="company_line"></field>
                <field label="意向名称：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="company_name"></field>
                <Button type="danger" size="large" @click="submit" :disabled="disabled" :loading="!loading"> 立刻提交</Button>

                <!-- <img src="./static/resultList.png" style="width:25%;margin-top:10px"> -->
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Loading  } from 'vant';

export default {
    components:{
        Button,
        Field,
        Loading
    },
    data(){
        return{
            loading: true,
            city: "",
            company_name: "",
            company_line: "",
            result: {
                company_name: "",
                pass_rate: "",
            }
        }
    },
    computed:{
        disabled(){
            if(this.city && this.company_line && this.company_name){
                return false
            }else{
                return true
            }
        }
    },
    methods:{
        submit(){
            let _self = this
            _self.loading = false
            let url = `api/store/tools/company/name/verification`
            let config = {
                params: {
                    city: _self.city,
                    company_name: _self.company_name,
                    company_line: _self.company_line
                }
            }

            function success(res){
                _self.result = res.data.data
                setInterval(()=>{
                    _self.loading = true
                },1000)
            }

            function fail(err){
                _self.result.pass_rate = `
                    <h1 style="font-size:18px;color:white">T T</h1>
                    <span>结果不小心跑丢了！</span>
                `
                _self.result.company_name = ""
                // Toast.fail("获取失败，请重试！")
                setInterval(()=>{
                    _self.loading = true
                },1000)
                
            }

            this.$Get(url, config, success, fail)

        }
    },
    //  过滤器
    filters: {
        html2text: function (value) {
            if (!value) return ''
            return value.replace(/&nbsp;/g,"")
        }
    }
}
</script>

<style scoped>
*{
    font-size:14px
}
.main{
    padding-top:4vh;
    background-image: url('static/main2.png');
    background-size: 100%;
    height: 60.5vh;
    border:3vw solid #f64a42;
    border-top:none;
    border-bottom:2vh solid #f64a42
}
.content-border{
    margin-top:10px;
    width: 80%;
    background-image: url('static/26.png');
    background-size: 100%;
    background-position:bottom;
    background-repeat:no-repeat;
}
.van-cell{
    background: #b6a37f;
    padding: 5px 2px;
    line-height: 28px;
}
.van-cell:not(:last-child)::after{
    content: none;
}
.van-button{
    border-radius: 5px;
}
.van-button--large{
    line-height: 22px;
    height: 36px;
}
</style>

