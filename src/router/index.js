import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/HelloWorld.vue'

// 企业名称测算 
import nameCheckTool from '../components/nameCheckTool'

// 企业名称核验
import nameTestTool from '../components/nameTestTool'

// 方案工具
import projectTool from '../components/projectTool'
import projectReport from '../components/projectTool/report'


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
            name: 'nameCheckTool',
            component: nameCheckTool,
            meta: {
                title: "企业名称测算"
            }
        },
        {
            path: "/project/:id",
            name: "projectTool",
            component: projectTool,
            meta: {
                title: "方案工具"
            }
        },
        {
            path: "/report",
            name: "projectReport",
            component: projectReport,
            meta: {
                title: "方案工具"
            }
        },
        {
            path: '/',
            redirect: {
                name: "nameCheckTool"
            }
        }
    ]
})