<template>
    <div style="background-color:#f64a42;height:100vh;overflow-y:hidden">
        <img src="./static/project.jpg" style="width:100%;height:50vh;">
        <div class="main" style="margin-top:-10px">
            <div style="margin-top:10px!important;width:80%;margin:auto">
                <field label="公司名称：" style="margin-bottom:5px;border-radius:6px;margin-top:5px;padding-left:10px;" v-model="companyname"></field>
                <field label="负责人名称：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="name"></field>
                <field label="联系方式：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="tel"></field>
                <Button type="danger" size="large" @click="submit" :disabled="disabled" :loading="!loading"> 立刻提交</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Loading, Toast, NavBar  } from 'vant';

export default {
    components:{
        Button,
        Field,
        Loading,
        NavBar
    },
    computed:{
        disabled(){
            return true
        }
    },
    data(){
        return {
            loading: true
        }
    },
    methods: {
        submit(){
            
        }
    }
}
</script>
