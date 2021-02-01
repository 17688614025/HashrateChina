import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: './', // 加上这一行
  routes: [
    {
      path: '/error',
      component: _ => import('@/pages/Home/Home'),
      redirect: '/error/404',
      meta: {
        title: 'error',
        hide: true
      },
      children: [
        {
          path: '404',
          component: () => import('@/pages/error/404'),
          meta: {
            title: '报错了',
            hide: true
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/error'
    },
    {
      path: '/',
      name: 'Home',
      component: _ => import('@/pages/Home/Home'),
      children: [
        {
          path: '/',
          name: 'main', // 主页
          component: _ => import('@/pages/Home/main')
        },
        {
          path: '/calculator',
          name: 'calculator', // 计算器
          component: _ => import('@/pages/Home/calculator')
        },
        {
          path: '/aboutUs',
          name: 'aboutUs', // 关于我们
          component: _ => import('@/pages/aboutUs')
        },
        {
          path: '/ranks/power',
          name: 'power', // 有效算力
          component: _ => import('@/pages/ranks/power')
        },
        {
          path: '/ranks/blocks',
          name: 'blocks', // 出块数
          component: _ => import('@/pages/ranks/power')
        },
        {
          path: '/ranks/power-growth',
          name: 'power-growth', // 算力增速
          component: _ => import('@/pages/ranks/power')
        },
        {
          path: '/stats/miner',
          name: 'miner', // 有效算力图表
          component: _ => import('@/pages/stats/miner')
        },
        {
          path: '/stats/gas',
          name: 'gas', // 24gas走势
          component: _ => import('@/pages/stats/gas')
        },
        {
          path: '/tipset',
          name: 'tipset', // 最新区块
          component: _ => import('@/pages/tipset/index')
        },
        {
          path: '/richList',
          name: 'richList', // 富豪榜
          component: _ => import('@/pages/richList/index')
        },
        {
          path: '/address/:address',
          name: 'address',
          component: _ => import('@/pages/detail/address')
        },
        {
          path: '/richAddress/:address',
          name: 'address',
          component: _ => import('@/pages/detail/richAddress')
        },
        {
          path: '/tipset/:height',
          name: 'tipset',
          component: _ => import('@/pages/detail/tipset')
        },
        {
          path: '/block/:cid',
          name: 'block',
          component: _ => import('@/pages/detail/block')
        },
        {
          path: '/message/:cid',
          name: 'message',
          component: _ => import('@/pages/detail/message')
        },
        {
          path: '/peer/:id',
          name: 'peer',
          // component: _ => import('@/pages/detail/peerTable')
          component: _ => import('@/pages/detail/peer')
        }
      ]
    }
  ]
})
