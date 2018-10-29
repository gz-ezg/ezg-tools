<template>
    <div style="background-color:#07BAE5;height:100vh;overflow-y:hidden">
        <img src="./static/project.jpg" style="width:100%;margin-top:-20px">
        <div class="main" style="margin-top:-15px">
            <div style="margin-top:10px!important;width:80%;margin:auto">
                <field style="margin-bottom:5px;border-radius:6px;margin-top:5px;padding-left:10px;" :value="companyname" @input="update_companyname" placeholder="公司名称"></field>
                <field style="margin-bottom:5px;border-radius:6px;padding-left:10px;" :value="name" @input="update_name" placeholder="负责人名称"></field>
                <field style="margin-bottom:5px;border-radius:6px;padding-left:10px;" :value="tel" @input="update_tel" placeholder="联系方式"></field>
                <Button type="danger" size="large" @click="submit" :disabled="disabled" :loading="!loading" style="margin-top:5px"> 立刻提交</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Loading, Toast, NavBar  } from 'vant';
import { mapState } from 'vuex'

//  使用vuex实现数据传递 - as a demo

export default {
    components:{
        Button,
        Field,
        Loading,
        NavBar
    },
    computed:{
        disabled(){
            if(this.companyname && this.name && this.tel){
                return false
            }else{
                return true
            }
        },
        ...mapState({
            companyname: state => state.companyname,
            name: state => state.name,
            tel: state => state.tel
        })
    },
    data(){
        return {
            loading: true
        }
    },
    methods: {
        submit(){
            this.$router.push({
                name: "projectReport"
            })
        },
        update_companyname (e) {
            this.$store.commit('update_companyname', e)
        },
        update_name (e) {
            this.$store.commit('update_name', e)
        },
        update_tel (e) {
            this.$store.commit('update_tel', e)
        }
    },
    created(){
        let _self = this
        this.$store.commit("update_userid", _self.$route.params.id)
    }
}
</script>
