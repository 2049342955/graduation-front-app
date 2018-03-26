import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/Index'
import Content from '@/pages/Content'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import UserChangePwd from '@/pages/user/changepwd'
import UserProfile from '@/pages/user/profile'

const Login = resolve => require(['@/pages/Login'], resolve)
//const LoginOne = resolve => required(['@/pages/loginOne'],resolve)
Vue.use(Router)

export default new Router({
    routes: [
      // {
      //   path: '/',
      //   component: Index
      // },
      // {
      //   path: '/Content/:id',
      //   component: Content
      // },
      // {
      //   path: '/Home',
      //   component: Home
      // },
      {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/dashboard',
        leaf: true, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        children: [
          {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
        ]
      },
      {
        path: '/',
        component: Home,
        name: '设置',
        menuShow: true,
        iconCls: 'iconfont icon-setting1',
        children: [
          {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
          {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
        ]
      },
      {
        path: '/login',
        name: '登录',
        component: Login
      },
      // {
      //   path: '/Abc',
      //   component: Abc,
      //   name: '登录接口',
      // }
    ]
})
