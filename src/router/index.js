import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import('@/components/welcome/LoginPage.vue')
        }, {
          path: 'register',
          name: 'welcome-register',
          component: () => import('@/components/welcome/RegisterPage.vue')
        }, {
          path: 'forget',
          name: 'welcome-forget',
          component: () => import('@/components/welcome/ForgetPage.vue')
        }
      ]
    }, {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/index.vue'),
    }, {
      path: '/disposition_object',
      name: 'disposition_object',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/disposition_object.vue'),
    }, {
      path: '/create_case',
      name: 'create_case',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/create_case.vue'),
    }, {
      path: '/view_case',
      name: 'view_case',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/view_case.vue'),
    }, {
      path: '/risk_identification',
      name: 'risk_identification',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/risk/risk_identification.vue')
    }, {
      path: '/risk_assessment',
      name: 'risk_assessment',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/risk/risk_assessment.vue')
    }, {
      path: '/risk',
      name: 'risk',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/risk/risk.vue')
    },
    {
      path: '/rapid_identification',
      name: 'rapid_identification',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/risk/rapid_identification.vue'),
      children: [
        {
          path: '/basePairs',
          name: 'basePairs',
          component: () => import('@/components/rapidIdentification/basePairs.vue'),
        },
        {
          path: '/infrared',
          name: 'infrared',
          component: () => import('@/components/rapidIdentification/infrared.vue'),
        },
        {
          path: '/raman',
          name: 'raman',
          component: () => import('@/components/rapidIdentification/raman.vue'),
        }
      ]
    },
    {
      path: '/handle',
      name: 'handle',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle.vue')
    }, {
      path: '/identify',
      name: 'identify',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/identify.vue')
    }, {
      path: '/identify0',
      name: 'identify0',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/identify/identify0.vue')
    }, {
      path: '/judge',
      name: 'judge',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/identify/judgements.vue')
    }, {
      path: '/identify1',
      name: 'identify1',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/identify/identify1.vue')
    }, {
      path: '/identify2',
      name: 'identify2',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/identify/identify2.vue')
    }, {
      path: '/infoInput0',
      name: 'infoInput0',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/infoInput0.vue')
    }, {
      path: '/infoInput',
      name: 'infoInput',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/infoInput.vue')
    }, {
      path: '/dangerInfo',
      name: 'dangerInfo',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/dangerInfo.vue')
    }, {
      path: '/invest',
      name: 'invest',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/invest.vue')
    }, {
      path: '/invest2',
      name: 'invest2',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/invest2.vue')
    }, {
      path: '/doHandle',
      name: 'doHandle',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/handle/doHandle.vue')
    }, {
      path: '/feedback',
      name: 'feedback',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/feedback/feedback.vue')
    },
    {
      path: '/feedbackList',
      name: 'feedbackList',
      meta: {
        requireAuth: true,
      },
      component: () => import('@/views/feedback/feedbackList.vue')
    }
    // ,{
    //   path:'/handle_sub1',
    //   name:'handle_sub1',
    //   component:()=>import('@/views/handle/handle_sub1.vue')
    // }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('user')) { //判断本地是否存在access_token
      next();
    } else {
      if (to.path === '/') {
        next();
      } else {
        alert('请先进行登录！')
        next({
          path: '/'
        })
      }
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/") {
    if (localStorage.getItem('user')) {
      next({
        path: 'index'
      });
    } else {
      next();
    }
  }
});
export default router
