<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/nametesttool">测名</van-tabbar-item>
      <van-tabbar-item icon="chat" to="/namechecktool">核名</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'app',
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
  },
  data(){
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>
