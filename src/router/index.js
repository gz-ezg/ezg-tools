import Vue from 'vue'
import Router from 'vue-router'

// 企业名称测算 
// import nameCheckTool from '../components/nameCheckTool'
const nameCheckTool = () => import(/* webpackChunkName: "nameCheck" */ '../components/nameCheckTool')
// 企业名称核验
// import nameTestTool from '../components/nameTestTool'
const nameTestTool = () => import(/* webpackChunkName: "nameTest" */ '../components/nameTestTool')

// 方案工具
// import projectTool from '../components/projectTool'
// import projectReport from '../components/projectTool/report'
const projectTool = () => import(/* webpackChunkName: "project" */ '../components/projectTool')
const projectReport = () => import(/* webpackChunkName: "project" */ '../components/projectTool/report')

// 个税计算
// import taxAccount from '../components/taxAccount'
const taxAccount = () => import(/* webpackChunkName: "taxAccount" */ '../components/taxAccount')

// import taxResult from '../components/taxAccount/result.vue'
Vue.use(Router)


export default new Router({
    routes: [
        {
            path: "/nametesttool",
            name: 'nameTestTool',
            component: nameTestTool,
            meta: {
                title: "企业名称解析"
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
            path: "/taxaccount",
            name: "taxAccount",
            component: taxAccount,
            meta: {
                title: "个税计算"
            }
        },
        // {
        //     path: "/taxResult",
        //     name: "taxResult",
        //     component: taxResult,
        //     meta: {
        //         title: "计算结果"
        //     }
        // },
        {
            path: '/',
            redirect: {
                name: "taxAccount"
            }
        }
    ]
})