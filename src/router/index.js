import Vue from 'vue'
import Router from 'vue-router'
import Vindex from '@/components/Vindex'
import VdataHandle from '@/components/VdataHandle'
import Vwanna_to_do from '@/components/vwanna_to_do'
import Vsource_share from '@/components/Vsource_share'
import Vauth_login from '@/components/Vauth_login'
import Vauth_reg from '@/components/Vauth_reg'
import Vsource_detail from '@/components/Vsource_detail'
import Vpoet_rating from '@/components/Vpoet_rating'
import Vpoet_rating_detail from '@/components/Vpoet_rating_detail'
import Vadd_article from '@/components/Vadd_article'
import Vour_poem from '@/components/Vour_poem'
import Vadd_poem from '@/components/Vadd_poem'
import Vprivate_index from '@/components/Vprivate_index'
import Vnew_start from '@/components/Vnew_start'
import Vnew_index from '@/components/Vnew_index'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Vindex
    },
    {
      path: '/dataHandle',
      name: 'dataHandle',
      component: VdataHandle,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/wanna_to_do',
      name: 'wanna_to_do',
      component: Vwanna_to_do,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/source_share',
      name: 'source_share',
      component: Vsource_share,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/source_detail/:id',
      name: 'source_detail',
      component: Vsource_detail,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/auth_login',
      name: 'auth_login',
      component: Vauth_login
    },
    {
      path: '/auth_reg',
      name: 'auth_reg',
      component: Vauth_reg
    },
    {
      path: '/our_poem',
      name: 'our_poem',
      component: Vour_poem,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/poet_rating',
      name: 'poet_rating',
      component: Vpoet_rating,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/poet_rating_detail',
      name: 'poet_rating_detail',
      component: Vpoet_rating_detail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add_article',
      name: 'add_article',
      component: Vadd_article,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add_poem',
      name: 'add_poem',
      component: Vadd_poem,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/private_index',
      name: 'private_index',
      component: Vprivate_index,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/new_start',
      name: 'new_start',
      component: Vnew_start,
      meta: {
        requireAuth: true,
        index: 1,//meta对象的index用来定义当前路由的层级,由小到大,由低到高
      }
    },
    {
      path: '/new_index',
      name: 'new_index',
      component: Vnew_index,
      meta: {
        requireAuth: true,
        index: 0
      }
    },
  ]
})
