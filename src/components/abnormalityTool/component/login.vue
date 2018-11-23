<template>
    <div class="main">
        <div style="margin-top:10px!important;width:80%;margin:auto">
            <field :value="companyname" @input="update_companyname" label="公司名称" placeholder="请输入公司名称" />
            <field :value="mobile" @input="update_mobile" label="手机号码" placeholder="请输入手机号码"/>
            <field
                v-model="yzm"
                type="number"
                label="短信验证码"
                placeholder="请输入验证码"
            >
                <Button slot="button" size="small" type="primary" @click="require_code" v-if="!yzmDisable" >获取验证码</Button>
                <Button slot="button" size="small" type="default" @click="require_code" v-if="yzmDisable" disabled >{{time}}秒后重新获取</Button>
            </field>
            <Button type="danger" size="large" @click="submit" :disabled="disabled" :loading="!loading" style="margin-top:5px">立刻查询</Button>
            <!-- <Button type="danger" size="large" @click="wx_share" style="margin-top:5px">分享</Button> -->

        </div>
    </div>
</template>

<script>
import { Button, Field, Toast, NavBar  } from 'vant';
import { mapState } from 'vuex'
import common from '../common.js'

export default {
    // mixins: [common],
    components: {
        Button,
        Field,
        Toast
    },
    computed: {
        disabled(){
            if(this.companyname && this.mobile && this.code){
                return false
            }else{
                return true
            }
        },
        ...mapState({
            companyname: state => state.abnormality.companyname,
            mobile: state => state.abnormality.mobile
        }),
    },
    data(){
        return {
            code: "",
            yzmDisable: false,
            yzm: "",
            loading: true,
            time: 60
        }
    },
    methods: {
        is_mobile_number(){
            let _self = this
            let reg = /^[1][0-9]{10}$/
            console.log(_self.mobile)
            if(!reg.test(_self.mobile)){
                _self.$toast.fail("请输入正确的手机号！")
                return false
            }else{
                return true
            }
        },
        submit(){
            //  提交的部分，改为在vuex中处理
            let _self = this
            let url = `api/store/mobile/user/login`
            let config = {
                mobile: _self.mobile,
                code: _self.yzm
            }

            function success(res){
                console.log(res)
                localStorage.setItem("customerId",res.data.data.customer_id)
                _self.$router.push({
                    name:'serviceCenterIndex',
                    params:{
                        id: res.data.data.customer_id
                    }
                })
            }

            function fail(err){
                console.error(err)
                _self.$toast.fail("登录失败！")
            }

            this.$Post(url, config, success, fail)
        },
        require_code(){
            let _self = this
            if(this.is_mobile_number()){
                console.log("手机号正确！")
                let url = `api/store/mobile/user/sendMsg`
                let config = {
                    mobile: _self.mobile
                }

                function success(res){
                    _self.$toast.success(res.data.msg)
                    _self.isLogin = false
                    _self.yzmDisable = true
                    _self.time = 60
                    _self.change_time()
                }

                function fail(err){
                    _self.$toast.fail(err.data.msg)
                }

                this.$Post(url, config, success, fail)
            }else{
                console.log("手机号错误！")
            }
        },
        change_time(){
            let _self = this
            let time1 = setInterval(function(){
                _self.time--;
                console.log(_self.time)
                if(_self.time <= 0){
                    clearInterval(time1)
                    _self.yzmDisable = false
                }
                    _self.$once('hook:beforeDestroy', () => {
                    clearInterval(time1);
                })
            },1000)
        },
        change_button(){
            if(this.time <= 0){
                this.yzmDisable = false
            }else{
                this.yzmDisable = true
            }
        },
        update_companyname(e){
            this.$store.dispatch('abnormality/update_companyname', e)
        },
        update_mobile(e){
            this.$store.dispatch('abnormality/update_mobile', e)
        }
    },
    created(){
        console.log(this.$store)
    }
}
</script>
