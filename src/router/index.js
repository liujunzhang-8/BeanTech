import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/projectManagement',
                    component: () => import(/* webpackChunkName: "projectManagement" */ '../components/page/projectManagement.vue'),
                    meta: { title: '项目管理' }
                },
                {
                    path: '/progressControl',
                    component: () => import(/* webpackChunkName: "progressControl" */ '../components/page/progressControl.vue'),
                    meta: { title: '进度管理' }
                },
                {
                    path: '/customerManagement',
                    component: () => import(/* webpackChunkName: "customerManagement" */ '../components/page/customerManagement.vue'),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/supplierManagement',
                    component: () => import(/* webpackChunkName: "supplierManagement" */ '../components/page/supplierManagement.vue'),
                    meta: { title: '供应商管理' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '账号管理' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
