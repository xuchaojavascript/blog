import Vue from 'vue'
import Router from 'vue-router'
import INDEX from '@/views/index/index.vue'
import PANEL from '@/views/panel/panel.vue'
import CONTENT from '@/views/content/content.vue'
import LOGIN from '@/views/login/login.vue'
import USER from '@/views/user/user.vue'
import ARTICLEMANAGE from '@/views/user/subManages/articleManage.vue'
import USERMANAGE from '@/views/user/subManages/userManage.vue'
import COMMONMANAGE from '@/views/user/subManages/commonManage.vue'
import USERFACE from '@/views/user/subManages/userface.vue'
import ADDARTICLE from '@/views/article/addArticle.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: INDEX,
      redirect:'/blog',
      children: [
        {
          path: '/blog',
          component: PANEL,
          redirect:'/blog/index',
          children: [
            {
              path: '/blog/index',
              component: CONTENT,
            }
          ]
        },
        {
          path: '/login',
          component: LOGIN,
        },
        {
          path: '/addArticle',
          component: ADDARTICLE,
        },  
        {
          path: '/register',
          component: LOGIN,
        },        
      ]
    },
    {
      path: '/user',
      component: USER,
      children: [
        {
          path: '/user/article_manage',
          component: ARTICLEMANAGE
        },
        {
          path: '/user/user_manage',
          component: USERMANAGE
        },
        {
          path: '/user/common_manage',
          component: COMMONMANAGE
        },
        {
          path: '/user/userface',
          component: USERFACE
        },
      ]
    }
  ]
})
