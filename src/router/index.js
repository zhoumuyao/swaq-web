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
        },{
          path:'forget',
          name:'welcome-forget',
          component:()=>import('@/components/welcome/ForgetPage.vue')
        }
      ]
    },{
      path:'/index',
      name:'index',
      component:()=>import('@/views/index.vue'),
    },{
      path:'/disposition_object',
      name:'disposition_object',
      component:()=>import('@/views/disposition_object.vue'),
    },{
      path:'/create_case',
      name:'create_case',
      component:()=>import('@/views/create_case.vue'),
    },{
      path:'/risk_identification',
      name:'risk_identification',
      component:()=>import('@/views/risk/risk_identification.vue')
    },{
      path:'/risk_assessment',
      name:'risk_assessment',
      component:()=>import('@/views/risk/risk_assessment.vue')
    },{
      path:'/risk',
      name:'risk',
      component:()=>import('@/views/risk/risk.vue')
    },
    {
      path:'/rapid_identification',
      name:'rapid_identification',
      component:()=>import('@/views/risk/rapid_identification.vue'),
      children:[
        {
          path:'/basePairs',
          name:'basePairs',
          component:()=>import('@/components/rapidIdentification/basePairs.vue'),
        },
        {
          path:'/infrared',
          name:'infrared',
          component:()=>import('@/components/rapidIdentification/infrared.vue'),
        },
        {
          path:'/raman',
          name:'raman',
          component:()=>import('@/components/rapidIdentification/raman.vue'),
        }
      ]
    },
    {
      path:'/handle',
      name:'handle',
      component:()=>import('@/views/handle.vue')
    },{
      path:'/identify',
      name:'identify',
      component:()=>import('@/views/identify.vue')
    },{
      path:'/identify0',
      name:'identify0',
      component:()=>import('@/views/identify/identify0.vue')
    },{
      path:'/identify1',
      name:'identify1',
      component:()=>import('@/views/identify/identify1.vue')
    },{
      path:'/handle1',
      name:'handle1',
      component:()=>import('@/views/handle/handle1.vue')
    },{
      path:'/handle2',
      name:'handle2',
      component:()=>import('@/views/handle/handle2.vue')
    },{
      path:'/handle3',
      name:'handle3',
      component:()=>import('@/views/handle/handle3.vue')
    },{
      path:'/handle4',
      name:'handle4',
      component:()=>import('@/views/handle/handle4.vue')
    }
    // ,{
    //   path:'/handle_sub1',
    //   name:'handle_sub1',
    //   component:()=>import('@/views/handle/handle_sub1.vue')
    // }

  ]
})

export default router
