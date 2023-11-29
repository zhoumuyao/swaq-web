import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'welcome',
      component:()=>import('@/views/WelcomeView.vue'),
      children:[
        {
          path:'',
          name:'welcome-login',
          component:()=>import('@/components/welcome/LoginPage.vue')
        },{
          path:'register',
          name:'welcome-register',
          component:()=>import('@/components/welcome/RegisterPage.vue')
        }
      ]
    },{
      path:'/index',
      name:'index',
      component:()=>import('@/views/index.vue')
    },{
      path:'/risk',
      name:'risk',
      component:()=>import('@/views/risk/risk1.vue')
    },{
      path:'/risk2',
      name:'risk2',
      component:()=>import('@/views/risk/risk2.vue')
    },{
      path:'/risk3',
      name:'risk3',
      component:()=>import('@/views/risk/risk3.vue')
    },{
      path:'/handle',
      name:'handle',
      component:()=>import('@/views/handle.vue')
    },{
      path:'/identify',
      name:'identify',
      component:()=>import('@/views/identify.vue')
    },{
      path:'/handle1',
      name:'handle1',
      component:()=>import('@/views/handle/investigation.vue')
    },{
      path:'/handle2',
      name:'handle2',
      component:()=>import('@/views/handle/intelligentInput.vue')
    },{
      path:'/handle3',
      name:'handle3',
      component:()=>import('@/views/handle/siteDisposal.vue')
    },{
      path:'/handle4',
      name:'handle4',
      component:()=>import('@/views/handle/feedback.vue')
    }

  ]
})

export default router
