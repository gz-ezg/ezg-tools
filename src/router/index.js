import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/HelloWorld.vue'

// 企业名称测算 
import NameCheckTool from '../components/nameCheckTool'

// 企业名称核验
import nameTestTool from '../components/nameTestTool'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path:'/index',
            name: 'index',
            component: Index,
            meta: {
                title: "e账柜"
            }
        },
        {
            path: "/nametesttool",
            name: 'nameTestTool',
            component: nameTestTool,
            meta: {
                title: "企业名称通过率测试"
            }
        },
        {
            path: "/namechecktool",
            name: 'NameCheckTool',
            component: NameCheckTool,
            meta: {
                title: "企业名称测算"
            }
        },
        {
            path: '/',
            redirect: {
                name: "NameCheckTool"
            }
        }
    ]
})